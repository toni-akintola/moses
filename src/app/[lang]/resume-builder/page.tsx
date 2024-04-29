import { S1, S1Props } from "@/components/resume-forms/S1"
import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import React from "react"

const Page = ({ params }: { params: { lang: string } }) => {
    unstable_setRequestLocale(params.lang)
    const messages = useMessages()
    const S1Content = messages.s1 as unknown as S1Props
    return (
        <S1
            backButton={S1Content.backButton}
            nextButton={S1Content.nextButton}
            email={S1Content.email}
            phoneNumber={S1Content.phoneNumber}
            proficiency={S1Content.proficiency}
            name={S1Content.name}
            age={S1Content.age}
        />
    )
}

export default Page
