import { CreateProfileOne } from "@/components/resume-forms/create-profile"
import React from "react"

type Props = {}

const Page = (props: Props) => {
    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <CreateProfileOne categories={[]} initialData={null} />
        </div>
    )
}

export default Page
