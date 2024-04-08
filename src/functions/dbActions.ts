import { createClient } from "@/functions/supabase"
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
