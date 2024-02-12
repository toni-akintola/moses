import { Education, Experience, Skill } from "@/utils/types"
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
export const educationsAtom = atomWithStorage<Education[]>("educations", [
    {
        id: 1,
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        nation: "",
    },
])
// Education Atoms

// Experience Atoms
export const experiencesAtom = atomWithStorage<Experience[]>("experiences", [
    {
        id: 1,
        employer: "",
        job: "",
        city: "",
        startDate: "",
        endDate: "",
        duties: "",
    },
])

export const skillsAtom = atomWithStorage<Skill[]>("skills", [
    { id: 1, text: "" },
])

export const translateAtom = atom(null, async (get, set) => {
    var proficiency = get(proficiencyAtom) as string
    const educations = get(educationsAtom)
    const experiences = get(experiencesAtom)
    const skills = get(skillsAtom)
    const skillStrings = skills.map((skill) => skill.text)

    const toTranslate = [proficiency]

    const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            toTranslate: toTranslate,
        }),
    })
    const data = await response.json()
    const translations = data.translations as TextResult[]
    console.log(translations)
    proficiency = String(translations[0])

    educations.map(async (education) => {
        const startDate = education.startDate
        const endDate = education.endDate
        const degree = education.degree
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                toTranslate: [startDate, endDate, degree],
            }),
        })
        const data = await response.json()
        const translations = data.translations as TextResult[]
        console.log(translations)

        education.startDate = String(translations[0])
        education.endDate = String(translations[1])
        education.degree = String(translations[2])
        return education
    })

    experiences.map(async (experience) => {
        const startDate = experience.startDate
        const endDate = experience.endDate
        const employer = experience.employer
        const city = experience.city
        const duties = experience.duties
        const job = experience.job
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                toTranslate: [employer, job, duties],
            }),
        })
        const data = await response.json()
        const translations = data.translations as TextResult[]
        console.log(translations)

        experience.employer = String(translations[0])
        experience.job = String(translations[1])
        experience.duties = String(translations[2])
        return experience
    })

    const skillsResponse = await fetch("/api/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            toTranslate: skillStrings,
        }),
    })

    const skillsData = await skillsResponse.json()
    const skillsTranslations = skillsData.translations as TextResult[]
    const translatedSkills = skillsTranslations.map(
        (skillsTranslation, index) => ({
            id: index + 1,
            text: String(skillsTranslation),
        })
    )
    set(proficiencyAtom, proficiency)
    set(educationsAtom, educations)
    set(experiencesAtom, experiences)
    set(skillsAtom, translatedSkills)
})
