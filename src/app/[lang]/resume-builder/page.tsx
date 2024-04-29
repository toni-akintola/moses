import { S1 } from "@/components/resume-forms/S1"
import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import React from "react"

const Page = ({ params }: { params: { lang: string } }) => {
    unstable_setRequestLocale(params.lang)
    const t = useTranslations("s1")
    return <S1 />
}

export default Page
