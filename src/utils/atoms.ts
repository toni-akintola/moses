import { Education, Experience, Skill } from "@/utils/types"
import { TextResult } from "deepl-node"
import { atom } from "jotai"
/* An atom for each input field is created/defined */
// General Information Atoms
export const ageAtom = atom<string>("0")
export const nameAtom = atom<string>("")
export const numberAtom = atom<string>("")
export const emailAtom = atom<string>("")
export const proficiencyAtom = atom<string>("")
export const educationsAtom = atom<Education[]>([{
    id: 1,
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    nation: "",
},
])
// Education Atoms
export const universityAtom = atom<string>("")
export const degreeAtom = atom<string>("")
export const yearsAtom = atom<string>("0")
export const nationAtom = atom<string>("United States")

// Experience Atoms
export const experiencesAtom = atom<Experience[]>([
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

export const skillsAtom = atom<Skill[]>([{ id: 1, text: "" }])


export const translateAtom = atom(null, async (get, set) => {
    var proficiency = get(proficiencyAtom) as string
    var degree = get(degreeAtom) as string
    const educations = get(educationsAtom)
    const experiences = get(experiencesAtom)
    const skills = get(skillsAtom)
    const skillStrings = skills.map((skill) => skill.text)


    const toTranslate = [proficiency, degree]

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
    ;(proficiency = String(translations[0])), (degree = String(translations[1]))

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
            id: index,
            text: String(skillsTranslation),
        })
    )
    set(educationsAtom, educations)
    set(experiencesAtom, experiences)
    set(degreeAtom, degree)
    set(skillsAtom, translatedSkills)
})