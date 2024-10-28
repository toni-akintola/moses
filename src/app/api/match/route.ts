import {
    createBackendSupabaseClient,
    createClerkSupabaseClientSsr,
} from "@/utils/supabase/server"
import { Candidate, Job } from "../../../../types/types"
import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"
import { MatchPayload } from "../../../../types/routes"
import { matchToCandidates, matchToJobs } from "@/app/api/match"

export async function POST(request: NextRequest) {
    const supabase = await createBackendSupabaseClient()
    const payload: MatchPayload = await request.json()
    console.log(payload)

    if (payload.candidate) {
        if (!payload.candidateID) return NextResponse.error()
        const { data } = await supabase
            .from("candidates")
            .select("*")
            .eq("id", payload.candidateID)
        console.log(data)

        const candidate = data as unknown as Candidate
        const matches = await matchToJobs(candidate)
        console.log(matches)
    }
    // const jobsData = data as Job[]
    // const matches = await Promise.all(jobsData.map((job) => matchToCandidates(job)))
    // console.log(matches)
    // const scores = matches.map((match) =>
    //     match.map((matchObj) =>
    //         cosineSimilarityToMatchScore(matchObj.similarity)
    //     )
    // )

    return NextResponse.json({ message: "Testing" })
}

function cosineSimilarityToMatchScore(
    cosineSimilarity: number,
    threshold: number = 0.5,
    steepness: number = 30
): number {
    /**
     * Convert cosine similarity to a match score between 0 and 100.
     *
     * @param cosineSimilarity - The cosine similarity value (-1 to 1)
     * @param threshold - The similarity value that corresponds to a 50% match score (default: 0.5)
     * @param steepness - Controls how quickly the score changes around the threshold (default: 10)
     * @returns A score between 0 and 100 indicating the match quality
     */

    // Ensure cosine similarity is in the valid range
    cosineSimilarity = Math.max(-1, Math.min(1, cosineSimilarity))

    // Apply sigmoid function to map similarity to (0, 1) range
    const sigmoid =
        1 / (1 + Math.exp(-steepness * (cosineSimilarity - threshold)))

    // Convert to a 0-100 score
    const matchScore = sigmoid * 100

    return Number(matchScore.toFixed(2))
}
