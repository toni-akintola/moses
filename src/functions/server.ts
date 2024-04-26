import { createClient } from "@/functions/supabase"
import * as deepl from "deepl-node"
import {
    AdditionalInfo,
    Certificate,
    Education,
    Experience,
    ResumeSubmission,
    Skill,
} from "@/utils/types"

export const submitResume = async (submission: ResumeSubmission) => {
    const supabase = await createClient()
    const { data: notes } = await supabase.from("resume_submissions").insert({
        age: submission.age,
        name: submission.name,
        number: submission.number,
        email: submission.email,
        proficiency: submission.proficiency,
        educations: submission.educations,
        experiences: submission.experiences,
        skills: submission.skills,
        certificates: submission.certificates,
        authorizationStatus: submission.authorizationStatus,
    })
}

// Function to translate a given text
export async function translateText(
    text: string,
    targetLang: string = "en-US"
) {
    const translator = new deepl.Translator(process.env.DEEPL_API_KEY!)
    const translation: deepl.TextResult = (await translator.translateText(
        text,
        null,
        "en-US"
    )) as deepl.TextResult

    return translation.text
}
