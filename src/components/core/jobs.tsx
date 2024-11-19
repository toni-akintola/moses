import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
import { Job } from "../../../types/types"
import React from "react"
import { auth } from "@clerk/nextjs/server"

type Props = {}

const Jobs = async (props: Props) => {
    const supabase = await createClerkSupabaseClientSsr()
    const { userId: employerID } = await auth()
    const { data: jobsData, error } = await supabase
        .from("jobs")
        .select()
        .eq("employer_id", employerID)
    let jobs: Job[] = []
    if (jobsData) {
        jobs = jobsData
    }
    return (
        <ScrollArea className="p-8 h-full w-full flex">
            <BentoGrid className="max-w-full md:grid-cols-2">
                {jobs.map((item) => (
                    <BentoGridItem
                        footer={
                            <div className="flex flex-col space-y-1">
                                <p>{item.title}</p>
                                <p>{item.location}</p>
                                <p>
                                    Uploaded {item.datePosted || "2 days ago"}
                                </p>
                            </div>
                        }
                        key={item.id}
                        href={`search/${item.id}`}
                        title={
                            <div className="flex flex-row space-x-3">
                                <p className="text-md m-0 p-0">
                                    {item.company}
                                </p>
                            </div>
                        }
                    ></BentoGridItem>
                ))}
            </BentoGrid>
        </ScrollArea>
    )
}

export default Jobs
