import React from "react"
import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
import { JobDetails } from "@/components/core/job-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const Job = async (props: { params: Promise<{ slug: string }> }) => {
    const params = await props.params
    const { slug: jobID } = params
    const supabase = await createClerkSupabaseClientSsr()
    const { data: jobData, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobID)
        .single()

    if (error || !jobData) {
        console.error("Error fetching job:", error)
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/core/search">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Job Details</h1>
            </div>

            <JobDetails job={jobData} />
        </div>
    )
}

export default Job
