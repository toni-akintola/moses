export interface Education {
    id?: number
    school: string
    degree: string
    concentration: string
    startYear: string
    endYear: string
    country: string
    completed: boolean
}

export interface Experience {
    id?: number
    employer: string
    job: string
    city: string
    startYear: string
    endYear: string
    duties: string
}

export interface Skill {
    id?: number
    title: string
}

export interface Certificate {
    id?: number
    title: string
    description: string
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
