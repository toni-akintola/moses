import JobDialog from "@/components/core/job-dialog"
import Jobs from "@/components/core/jobs"
import React from "react"

const Page = () => {
    return (
        <div className="p-4 md:p-8 flex flex-col space-y-5">
            <Jobs />
            <JobDialog />
        </div>
    )
}

export default Page
