import { BodyPayload } from "@/utils/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

/**
 * resume api utils
 */

const apiUrl = `https://api.tailwindstream.io`

export function downloadToBrowser(blob: Blob, name?: string) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = name + " Resume" + "." + blob.type.split("/")[1]
    document.body.appendChild(a)
    a.click()
    a.remove()
}

export async function requestDownload(payload: BodyPayload) {
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

export const download = async (payload: BodyPayload) => {
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
export async function downloadWithRetry(
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
