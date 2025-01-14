import { NextRequest, NextResponse } from "next/server"
import { extractTextFromPDF, parseResume } from "@/functions/openai"

// // Temporary route for testing
// export async function GET() {
//     return NextResponse.json({ message: "API route is working" })
// }

export async function POST(req: NextRequest) {
    try {
        const { file } = await req.json()

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            )
        }
        // console.log(file)
        // // Convert File to Buffer
        // const buffer = Buffer.from(await file.arrayBuffer())

        // // Extract text from PDF
        // const text = await extractTextFromPDF(buffer)

        // // Parse resume using OpenAI
        // const parsedData = await parseResume(text)
        // console.log(parsedData)
        // return NextResponse.json(parsedData)
        return NextResponse.json({ message: "API route is working" })
    } catch (error) {
        console.error("Error processing resume:", error)
        return NextResponse.json(
            { error: "Failed to process resume" },
            { status: 500 }
        )
    }
}
