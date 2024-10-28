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
            .select()
            .eq("id", payload.candidateID)
            .maybeSingle()

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
