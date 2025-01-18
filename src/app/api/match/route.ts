import { createBackendSupabaseClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { MatchPayload } from "../../../../types/routes"
import {
    matchToCandidates,
    matchToJobs,
    storeMatch,
    getProfileEmail,
} from "./index"

export async function POST(request: NextRequest) {
    try {
        const payload: MatchPayload = await request.json()
        const { embedding, profileID } = payload

        // Check required fields
        if (!embedding || !profileID) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Handle candidate-to-jobs matching
        if (payload.candidate) {
            const matches = await matchToJobs(embedding)
            return NextResponse.json({ matches })
        }

        // Handle job-to-candidates matching
        if (!payload.jobID) {
            return NextResponse.json(
                { error: "Missing jobID for job-to-candidates matching" },
                { status: 400 }
            )
        }

        const matches = await matchToCandidates(embedding)

        // Get profile owner's email
        const profileEmail = await getProfileEmail(profileID)

        // Store matches and prepare for notifications
        const storedMatches = await Promise.all(
            matches.map(
                async (match: {
                    id: string
                    employer?: { id: string }
                    rating: number
                }) => {
                    const matchData = {
                        profile_id: profileID,
                        job_id: payload.jobID!,
                        employer_id: match.employer?.id || "",
                        candidate_id: match.id,
                        rating: match.rating,
                    }
                    await storeMatch(matchData)
                    return {
                        ...match,
                        profileEmail,
                    }
                }
            )
        )

        return NextResponse.json({
            matches: storedMatches,
            profileEmail,
        })
    } catch (error) {
        console.error("Error in match processing:", error)
        return NextResponse.json(
            { error: "Failed to process match" },
            { status: 500 }
        )
    }
}
