import React from "react"
import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
type Props = {}

const Job = async ({ params }: { params: { slug: string } }) => {
    const { slug: jobID } = params
    const supabase = await createClerkSupabaseClientSsr()
    const { data: jobData, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobID)
    console.log(jobData, error)
    const job = jobData ? jobData[0] : {}
    return (
        <div>
            {job && (
                <div>
                    <p>{job.location || ""}</p>
                    <p>{job.salaryRange || ""}</p>
                    <p>{job.title || ""}</p>
                    <p>{job.company || ""}</p>
                    <p>{job.description || ""}</p>
                    <p>{job.employmentType || ""}</p>
                    <p>{job.datePosted || ""}</p>
                </div>
            )}
        </div>
    )
}

export default Job
