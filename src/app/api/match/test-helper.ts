// Helper function to generate a test embedding
export function generateTestEmbedding() {
    // Create a 1536-dimension array with random values between -1 and 1
    return Array.from({ length: 1536 }, () => Math.random() * 2 - 1)
}

// Example test payloads
export const testPayloads = {
    candidateToJobs: {
        embedding: generateTestEmbedding(),
        profileID: "test-profile-id",
        candidate: true,
    },
    jobToCandidates: {
        embedding: generateTestEmbedding(),
        profileID: "test-profile-id",
        jobID: "test-job-id",
    },
}
