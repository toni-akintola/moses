import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
import { Profile } from "../../../../types/types"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { enterpriseNavItems, employerNavItems } from "@/constants/data"
import { auth, currentUser } from "@clerk/nextjs/server"
export const metadata: Metadata = {
    title: "Exodo",
    description: "AI-powered Resume Builder",
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClerkSupabaseClientSsr()
    const user = await currentUser()

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single()
    if (error) console.log(error)

    const items =
        profile.accountType == "Employer"
            ? employerNavItems
            : enterpriseNavItems

    // if (!userData.user?.id) {
    //     redirect("login")
    // }

    return (
        <>
            <Header
                items={items}
                email={user?.primaryEmailAddress?.emailAddress || ""}
            />
            <div className="flex h-screen overflow-hidden">
                <Sidebar items={items} />
                <main className="w-full py-24 px-8 overflow-scroll">
                    {children}
                </main>
            </div>
        </>
    )
}
