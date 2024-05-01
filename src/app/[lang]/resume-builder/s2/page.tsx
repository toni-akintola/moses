import { S2, S2Props } from "@/components/resume-forms/S2"
import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import React from "react"

const Page = ({ params }: { params: { lang: string } }) => {
    unstable_setRequestLocale(params.lang)
    const messages = useMessages()
    const S2Content = messages.s2 as unknown as S2Props
    return (
        <S2
            title={S2Content.title}
            placeholders={S2Content.placeholders}
            backButton={S2Content.backButton}
            highSchool={S2Content.highSchool}
            university={S2Content.university}
            education={S2Content.education}
            completed={S2Content.completed}
            add={S2Content.add}
            remove={S2Content.remove}
            nextButton={S2Content.nextButton}
        />
    )
}

export default Page
