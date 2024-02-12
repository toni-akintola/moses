import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function GET(request: Request) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto("http://localhost:3000/preview")
    await page.emulateMediaType("screen")

    const pdfBuffer = await page.pdf({ format: "A4" })

    const response = new NextResponse(pdfBuffer)
    await browser.close()
    response.headers.set("content-type", "application/pdf")
    return response
}
