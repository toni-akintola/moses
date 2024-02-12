import { NextResponse } from "next/server"
import * as deepl from "deepl-node"

export async function POST(request: Request) {
    const body = await request.json()
    console.log(body)
    const translator = new deepl.Translator(process.env.DEEPL_API_KEY!)
    const rawTranslations: deepl.TextResult[] = (await translator.translateText(
        body.toTranslate,
        null,
        "en-US"
    )) as deepl.TextResult[]

    const translations = rawTranslations.map(
        (rawTranslation) => rawTranslation.text
    )
    console.log(translations)
    return NextResponse.json({ translations })
}
