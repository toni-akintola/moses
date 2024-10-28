import {
    Certificate,
    Education,
    Experience,
    Profile,
    ResumeSubmission,
    Skill,
} from "../../types/types"
import { atom } from "jotai"

// Profile Atom
export const profileAtom = atom<Profile | null>(null)

// State Atoms
export const downloadAtom = atom(false)
export const isMinimizedAtom = atom(false)
