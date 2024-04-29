import {
    Certificate,
    Education,
    Experience,
    ResumeSubmission,
    Skill,
} from "@/utils/types"
import { TextResult } from "deepl-node"
import { atom } from "jotai"
/* An atom for each input field is created/defined */
type BodyPayload = {
    html?: string // must be undefined if 'template' prop is used
    format?: // applicable only for pdf, default a4
    | "LETTER"
        | "LEGAL"
        | "TABLOID"
        | "LEDGER"
        | "A0"
        | "A1"
        | "A2"
        | "A3"
        | "A4"
        | "A5"
        | "A6"
        | "Letter"
        | "Legal"
        | "Tabloid"
        | "Ledger"
    output?: "pdf" | "png" | "jpeg" | "webp" // default pdf
    size?: {
        scale?: string | number // default 2, can be up to 6
        width?: string | number // default 210
        height?: string | number // default 297
        unit?: "px" | "in" | "cm" | "mm" // default mm
    }
    template?: {
        html: string
        data: Record<string, any>
    }
}
// General Information Atoms
export const ageAtom = atom<string>("")
export const nameAtom = atom<string>("")
export const numberAtom = atom<string>("")
export const emailAtom = atom<string>("")
export const proficiencyAtom = atom<string>("")
export const downloadAtom = atom(false)

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
// Additional Info Atoms
export const authorizationStatusAtom = atom<boolean>(false)
export const skillsAtom = atom<Skill[]>([{ id: 1, title: "" }])
export const certificatesAtom = atom<Certificate[]>([{ id: 1, title: "" }])
const download = async (payload: BodyPayload) => {
    try {
        const response = await requestDownload(payload)
        if (response.error) {
            console.log(response.error)
        }
        if (response.requestId) {
            const onComplete = (error: string = "") => {}
            downloadWithRetry(
                response.requestId,
                onComplete,
                payload.template?.data.name
            )
        }
    } catch (error) {}
}

/**
 * api utils
 */

const apiUrl = `https://api.tailwindstream.io`

function downloadToBrowser(blob: Blob, name?: string) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = name + " Resume" + "." + blob.type.split("/")[1]
    document.body.appendChild(a)
    a.click()
    a.remove()
}

async function requestDownload(payload: BodyPayload) {
    const response = await fetch(apiUrl + "/request", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
    })
    return (await response.json()) as { requestId?: string; error?: string }
}

// Main retry logic
const RETRY_INTERVAL_MS = 2500
const MAX_RETRIES = 4

async function downloadWithRetry(
    requestId: string,
    onComplete: (error?: string) => void,
    name?: string
) {
    let retried = 0
    const intervalId = setInterval(async () => {
        const response = await fetch(`${apiUrl}/request/${requestId}/download`)
        if (response.ok) {
            const blob = await response.blob()
            clearInterval(intervalId)
            downloadToBrowser(blob, name)
            onComplete()
        } else {
            console.log(response)
            retried++
            if (retried >= MAX_RETRIES) {
                clearInterval(intervalId)
                onComplete("Download failed.")
            }
            console.error("Download failed, retrying...")
        }
    }, RETRY_INTERVAL_MS)
}
export const translateAtom = atom(null, async (get, set) => {
    set(downloadAtom, true)
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
        const template = { html: htmlTemplate, data: data }
        const payload: BodyPayload = { output: "pdf", template: template }
        await download(payload)
        return data
    } catch (error) {
        console.log(error)
        set(downloadAtom, false)
    } finally {
        set(downloadAtom, false)
    }
})

const htmlTemplate = `
<div class="h-[297mm] w-[210mm] bg-gray-100 p-12">
  <div class="flex">
    <div class="mt-16 grid w-[40%] border-2 border-gray-400 p-10">
      <div class="grid gap-8">
        <p class="text-4xl font-semibold">{{name}}</p>
      </div>
      <div class="pt-5">
        <p class="text-2xl font-medium">Contact</p>
        <div class="grid gap-2 pt-4 text-sm font-light">
          <p>{{number}}</p>
          <p>{{email}}</p>
        </div>
      </div>
      <div class="flex flex-col gap-5 pt-5 pb-5">
        <p class="text-2xl font-medium">Skills</p>
        <div class="flex flex-col gap-2">
          <p class="">English Proficiency: {{proficiency}}</p>
          {{#each skills}}
          <p class="">{{title}}</p>
          {{/each}}
        </div>
      </div>
      <p class="text-2xl font-medium">Cerfificates</p>
      <div class="flex flex-col gap-5 pt-5">
        {{#each certificates}}
        <p class="">{{title}}</p>
        {{/each}}
      </div>
    </div>
    <div>
      <div class="pl-10 pt-10">
        <p class="text-2xl font-semibold">Education History</p>
        {{#each educations}}
        <div class="flex items-center justify-between pt-4">
          <p class="text-sm font-light">{{degree}}</p>
          <p class="text-xs font-light">{{startYear}} - {{endYear}}</p>
        </div>
        <div>
          <p class="pt-1 font-medium">{{school}} | {{city}}, {{country}}</p>
        </div>
        {{/each}}
      </div>
      <div class="pl-10 pt-10">
        <p class="text-2xl font-semibold">Work Experience</p>
        {{#each experiences}}
        <div class="flex items-center justify-between pt-4">
          <p class="text-sm font-light">{{employer}}</p>
          <p class="text-xs font-light">{{startYear}} - {{endYear}}</p>
        </div>
        <div>
          <p class="pt-1 font-medium">{{job}} | {{city}}, {{country}}</p>
          <p class="text-sm font-light">{{duties}}</p>
        </div>
        {{/each}}
      </div>
    </div>
  </div>
</div>
  `
