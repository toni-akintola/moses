export interface Education {
    id: number
    school: string
    degree: string
    concentration: string
    startDate: string
    endDate: string
    nation: string
    graduationStatus: boolean
}

export interface Experience {
    id: number
    employer: string
    job: string
    city: string
    startDate: string
    endDate: string
    duties: string
}

export interface Skill {
    id: number
    text: string
}
