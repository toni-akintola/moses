import { createBackendSupabaseClient } from "@/utils/supabase/server"
import { Candidate, Job } from "../../../../types/types"

export async function matchToCandidates(job: Job) {
    const supabase = await createBackendSupabaseClient()

    const { data, error } = await supabase.rpc("match_candidates", {
        query_embedding: job.embedding,
        match_threshold: 0.2,
        match_count: 10,
    })
    console.log(error)
    return data
}

export async function matchToJobs(candidate: Candidate) {
    const supabase = await createBackendSupabaseClient()

    const { data, error } = await supabase.rpc("match_jobs", {
        query_embedding: candidate.embedding,
        match_threshold: 0.2,
        match_count: 10,
    })
    console.log(error)
    return data
}
