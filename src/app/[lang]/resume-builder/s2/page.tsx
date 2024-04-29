import { S2B, S2Props } from "@/components/resume-forms/S2"
import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import React from "react"

const Page = ({ params }: { params: { lang: string } }) => {
    unstable_setRequestLocale(params.lang)
    const messages = useMessages()
    const S1Content = messages.s2 as unknown as S2Props
    return <S2B />
}

export default Page
