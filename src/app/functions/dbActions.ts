import { createClient } from "@/app/functions/supabase"
import {
    AdditionalInfo,
    Certificate,
    Education,
    Experience,
    Skill,
} from "@/utils/types"

export const submitResume = async (
    age: string,
    name: string,
    number: string,
    email: string,
    proficiency: string,
    educations: Education[],
    experiences: Experience[],
    skills: Skill[],
    certificates: Certificate[],
    authorizationStatus: string
) => {
    const supabase = await createClient()
    const { data: notes } = await supabase.from("resume_submissions").insert({
        age: age,
        name: name,
        number: number,
        email: email,
        proficiency: proficiency,
        educations: educations,
        experiences: experiences,
        skills: skills,
        certificates: certificates,
        authorizationStatus: authorizationStatus,
    })
}
