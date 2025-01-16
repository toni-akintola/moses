import { NextRequest, NextResponse } from "next/server"
import { extractTextFromPDF, parseResume } from "@/functions/openai"
import mammoth from "mammoth"

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
    try {
        const result = await mammoth.extractRawText({ buffer })
        return result.value
    } catch (error) {
        console.error("Error extracting text from DOCX:", error)
        throw new Error("Failed to extract text from DOCX file")
    }
}

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

        // Determine file type and extract text accordingly
        let text: string
        const fileType = file.name.toLowerCase().split(".").pop()

        try {
            if (fileType === "pdf") {
                text = await extractTextFromPDF(buffer)
            } else if (fileType === "docx") {
                text = await extractTextFromDOCX(buffer)
            } else {
                return NextResponse.json(
                    {
                        error: "Unsupported file type. Please upload a PDF or DOCX file.",
                    },
                    { status: 400 }
                )
            }
        } catch (extractError) {
            console.error("Error extracting text:", extractError)
            return NextResponse.json(
                {
                    error: `Failed to extract text from ${fileType?.toUpperCase()} file`,
                },
                { status: 422 }
            )
        }

        // Parse the extracted text
        try {
            const parsedResume = await parseResume(text)
            return NextResponse.json(parsedResume)
        } catch (parseError) {
            console.error("Error parsing resume:", parseError)
            return NextResponse.json(
                { error: "Failed to parse resume content" },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error("Error processing resume:", error)
        return NextResponse.json(
            { error: "Failed to process resume" },
            { status: 500 }
        )
    }
}
