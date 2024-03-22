import { authorizationStatusAtom } from "@/utils/atoms"
import { createClient } from "@/utils/supabase/server"
import { ResumeSubmission } from "@/utils/types"
import { NextResponse } from "next/server"
export async function POST(request: Request) {
    const data: ResumeSubmission = await request.json()
    console.log(data)

    const supabase = createClient()
    const { error } = await supabase.from("resume_submissions").insert({
        age: data.age,
        name: data.name,
        number: data.number,
        email: data.email,
        proficiency: data.proficiency,
        educations: data.educations,
        skills: data.skills,
        certificates: data.certificates,
        authorizationstatus: data.authorizationStatus,
    })

    console.log(error)
    return NextResponse.json({ error })
}
