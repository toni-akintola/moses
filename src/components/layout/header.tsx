"use client"
// import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from "@/lib/utils"
import { MobileSidebar } from "./mobile-sidebar"
import Logo from "@/components/landing/Logo"
import { redirect, useParams, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { NavItem } from "@/utils/types"
import { useAuth } from "@clerk/nextjs"

export type HeaderProps = {
    email: string
    items: NavItem[]
}
export default function Header({ email, items }: HeaderProps) {
    const { locale } = useParams()
    const router = useRouter()
    const { signOut, isSignedIn } = useAuth()
    if (!isSignedIn) router.push(`/${locale}`)

    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-14 items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Logo locale={locale as string} />
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar items={items} />
                </div>
                <div className="flex items-center gap-2">
                    <p>{email}</p>
                    <Avatar>
                        <AvatarImage src="" alt="@shadcn" />
                        <AvatarFallback className="bg-gradient-to-b from-cyan-100 via bg-cyan-400"></AvatarFallback>
                    </Avatar>
                    <div className="p-4">
                        <Button
                            onClick={async () => {
                                await signOut()
                                router.push(`/${locale}`)

                                // if (!error) {
                                //     router.push(`/${locale}`)
                                // }
                            }}
                        >
                            Sign Out
                        </Button>
                    </div>

                    {/* <ThemeToggle /> */}
                </div>
            </nav>
        </div>
    )
}
