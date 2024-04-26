import { S1B } from "@/components/resume-forms/S1"
import React from "react"

const Page = async ({ params }: { params: { lang: string } }) => {
    return <S1B locale={params.lang} />
}

export default Page
