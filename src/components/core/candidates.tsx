import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import React from "react"

type Props = {}

const Candidates = async (props: Props) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const userID = user.data.user?.id
    const { data: candidateData, error } = await supabase
        .from("candidates")
        .select()
        .eq("profile_id", userID)
    console.log(candidateData)
    console.log(error)
    return (
        <div>
            {candidateData?.map((candidate) => (
                <Link
                    href={`candidates/${candidate.candidate_id}`}
                    key={candidate.candidate_id}
                >
                    {candidate.candidate_id}
                </Link>
            ))}
        </div>
    )
}

export default Candidates
