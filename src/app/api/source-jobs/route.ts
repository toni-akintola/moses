import {
    isBlueCollarJob,
    fetchJobsForLocation,
    BLUE_COLLAR_QUERIES,
    MIDWEST_LOCATIONS,
    storeJobsInDatabase,
    markOldJobsInactive,
    waitForRateLimit,
} from "./index"
import { Job } from "../../../../types/types"

export const dynamic = "force-dynamic"
// Vercel Cron Job configuration
export const maxDuration = 60

export async function GET(request: Request) {
    // This is for testing the endpoint
    const { searchParams } = new URL(request.url)
    const testMode = searchParams.get("test") === "true"

    if (testMode) {
        // For testing, only use first location and first query
        return handleJobFetch([MIDWEST_LOCATIONS[0]], [BLUE_COLLAR_QUERIES[0]])
    }

    return handleJobFetch(MIDWEST_LOCATIONS, BLUE_COLLAR_QUERIES)
}

export async function POST(request: Request) {
    // This endpoint will be called by the Vercel Cron Job
    return handleJobFetch(MIDWEST_LOCATIONS, BLUE_COLLAR_QUERIES)
}

async function handleJobFetch(locations: string[], queries: string[]) {
    try {
        const allJobs: Job[] = []
        const processedLocations = new Set<string>()
        const processedJobIds = new Set<string>()

        // Mark old jobs as inactive before fetching new ones
        await markOldJobsInactive()

        // Fetch jobs for each location and query combination
        for (const location of locations) {
            for (const query of queries) {
                // Respect rate limits
                await waitForRateLimit()

                const jobs = await fetchJobsForLocation(location, query)

                // Filter and deduplicate jobs
                for (const job of jobs) {
                    if (!processedJobIds.has(job.id) && isBlueCollarJob(job)) {
                        processedLocations.add(location)
                        processedJobIds.add(job.id)
                        allJobs.push(job)
                    }
                }
            }
        }

        // Store jobs in database
        if (allJobs.length > 0) {
            await storeJobsInDatabase(allJobs)
        }

        // Return statistics along with the jobs
        return Response.json({
            success: true,
            stats: {
                totalJobs: allJobs.length,
                locationsProcessed: Array.from(processedLocations),
                timestamp: new Date().toISOString(),
            },
        })
    } catch (error) {
        console.error("Error in job sourcing:", error)
        return Response.json(
            {
                success: false,
                error: "Failed to source jobs",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        )
    }
}
