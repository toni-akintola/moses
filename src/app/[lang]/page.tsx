import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import Home from "@/components/landing/Home"

export default function Page({ params }: { params: { lang: string } }) {
    unstable_setRequestLocale(params.lang)

    const t = useTranslations("home")

    return (
        <div className="flex justify-center overflow-y-auto h-screen bg-slate-950 flex-col">
            <Home
                information={t("information")}
                language={t("language")}
                access={t("access")}
                create={t("create")}
                createSubtitle={t("createSubtitle")}
                assistant={t("assistant")}
                assistantSubtitle={t("assistantSubtitle")}
                title={t("title")}
                tos={t("tos")}
                readMore={t("readMore")}
                locale={params.lang}
            />
        </div>
    )
}
