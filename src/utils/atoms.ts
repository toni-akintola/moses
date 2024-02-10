import { Education, Experience } from "@/utils/types"
import { atom } from "jotai"
/* An atom for each input field is created/defined */
// General Information Atoms
export const ageAtom = atom<string | null>("0")
export const nameAtom = atom<string | null>("")
export const numberAtom = atom<string | null>("")
export const emailAtom = atom<string | null>("")
export const proficiencyAtom = atom<string | null>("")

// Education Atoms
export const universityAtom = atom<string | null>("")
export const degreeAtom = atom<string | null>("")
export const yearsAtom = atom<string | null>("0")
export const nationAtom = atom<string | null>("United States")

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
export const translateAtom = atom(null, async (get, set, update) => {
    const age = get(ageAtom)
    const name = get(nameAtom)
    const number = get(numberAtom)
    const email = get(emailAtom)
    const proficiency = get(proficiencyAtom) as string
    const university = get(universityAtom)
    const degree = get(degreeAtom) as string
    const years = get(yearsAtom)
    const nation = get(nationAtom)
    const experiences = get(experiencesAtom)

    const toTranslate = [degree]
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
                toTranslate: [startDate, endDate, employer, job, duties],
            }),
        })
        const data = await response.json()
        console.log(data)
    })
})

export const buildResumeAtom = atom(null, async (get, set, update) => {
    const age = get(ageAtom)
    const name = get(nameAtom)
    const number = get(numberAtom)
    const email = get(emailAtom)
    const proficiency = get(proficiencyAtom)
    const university = get(universityAtom)
    const degree = get(degreeAtom)
    const years = get(yearsAtom)
    const nation = get(nationAtom)
    const experiences = get(experiencesAtom)

    const response = await fetch("http://127.0.0.1:5000/build_resume", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            age,
            name,
            number,
            email,
            proficiency,
            university,
            degree,
            years,
            nation,
            experiences,
        }),
    })
    const data = await response.blob()
    const file = new File([data], "test.pdf", {
        type: "application/pdf",
    })
    const url = window.URL.createObjectURL(file)
    const a = document.createElement("a")
    a.download = "test.pdf"
    a.href = url
    a.click()
})
