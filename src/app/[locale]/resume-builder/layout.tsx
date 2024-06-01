import { MainNav } from "@/components/layout/banner"
import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"

export default function Layout({
    params,
    children,
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    unstable_setRequestLocale(params.locale)
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
