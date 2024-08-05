import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { createClient } from "@/utils/supabase/server"
import { Profile } from "@/utils/types"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { enterpriseNavItems, employerNavItems } from "@/constants/data"
export const metadata: Metadata = {
    title: "Exodo",
    description: "AI-powered Resume Builder",
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    const userID = userData.user?.id
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userData.user?.id)
        .single()
    console.log(error)

    console.log(profile)
    const items =
        profile.accountType === "Individual"
            ? enterpriseNavItems
            : employerNavItems

    if (!userData.user?.id) {
        redirect("login")
    }

    return (
        <>
            <Header email={userData.user.email || ""} />
            <div className="flex h-screen overflow-hidden">
                <Sidebar items={items} />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    )
}
