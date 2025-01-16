import { createBackendSupabaseClient } from "@/utils/supabase/server"
import { Job } from "../../../../types/types"
import { nanoid } from "@/utils/helpers"
import { randomUUID } from "crypto"

// Define Midwest locations
export const MIDWEST_LOCATIONS = [
    "Chicago, IL",
    "Detroit, MI",
    "Minneapolis, MN",
    "Cleveland, OH",
    "Indianapolis, IN",
    "Milwaukee, WI",
    "Kansas City, MO",
    "Columbus, OH",
    "St. Louis, MO",
    "Cincinnati, OH",
]

// Define blue-collar job queries
export const BLUE_COLLAR_QUERIES = [
    "manufacturing",
    "warehouse",
    "construction",
    "driver",
    "mechanic",
    "maintenance",
    "technician",
    "operator",
    "assembly",
    "welder",
    "electrician",
    "plumber",
    "carpenter",
    "machinist",
]

export async function fetchJobsForLocation(
    location: string,
    query: string
): Promise<Job[]> {
    const baseUrl = "https://jobs-api14.p.rapidapi.com/v2/list"
    const url = new URL(baseUrl)
    url.searchParams.append("query", query)
    url.searchParams.append("location", location)

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": process.env.RAPID_API_KEY!,
            "x-rapidapi-host": "jobs-api14.p.rapidapi.com",
        },
    }

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        return result.jobs || []
    } catch (error) {
        console.error(`Error fetching jobs for ${location} - ${query}:`, error)
        return []
    }
}

export function isBlueCollarJob(job: Job): boolean {
    const title = job.title.toLowerCase()
    const description = job.description.toLowerCase()

    // Keywords that indicate blue-collar work
    const blueCollarKeywords = [
        "manufacturing",
        "warehouse",
        "construction",
        "driver",
        "mechanic",
        "maintenance",
        "technician",
        "operator",
        "assembly",
        "welder",
        "electrician",
        "plumber",
        "carpenter",
        "machinist",
        "forklift",
        "hvac",
        "factory",
        "production",
        "installer",
        "repair",
    ]

    return blueCollarKeywords.some(
        (keyword) => title.includes(keyword) || description.includes(keyword)
    )
}

export async function storeJobsInDatabase(jobs: Job[]) {
    // Initialize Supabase client
    const supabase = await createBackendSupabaseClient()

    const { error } = await supabase.from("jobs").upsert(
        jobs.map((job) => ({
            ...job,
            id: randomUUID(),
            created_at: new Date().toISOString(),
            is_active: true,
        })),
        {
            onConflict: "id",
            ignoreDuplicates: false,
        }
    )

    if (error) {
        console.error("Error storing jobs:", error)
        throw error
    }
}

// Function to mark old jobs as inactive
export async function markOldJobsInactive() {
    // Initialize Supabase client
    const supabase = await createBackendSupabaseClient()

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { error } = await supabase
        .from("jobs")
        .update({ is_active: false })
        .lt("created_at", thirtyDaysAgo.toISOString())

    if (error) {
        console.error("Error marking old jobs inactive:", error)
        throw error
    }
}

// Rate limiting helper
let lastRequestTime = 0
const RATE_LIMIT_DELAY = 1000 // 1 second between requests

export async function waitForRateLimit() {
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime

    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
        await new Promise((resolve) =>
            setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest)
        )
    }

    lastRequestTime = Date.now()
}
