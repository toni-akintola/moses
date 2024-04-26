import { NextResponse } from "next/server"
import * as deepl from "deepl-node"
import { Education, Experience, ResumeSubmission } from "@/utils/types"
import { translateText } from "@/functions/server"

export async function POST(request: Request) {
    const { educations, experiences, ...otherProps }: ResumeSubmission =
        await request.json()
    console.log(educations, experiences)

    // Translate each string property of education objects
    const translatedEducations = await Promise.all(
        educations.map(async (education) => {
            const translatedEducation: Education = {
                ...education,
                school: await translateText(education.school),
                degree: await translateText(education.degree),
                startYear: await translateText(education.startYear),
                endYear: await translateText(education.endYear),
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
                job: await translateText(experience.job),
                city: await translateText(experience.city),
                country: await translateText(experience.country),
                startYear: await translateText(experience.startYear),
                endYear: await translateText(experience.endYear),
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

    console.log(translatedResume)
    return NextResponse.json({ translatedResume })
}
