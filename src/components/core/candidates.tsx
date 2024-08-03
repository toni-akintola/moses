import { createClient } from "@/utils/supabase/server"
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
            <p>{candidateData?.map((candidate) => candidate.candidate_id)}</p>
        </div>
    )
}

export default Candidates
