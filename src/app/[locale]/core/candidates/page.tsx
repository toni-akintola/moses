import Candidates from "@/components/core/candidates"
import {
    CreateProfileOne,
    ResumeBuilderProps,
    S1Props,
    S2Props,
    S3Props,
    S4Props,
    S5Props,
} from "@/components/resume-forms/create-profile"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useMessages } from "next-intl"
import React from "react"

type Props = {}

const Page = (props: Props) => {
    const messages = useMessages()
    const resumeBuilderContent =
        messages.resumeBuilder as unknown as ResumeBuilderProps
    const S1Content = messages.s1 as unknown as S1Props
    const S2Content = messages.s2 as unknown as S2Props
    const S3Content = messages.s3 as unknown as S3Props
    const S4Content = messages.s4 as unknown as S4Props
    const S5Content = messages.s5 as unknown as S5Props

    // const supabase = createClient()
    // const user = await supabase.auth.getUser()
    // const userID = user.data.user?.id
    // const { data: candidateData, error } = await supabase.from("candidates").select().eq("profile_id", userID)
    // console.log(error)
    return (
        <div className="flex flex-col space-y-5">
            <Candidates />
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create New Candidate</Button>
                </DialogTrigger>
                <DialogContent className="max-w-screen-xl h-2/3">
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
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Page
