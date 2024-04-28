import { MainNav } from "@/components/landing/Banner"
import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"

export default function Layout({
    params,
    children,
}: {
    children: React.ReactNode
    params: { lang: string }
}) {
    unstable_setRequestLocale(params.lang)
    const t = useTranslations("home")
    return (
        <>
            <main className="">
                <div className="bg-white h-screen">
                    <MainNav
                        information={t("information")}
                        language={t("language")}
                        access={t("access")}
                    />
                    {children}
                </div>
            </main>
        </>
    )
}
