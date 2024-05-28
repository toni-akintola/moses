"use client"
// import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from "@/lib/utils"
import { MobileSidebar } from "./mobile-sidebar"
import Link from "next/link"
import Logo from "@/components/landing/Logo"
import { useParams } from "next/navigation"

export default function Header() {
    const params = useParams()
    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-14 items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Logo locale={params.lang as string} />
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    {/* <ThemeToggle /> */}
                </div>
            </nav>
        </div>
    )
}
