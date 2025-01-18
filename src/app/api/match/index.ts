import { createBackendSupabaseClient } from "@/utils/supabase/server"
import { Candidate, JobEmbedding, Job, Match } from "../../../../types/types"

const MINIMUM_SCORE = 25

export interface MatchVector {
    id: string
    metadata: {
        title: string
        company: string
        employment_type: string
    }
    similarity: string
}

function cosineSimilarityToMatchScore(
    cosineSimilarity: number,
    threshold: number = 0.5,
    steepness: number = 30
): number {
    cosineSimilarity = Math.max(-1, Math.min(1, cosineSimilarity))
    const sigmoid =
        1 / (1 + Math.exp(-steepness * (cosineSimilarity - threshold)))
    const matchScore = sigmoid * 100
    return Number(matchScore.toFixed(2))
}

function transformAndFilterSimilarities(data: any[]): any | JobEmbedding {
    const res = data
        .map((obj) => ({
            id: obj.id,
            rating: cosineSimilarityToMatchScore(obj.similarity),
        }))
        .filter((obj) => obj.rating >= MINIMUM_SCORE)
    return res
}

export async function matchToCandidates(embedding: number[]) {
    const supabase = await createBackendSupabaseClient()
    const { data: matches, error } = await supabase.rpc("match_candidates", {
        query_embedding: embedding,
        match_threshold: 0.2,
        match_count: 10,
    })

    if (error) {
        console.error("Error matching candidates:", error)
        throw new Error("Failed to match candidates")
    }

    // Fetch full candidate details with profile information
    const candidateIds = matches.map((match: any) => match.id)
    const { data: candidates, error: candidatesError } = await supabase
        .from("candidates")
        .select(
            `
            *,
            profile:profile_id (
                email
            )
        `
        )
        .in("id", candidateIds)

    if (candidatesError) {
        console.error("Error fetching candidate details:", candidatesError)
        throw new Error("Failed to fetch candidate details")
    }

    return matches.map((match: any) => ({
        ...candidates.find((candidate: Candidate) => candidate.id === match.id),
        rating: cosineSimilarityToMatchScore(match.similarity),
    }))
}

export async function matchToJobs(embedding: number[]) {
    const supabase = await createBackendSupabaseClient()
    const { data: matches, error } = await supabase.rpc("match_jobs", {
        query_embedding: embedding,
        match_threshold: 0.2,
        match_count: 10,
    })

    if (error) {
        console.error("Error matching jobs:", error)
        throw new Error("Failed to match jobs")
    }

    // Fetch full job details including employer information
    const jobIds = matches.map((match: any) => match.id)
    const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select(
            `
            *,
            employer:employer_id (
                id,
                email
            )
        `
        )
        .in("id", jobIds)

    if (jobsError) {
        console.error("Error fetching job details:", jobsError)
        throw new Error("Failed to fetch job details")
    }

    return matches.map((match: any) => ({
        ...jobs.find((job: Job) => job.id === match.id),
        rating: cosineSimilarityToMatchScore(match.similarity),
    }))
}

export async function storeMatch(match: Match) {
    const supabase = await createBackendSupabaseClient()
    const { error } = await supabase.from("matches").insert(match)

    if (error) {
        console.error("Error storing match:", error)
        throw new Error("Failed to store match")
    }
}

// Email getter functions
export async function getProfileEmail(profileId: string) {
    const supabase = await createBackendSupabaseClient()
    const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("profile_id", profileId)
        .single()

    if (error) {
        console.error("Error fetching profile email:", error)
        throw new Error("Failed to fetch profile email")
    }

    return data.email
}
