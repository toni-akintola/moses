import S4, { S4Props } from "@/components/resume-forms/S4"
import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import React from "react"

const Page = ({ params }: { params: { lang: string } }) => {
    unstable_setRequestLocale(params.lang)
    const messages = useMessages()
    const S4Content = messages.s4 as unknown as S4Props
    return (
        <S4
            backButton={S4Content.backButton}
            title={S4Content.title}
            heading={S4Content.heading}
            placeholders={S4Content.placeholders}
            add={S4Content.add}
            skills={S4Content.skills}
            remove={S4Content.remove}
            nextButton={S4Content.nextButton}
        />
    )
}

export default Page
