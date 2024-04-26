import {
    Certificate,
    Education,
    Experience,
    ResumeSubmission,
    Skill,
} from "@/utils/types"
import { TextResult } from "deepl-node"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

/* An atom for each input field is created/defined */

// General Information Atoms
export const ageAtom = atomWithStorage<string>("age", "")
export const nameAtom = atomWithStorage<string>("name", "")
export const numberAtom = atomWithStorage<string>("number", "")
export const emailAtom = atomWithStorage<string>("email", "")
export const proficiencyAtom = atomWithStorage<string>("proficiency", "")
export const downloadAtom = atom(false)

// Education Atoms
export const educationsAtom = atomWithStorage<Education[]>("educations", [
    {
        id: 1,
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        country: "",
        city: "",
        completed: false,
    },
])

// Experience Atoms
export const experiencesAtom = atomWithStorage<Experience[]>("experiences", [
    {
        id: 1,
        employer: "",
        job: "",
        city: "",
        country: "",
        startYear: "",
        endYear: "",
        duties: "",
    },
])
// Additional Info Atoms
export const authorizationStatusAtom = atomWithStorage<boolean>(
    "authorizationStatus",
    false
)
export const skillsAtom = atomWithStorage<Skill[]>("skills", [
    { id: 1, title: "" },
])
export const certificatesAtom = atomWithStorage<Certificate[]>("certificates", [
    { id: 1, title: "" },
])

export const translateAtom = atom(null, async (get, set) => {
    const age = get(ageAtom)
    const name = get(nameAtom)
    const number = get(numberAtom)
    const email = get(emailAtom)
    const proficiency = get(proficiencyAtom)
    const skills = get(skillsAtom)
    const authorizationStatus = get(authorizationStatusAtom)
    const educations = get(educationsAtom)
    const experiences = get(experiencesAtom)
    const certificates = get(certificatesAtom)
    try {
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
            }),
        })
        const data: ResumeSubmission = await response.json()
        set(educationsAtom, data.educations)
        set(experiencesAtom, data.experiences)
        return data
    } catch (error) {
        console.log(error)
    }
})
