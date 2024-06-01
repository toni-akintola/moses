import {
    CreateProfileOne,
    ResumeBuilderProps,
} from "@/components/resume-forms/create-profile"
import {
    S1Props,
    S2Props,
    S3Props,
    S4Props,
    S5Props,
} from "@/components/resume-forms/create-profile"
import { useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import React from "react"

const Page = ({ params }: { params: { locale: string } }) => {
    unstable_setRequestLocale(params.locale)
    const messages = useMessages()
    const resumeBuilderContent =
        messages.resumeBuilder as unknown as ResumeBuilderProps
    const S1Content = messages.s1 as unknown as S1Props
    const S2Content = messages.s2 as unknown as S2Props
    const S3Content = messages.s3 as unknown as S3Props
    const S4Content = messages.s4 as unknown as S4Props
    const S5Content = messages.s5 as unknown as S5Props
    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <CreateProfileOne
                resumeBuilder={resumeBuilderContent}
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
