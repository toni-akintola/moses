import { useMessages, useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import Home, { HomeMessage } from "@/components/landing/Home"

export default function Page({ params }: { params: { locale: string } }) {
    unstable_setRequestLocale(params.locale)
    const messages = useMessages()
    const home = messages.home as unknown as HomeMessage

    return (
        <div className="flex justify-center overflow-y-auto h-screen bg-slate-950 flex-col">
            <Home locale={params.locale} home={home} />
        </div>
    )
}
