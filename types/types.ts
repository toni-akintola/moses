import { Icons } from "@/components/ui/icons"
export interface Education {
    id?: number
    school: string
    degree: string
    endDate: string
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
    startDate?: string
    endDate?: string
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
export interface ResumeSubmission {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    proficiency: string
    educations: Education[]
    experiences: Experience[]
    skills: Skill[]
    certificates: Certificate[]
    authorizationStatus: string
}

export interface AdditionalInfo {
    authorizationStatus: string
    skills: Skill[]
    certificates: Certificate[]
}

export interface Job {
    id: string
    jobProviders: {
        provider: string
        url: string
    }
    url: string
    location: string
    salaryRange: string
    title: string
    company: string
    datePosted: string
    embedding: number[]
    description: string
    employmentType: string
    image: string
}

export interface Profile {
    profile_id: string
    user_id: string
    firstName?: string
    lastName?: string
    avatarUrl?: string
    email: string
    firstTimeUser: boolean
    accountType?: string
    resumeSubmission?: ResumeSubmission
}

export interface Candidate {
    id: string
    profile_id: string
    first_name: string
    last_name: string
    email: string
    resume_submission?: ResumeSubmission
    embedding: number[]
}

export interface Match {
    id?: string
    profile_id: string
    job_id: string
    employer_id: string
    candidate_id: string
    rating: number
}

export type FormItemText = {
    title: string
    placeholder: string
    subtitle: string
}
type Size =
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

export type BodyPayload = {
    html: string
    output?: "pdf" | "png" | "jpeg" | "webp"
    size?: Size | string // or i.e 12x10in
    scale?: number // 1 - 6
    engine?: "handlebars" | "ejs"
    data?: Record<string, any> // required if engine provided
    style?: string
    scripts?: { src: string }[]
    links?: { href: string }[]
}

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
    description?: string
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export interface FooterItem {
    title: string
    items: {
        title: string
        href: string
        external?: boolean
    }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export interface JobEmbedding {
    id: string
    metadata: {
        title: string
        company: string
        employment_type: string
    }
    similarity: number
}
