import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { createClient } from "@/utils/supabase/server"
import { Profile } from "@/utils/types"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

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
    const user = await supabase.auth.getUser()

    if (!user.data) {
        redirect("login")
    }
    return (
        <>
            <Header email={""} />
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    )
}
