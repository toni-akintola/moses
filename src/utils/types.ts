export interface Education {
    id: number
    school: string
    degree: string
    concentration: string
    startYear: string
    endYear: string
    country: string
    completed: boolean
}

export interface Experience {
    id: number
    employer: string
    job: string
    city: string
    startYear: string
    endYear: string
    duties: string
}

export interface Skill {
    id: number
    text: string
}
