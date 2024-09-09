import { NextRequest, NextResponse } from "next/server"
export const dynamic = "force-dynamic" // static by default, unless reading the request

export function GET(request: NextRequest) {
    // Example usage
    const similarities: number[] = [-0.5, 0, 0.3, 0.5, 0.7, 0.9, 1.0]

    const res = similarities.map((sim) => cosineSimilarityToMatchScore(sim))
    return NextResponse.json({ scores: res })
}

function cosineSimilarityToMatchScore(
    cosineSimilarity: number,
    threshold: number = 0.5,
    steepness: number = 10
): number {
    /**
     * Convert cosine similarity to a match score between 0 and 100.
     *
     * @param cosineSimilarity - The cosine similarity value (-1 to 1)
     * @param threshold - The similarity value that corresponds to a 50% match score (default: 0.5)
     * @param steepness - Controls how quickly the score changes around the threshold (default: 10)
     * @returns A score between 0 and 100 indicating the match quality
     */

    // Ensure cosine similarity is in the valid range
    cosineSimilarity = Math.max(-1, Math.min(1, cosineSimilarity))

    // Apply sigmoid function to map similarity to (0, 1) range
    const sigmoid =
        1 / (1 + Math.exp(-steepness * (cosineSimilarity - threshold)))

    // Convert to a 0-100 score
    const matchScore = sigmoid * 100

    return Number(matchScore.toFixed(2))
}
