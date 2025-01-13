import { NextRequest, NextResponse } from "next/server"
import {
    Education,
    Experience,
    ResumeSubmission,
} from "../../../../types/types"
import { translateText } from "@/functions/server"
import { createBackendSupabaseClient } from "@/utils/supabase/server"

export async function POST(request: NextRequest) {
    const { educations, experiences, ...otherProps }: ResumeSubmission =
        await request.json()

    // Translate each string property of education objects
    const translatedEducations = await Promise.all(
        educations.map(async (education) => {
            const translatedEducation: Education = {
                ...education,
                school: await translateText(education.school),
                degree: await translateText(education.degree),
                endDate: await translateText(education.endDate),
                country: await translateText(education.country),
                city: await translateText(education.city),
            }
            return translatedEducation
        })
    )

    // Translate each string property of experience objects
    const translatedExperiences = await Promise.all(
        experiences.map(async (experience) => {
            const translatedExperience: Experience = {
                ...experience,
                employer: await translateText(experience.employer),
                jobTitle: await translateText(experience.jobTitle),
                city: await translateText(experience.city),
                country: await translateText(experience.country),
                startDate: experience.startDate,
                endDate: experience.endDate,
                duties: await translateText(experience.duties),
            }
            return translatedExperience
        })
    )

    const translatedResume: ResumeSubmission = {
        ...otherProps,
        educations: translatedEducations,
        experiences: translatedExperiences,
    }

    const supabase = await createBackendSupabaseClient()
    const { error } = await supabase.from("resume_submissions").insert({
        firstName: translatedResume.firstName,
        lastName: translatedResume.lastName,
        phoneNumber: translatedResume.phoneNumber,
        email: translatedResume.email,
        proficiency: translatedResume.proficiency,
        educations: translatedResume.educations,
        experiences: translatedResume.experiences,
        skills: translatedResume.skills,
        certificates: translatedResume.certificates,
        authorizationStatus: translatedResume.authorizationStatus,
    })
    console.log(error)

    //     const openai = new OpenAI({
    //         apiKey: process.env.OPENAI_API_KEY,
    //     })

    //     const response = await openai.chat.completions.create({
    //         model: "gpt-3.5-turbo",
    //         messages: [
    //             {
    //                 role: "user",
    //                 content: `Give me the 10 most likely career areas for a job applicant with this information:
    //     age: ${translatedResume.age},
    //     name: ${translatedResume.name},
    //     number: ${translatedResume.number},
    //     email: ${translatedResume.email},
    //     proficiency: ${translatedResume.proficiency},
    //     educations: ${translatedResume.educations},
    //     skills: ${translatedResume.skills},
    //     certificates: ${translatedResume.certificates},
    //     authorizationStatus: ${translatedResume.authorizationStatus},

    //     Format them in a JSON response please.
    //    `,
    //             },
    //         ],
    //         temperature: 0.7,
    //     })
    //     console.log(response.choices[0].message)
    //     console.log(error)
    return NextResponse.json(translatedResume)
}
