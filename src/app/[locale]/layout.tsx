import type { Metadata } from "next"
import { Sofia_Sans } from "next/font/google"
import Layout from "@/components/chat/Providers"
import { Analytics } from "@vercel/analytics/react"
import NextTopLoader from "nextjs-toploader"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { unstable_setRequestLocale } from "next-intl/server"
import { ReactNode } from "react"
const lato = Sofia_Sans({
    subsets: ["greek"],
    weight: ["100", "300", "400", "700", "900"],
})

type Props = {
    children: ReactNode
    params: { locale: string }
}

export const metadata: Metadata = {
    title: "Exodo",
    description: "AI-powered Resume Builder",
}

export default async function LocaleLayout({
    children,
    params: { locale },
}: Props) {
    unstable_setRequestLocale(locale)

    return (
        <html lang={locale}>
            <body className={`${lato.className} `}>
                <Analytics />
                <SpeedInsights />
                <NextTopLoader />
                <Layout>{children}</Layout>
            </body>
        </html>
    )
}
