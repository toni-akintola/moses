import { createClient } from "@/utils/supabase/server"
import { ResumeSubmission } from "@/utils/types"
import { NextResponse } from "next/server"
import OpenAI from "openai"

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
        experience: data.experiences,
        skills: data.skills,
        certificates: data.certificates,
        authorizationstatus: data.authorizationStatus,
    })

    //     const openai = new OpenAI({
    //         apiKey: process.env.OPENAI_API_KEY,
    //     })

    //     const response = await openai.chat.completions.create({
    //         model: "gpt-3.5-turbo",
    //         messages: [
    //             {
    //                 role: "user",
    //                 content: `Give me the 10 most likely career areas for a job applicant with this information:
    //     age: ${data.age},
    //     name: ${data.name},
    //     number: ${data.number},
    //     email: ${data.email},
    //     proficiency: ${data.proficiency},
    //     educations: ${data.educations},
    //     skills: ${data.skills},
    //     certificates: ${data.certificates},
    //     authorizationStatus: ${data.authorizationStatus},

    //     Format them in a JSON response please.
    //    `,
    //             },
    //         ],
    //         temperature: 0.7,
    //     })
    //     console.log(response.choices[0].message)
    //     console.log(error)
    return NextResponse.json({ error })
}
