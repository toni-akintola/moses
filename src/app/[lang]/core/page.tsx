import { createClient } from "@/utils/supabase/server"
import { createBrowserClient } from "@supabase/ssr"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

const Page = async (props: Props) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()

    console.log(data, error)

    // if (error || !data?.user) {
    //     redirect("/")
    // }
    return <div>Page</div>
}

export default Page
