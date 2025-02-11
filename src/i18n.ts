import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

const locales: string[] = ["en", "es", "ar-SA", "zh-CN", "uk"]

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale
    if (!locales.includes(locale as any)) notFound()

    return {
        messages: (await import(`../content/${locale}.json`)).default,
        locale: locale,
    }
})
