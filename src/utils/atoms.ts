import { submitResume } from "@/app/functions/dbActions"
import { Certificate, Education, Experience, Skill } from "@/utils/types"
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

// Education Atoms
export const educationsAtom = atomWithStorage<Education[]>("educations", [
    {
        id: 1,
        school: "",
        degree: "",
        concentration: "",
        startYear: "",
        endYear: "",
        country: "",
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
        startYear: "",
        endYear: "",
        duties: "",
    },
])
// AdditionalInfoAtoms
export const authorizationStatusAtom = atomWithStorage<string>(
    "authorizationStatus",
    ""
)
export const skillsAtom = atomWithStorage<Skill[]>("skills", [
    { id: 1, title: "" },
])
export const certificatesAtom = atomWithStorage<Certificate[]>("certificates", [
    { id: 1, title: "", description: "" },
])

export const translateAtom = atom(null, async (get, set) => {
    const name = get(nameAtom)
    const age = get(ageAtom)
    const number = get(numberAtom)
    const email = get(emailAtom)
    var proficiency = get(proficiencyAtom) as string
    const educations = get(educationsAtom)
    const experiences = get(experiencesAtom)
    const skills = get(skillsAtom)
    const certificates = get(certificatesAtom)
    const authorizationStatus = get(authorizationStatusAtom)
    const skillStrings = skills.map((skill) => skill.title)
    const certificateTitles = certificates.map(
        (certificate) => certificate.title
    )
    const certificateDescriptions = certificates.map(
        (certificate) => certificate.description
    )

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
    proficiency = String(translations[0])

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

    const skillsData = await skillsResponse.json()
    const skillsTranslations = skillsData.translations as TextResult[]
    const translatedSkills = skillsTranslations.map(
        (skillsTranslation, index) => ({
            id: index + 1,
            title: String(skillsTranslation),
        })
    )

    const authResponse = await fetch("/api/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            toTranslate: [authorizationStatus],
        }),
    })

    const authData = await authResponse.json()
    const authTranslations = authData.translations as TextResult[]
    const authTranslation = authTranslations[0]
    console.log(authTranslation)

    certificates.map(async (certificate) => {
        const title = certificate.title
        const description = certificate.description
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                toTranslate: [title, description],
            }),
        })
        const data = await response.json()
        const translations = data.translations as TextResult[]
        certificate.title = String(translations[0])
        certificate.description = String(translations[1])
        console.log(certificate.description, certificate.title)
    })

    set(proficiencyAtom, proficiency)
    set(educationsAtom, educations)
    set(experiencesAtom, experiences)
    set(authorizationStatusAtom, String(authTranslation))
    set(skillsAtom, translatedSkills)
    set(certificatesAtom, certificates)
})
