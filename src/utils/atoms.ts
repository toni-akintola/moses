import { submitResume } from "@/functions/dbActions"
import { Certificate, Education, Experience, Skill } from "@/utils/types"
import { TextResult } from "deepl-node"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

/* An atom for each input field is created/defined */

// General Information Atoms
export const ageAtom = atom<string>("")
export const nameAtom = atom<string>("")
export const numberAtom = atom<string>("")
export const emailAtom = atom<string>("")
export const proficiencyAtom = atom<string>("")

// Education Atoms
export const educationsAtom = atom<Education[]>([
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
export const experiencesAtom = atom<Experience[]>([
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
// AdditionalInfoAtoms
export const authorizationStatusAtom = atom<boolean>(false)
export const skillsAtom = atom<Skill[]>([{ id: 1, title: "" }])
export const certificatesAtom = atom<Certificate[]>([
    { id: 1, title: "", description: "" },
])

export const translateAtom = atom(null, async (get, set) => {
    const educations = get(educationsAtom)
    const experiences = get(experiencesAtom)
    const skills = get(skillsAtom)
    const skillStrings = skills.map((skill) => skill.title)

    educations.map(async (education) => {
        const startDate = education.startYear
        const endDate = education.endYear
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

        education.startYear = String(translations[0])
        education.endYear = String(translations[1])
        education.degree = String(translations[2])
        return education
    })

    experiences.map(async (experience) => {
        const startDate = experience.startYear
        const endDate = experience.endYear
        const employer = experience.employer
        const city = experience.city
        const country = experience.country
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

    // const skillsData = await skillsResponse.json()
    // const skillsTranslations = skillsData.translations as TextResult[]
    // const translatedSkills = skillsTranslations.map(
    //     (skillsTranslation, index) => ({
    //         id: index + 1,
    //         title: String(skillsTranslation),
    //     })
    // )

    // certificates.map(async (certificate) => {
    //     const title = certificate.title
    //     const description = certificate.description
    //     const response = await fetch("/api/translate", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             toTranslate: [title, description],
    //         }),
    //     })
    //     const data = await response.json()
    //     const translations = data.translations as TextResult[]
    //     certificate.title = String(translations[0])
    //     certificate.description = String(translations[1])
    //     console.log(certificate.description, certificate.title)
    // })

    set(educationsAtom, educations)
    set(experiencesAtom, experiences)
})
