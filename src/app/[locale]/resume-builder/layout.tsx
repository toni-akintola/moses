import { use } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"

export default function Layout(props: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const params = use(props.params)

    const { children } = props

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
