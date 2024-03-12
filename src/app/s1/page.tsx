import S1 from "@/components/resume-forms/S1"
import { S1B } from "@/components/resume-forms/S1B"
import React from "react"
import { createClient } from "@/utils/supabase/server"

type Props = {}

const Page = async (props: Props) => {
    const supabase = createClient()
    const { data: notes } = await supabase.from("notes").select()
    console.log(notes)
    return <S1 />
}

export default Page
