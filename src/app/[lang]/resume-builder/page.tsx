import { S1 } from "@/components/resume-forms/S1"
import React from "react"

const Page = async ({ params }: { params: { lang: string } }) => {
    return <S1 locale={params.lang} />
}

export default Page
