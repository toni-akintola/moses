import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createClient } from "@/utils/supabase/server"
import { Job } from "@/utils/types"
import React from "react"

type Props = {}

const jobs = async (props: Props) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const employerID = user.data.user?.id
    const { data: jobsData, error } = await supabase
        .from("candidates")
        .select()
        .eq("employer_id", employerID)
    let jobs: Job[] = []
    if (jobsData) {
        jobs = jobsData
        console.log(jobs)
    }
    return (
        <ScrollArea className="p-8 h-full w-full flex">
            <BentoGrid className="max-w-full md:grid-cols-2">
                {jobs.map((item) => (
                    <BentoGridItem
                        footer={
                            <div className="flex flex-row text-center items-center space-x-1">
                                <p>Uploaded {item.datePosted}</p>
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

export default jobs