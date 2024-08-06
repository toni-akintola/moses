import React from "react"
import { createClient } from "@/utils/supabase/server"
type Props = {}

const Candidate = async ({ params }: { params: { slug: string } }) => {
    const { slug: candidateID } = params
    console.log(candidateID)
    const supabase = createClient()
    const { data: candidateData, error } = await supabase
        .from("candidates")
        .select("*")
        .eq("candidate_id", candidateID)
    console.log(candidateData, error)
    const candidate = candidateData ? candidateData[0] : {}
    return (
        <div>
            {candidate && (
                <div>
                    <p>{candidate.first_name || ""}</p>
                    <p>{candidate.last_name || ""}</p>
                </div>
            )}
        </div>
    )
}

export default Candidate
