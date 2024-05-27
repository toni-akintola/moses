import { CreateProfileOne } from "@/components/resume-forms/create-profile"
import { S1Props } from "@/components/resume-forms/S1"
import { S2Props } from "@/components/resume-forms/S2"
import { S3Props } from "@/components/resume-forms/S3"
import { S4Props } from "@/components/resume-forms/S4"
import { S5Props } from "@/components/resume-forms/S5"
import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import React from "react"

type Props = {}

const Page = ({ params }: { params: { lang: string } }) => {
    unstable_setRequestLocale(params.lang)
    const messages = useMessages()
    const S1Content = messages.s1 as unknown as S1Props
    const S2Content = messages.s2 as unknown as S2Props
    const S3Content = messages.s3 as unknown as S3Props
    const S4Content = messages.s4 as unknown as S4Props
    const S5Content = messages.s5 as unknown as S5Props
    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <CreateProfileOne
                S1Props={S1Content}
                S2Props={S2Content}
                S3Props={S3Content}
                S4Props={S4Content}
                S5Props={S5Content}
                categories={[]}
                initialData={null}
            />
        </div>
    )
}

export default Page
