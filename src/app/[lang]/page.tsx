import { MainNav } from "@/components/landing/Banner"
import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import Home from "@/components/landing/Home"

export default function Page({ params }: { params: { lang: string } }) {
    unstable_setRequestLocale(params.lang)

    const t = useTranslations("home")

    return (
        <div className="flex h-screen justify-center bg-black">
            <header className="absolute inset-x-0 top-0 z-50">
                <MainNav
                    information={t("information")}
                    language={t("language")}
                    access={t("access")}
                />
            </header>
            <Home
                create={t("create")}
                assistant={t("assistant")}
                title={t("title")}
                tos={t("tos")}
                readMore={t("readMore")}
                locale={params.lang}
            />
        </div>
    )
}
