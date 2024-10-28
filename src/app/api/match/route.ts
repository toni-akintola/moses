import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
import { Job } from "../../../../types/types"
import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"
import { MatchPayload } from "../../../../types/routes"
/*
 * Interface for this route:
 *
 *
 * */
export async function POST(request: NextRequest) {
    // Example usage
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const payload: MatchPayload = await request.json()
    console.log(payload)
    const { data, error } = await supabase.from("jobs").select("*")
    const jobsData = data as Job[]
    const matches = await Promise.all(
        jobsData?.map(async (job) => {
            const { data, error } = await supabase.rpc("match_candidates", {
                query_embedding: job.embedding,
                match_threshold: 0.2,
                match_count: 10,
            })
            console.log(error)
            return data
        })
    )

    const scores = matches.map((match) =>
        match.map((matchObj) =>
            cosineSimilarityToMatchScore(matchObj.similarity)
        )
    )

    return NextResponse.json(scores)
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
