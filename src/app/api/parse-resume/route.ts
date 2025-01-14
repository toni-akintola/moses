import { NextRequest, NextResponse } from "next/server"
import { extractTextFromPDF, parseResume } from "@/functions/openai"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File
        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            )
        }

        // Convert File to Buffer
        let buffer: Buffer
        try {
            buffer = Buffer.from(await file.arrayBuffer())
        } catch (bufferError) {
            console.error("Error converting file to buffer:", bufferError)
            return NextResponse.json(
                { error: "Failed to process file" },
                { status: 422 }
            )
        }

        let text
        try {
            text = await extractTextFromPDF(buffer)
        } catch (pdfError) {
            console.error("Error extracting text from PDF:", pdfError)
            console.log(pdfError)
            return NextResponse.json(
                { error: "Failed to extract text from PDF" },
                { status: 422 }
            )
        }

        const parsedResume = await parseResume(text)
        console.log(parsedResume)
        return NextResponse.json({ message: "File received" })
    } catch (error) {
        console.error("Error processing resume:", error)
        return NextResponse.json(
            { error: "Failed to process resume" },
            { status: 500 }
        )
    }
}
