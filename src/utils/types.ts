export interface Education {
    id?: number
    school: string
    degree: string
    endYear: string
    country: string
    city: string
    completed: boolean
}

export interface Experience {
    id?: number
    employer: string
    jobTitle: string
    city: string
    country: string
    startDate: string
    endDate: string
    duties: string
}

export interface Skill {
    id?: number
    title: string
}

export interface Certificate {
    id?: number
    title: string
    // description: string
}

export interface AdditionalInfo {
    authorizationStatus: string
    skills: Skill[]
    certificates: Certificate[]
}

export interface ResumeSubmission {
    age: string
    name: string
    number: string
    email: string
    proficiency: string
    educations: Education[]
    experiences: Experience[]
    skills: Skill[]
    certificates: Certificate[]
    authorizationStatus: string
}

export type FormItemText = {
    title: string
    placeholder: string
    subtitle: string
}

export type BodyPayload = {
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
