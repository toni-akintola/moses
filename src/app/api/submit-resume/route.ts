import { createClient } from "@/utils/supabase/server"
import { ResumeSubmission } from "@/utils/types"
import { NextResponse } from "next/server"
export async function POST(request: Request) {
    const data: ResumeSubmission = await request.json()
    console.log(data)

    const supabase = createClient()
    const { error } = await supabase.from("resume_submissions").insert({
        name: data.name,
        data: data,
    })

    console.log(error)
    return NextResponse.json({ error })
}
