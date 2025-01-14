"use server"
import OpenAI from "openai"
import { ResumeSubmission } from "../../types/types"
import PDFParser from "pdf2json"
import { ProfileFormValues } from "@/components/resume-forms/create-profile"

export async function extractTextFromPDF(file: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser()

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            try {
                const text = decodeURIComponent(
                    pdfData.Pages.reduce((acc, page) => {
                        return (
                            acc +
                            page.Texts.map((text) =>
                                text.R.map((r) => r.T).join(" ")
                            ).join(" ")
                        )
                    }, "")
                )
                resolve(text)
            } catch (error) {
                reject(error)
            }
        })

        pdfParser.on("pdfParser_dataError", (error) => {
            reject(error)
        })

        try {
            pdfParser.parseBuffer(file)
        } catch (error) {
            reject(error)
        }
    })
}

export async function vectorize(data: string) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

    const embedding = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: JSON.stringify(data),
        encoding_format: "float",
    })

    return embedding.data[0].embedding
}

export async function parseResume(pdfText: string): Promise<ProfileFormValues> {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

    const resumeSchema = {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        numberSlider: "number",
        educations: [
            {
                school: "string",
                country: "string",
                city: "string",
                degree: "string",
                endDate: "string (YYYY-MM-DD)",
            },
        ],
        experiences: [
            {
                jobTitle: "string",
                employer: "string",
                startDate: "string (YYYY-MM-DD)",
                endDate: "string (YYYY-MM-DD)",
                country: "string",
                city: "string",
                duties: "string",
            },
        ],
        skills: [{ title: "string" }],
        certificates: [{ title: "string" }],
        authorizationStatus: "boolean",
    }

    const systemPrompt = `You are a resume parsing assistant. Convert the provided resume text into a structured JSON object matching this interface:
    ${JSON.stringify(resumeSchema, null, 2)}
    
    Ensure all dates are in YYYY-MM-DD format and extract key information accurately. Return only valid JSON.`

    const response = await client.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: pdfText },
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
    })

    if (!response.choices[0].message.content) {
        throw new Error("Failed to parse resume")
    }

    return JSON.parse(response.choices[0].message.content) as ProfileFormValues
}
