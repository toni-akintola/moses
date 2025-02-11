import type { Metadata } from "next"
import { Sofia_Sans } from "next/font/google"
import "./globals.css"
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs"
import Layout from "@/components/chat/Providers"
import { Analytics } from "@vercel/analytics/react"
import NextTopLoader from "nextjs-toploader"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/components/ui/toaster"
const lato = Sofia_Sans({
    subsets: ["greek"],
    weight: ["100", "300", "400", "700", "900"],
})

export const metadata: Metadata = {
    title: "Exodo",
    description: "AI-powered Resume Builder",
}
export default function RootLayout({
    children,
    locale,
}: {
    children: React.ReactNode
    locale: never
}) {
    return (
        <ClerkProvider dynamic>
            <html lang={locale}>
                <body className={`${lato.className}`}>
                    <Analytics />
                    <SpeedInsights />
                    <Toaster />
                    <NextTopLoader />
                    <Layout>{children}</Layout>
                </body>
            </html>
        </ClerkProvider>
    )
}
