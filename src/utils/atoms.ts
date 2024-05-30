import {
    Certificate,
    Education,
    Experience,
    ResumeSubmission,
    Skill,
} from "@/utils/types"
import { atom } from "jotai"

// State Atoms
export const downloadAtom = atom(false)
export const isMinimizedAtom = atom(false)
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
