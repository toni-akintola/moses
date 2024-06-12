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
