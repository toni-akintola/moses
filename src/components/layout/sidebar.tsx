"use client"
import React, { useState } from "react"
import { DashboardNav } from "@/components/layout/dashboard-nav"
import { enterpriseNavItems, employerNavItems } from "@/constants/data"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { useAtom } from "jotai"
import { isMinimizedAtom } from "@/utils/atoms"
import { NavItem } from "../../../types/types"
// import { useSidebar } from '@/hooks/useSidebar';

type SidebarProps = {
    className?: string
    items: NavItem[]
}

export default function Sidebar({ className, items }: SidebarProps) {
    const [isMinimized, toggle] = useAtom(isMinimizedAtom)
    const [status, setStatus] = useState(false)

    const handleToggle = () => {
        setStatus(true)
        toggle(!isMinimized)
        setTimeout(() => setStatus(false), 500)
    }
    return (
        <nav
            className={cn(
                `relative hidden h-screen border-r pt-20 md:block`,
                status && "duration-500",
                !isMinimized ? "w-72" : "w-[72px]",
                className
            )}
        >
            <ChevronLeft
                className={cn(
                    "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
                    !isMinimized && "rotate-180"
                )}
                onClick={handleToggle}
            />
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mt-3 space-y-1">
                        <DashboardNav items={items} />
                    </div>
                </div>
            </div>
        </nav>
    )
}
