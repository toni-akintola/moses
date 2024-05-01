import { S3, S3Props } from "@/components/resume-forms/S3"
import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import React from "react"

const Page = ({ params }: { params: { lang: string } }) => {
    unstable_setRequestLocale(params.lang)
    const messages = useMessages()
    const S3Content = messages.s3 as unknown as S3Props
    return (
        <S3
            backButton={S3Content.backButton}
            title={S3Content.title}
            employer={S3Content.employer}
            jobTitle={S3Content.jobTitle}
            city={S3Content.city}
            country={S3Content.country}
            startYear={S3Content.startYear}
            endYear={S3Content.endYear}
            duties={S3Content.duties}
            add={S3Content.add}
            remove={S3Content.remove}
            nextButton={S3Content.nextButton}
        />
    )
}

export default Page
