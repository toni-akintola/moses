import S5, { S5Props } from "@/components/resume-forms/S5"
import React from "react"
import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"

const Page = ({ params }: { params: { lang: string } }) => {
    unstable_setRequestLocale(params.lang)
    const messages = useMessages()
    const S5Content = messages.s5 as unknown as S5Props
    return (
        <S5
            backButton={S5Content.backButton}
            title={S5Content.title}
            heading={S5Content.heading}
            certificates={S5Content.certificates}
            placeholders={S5Content.placeholders}
            add={S5Content.add}
            remove={S5Content.remove}
            authHeader={S5Content.authHeader}
            authorization={S5Content.authorization}
            create={S5Content.create}
        />
    )
}

export default Page
