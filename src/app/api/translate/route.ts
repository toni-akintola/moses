import { NextResponse } from "next/server"
import * as deepl from "deepl-node"

export async function POST(request: Request) {
    const text = await request.json()
    console.log(text)
    const translator = new deepl.Translator(process.env.DEEPL_API_KEY!)
    const result = await translator.translateText(
        text.toTranslate,
        null,
        "en-US"
    )
    console.log(result)
    return NextResponse.json({ message: result })
}
