// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimiter } from "@/lib/rate-limiter"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import createIntlMiddleware from "next-intl/middleware"
import { createClient } from "@/utils/supabase/server"

const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "es", "uk", "zh-CN", "ar-SA"],
    defaultLocale: "en",
})

export async function middleware(request: NextRequest) {
    if (
        request.nextUrl.pathname.startsWith("/auth") ||
        request.nextUrl.pathname.startsWith("/api")
    ) {
        return
    }

    const response = handleI18nRouting(request)

    const supabase = createClient()

    const user = await supabase.auth.getUser()
    if (request.nextUrl.pathname.includes("/core") && user.error) {
        return NextResponse.redirect(new URL("login", request.url))
    }
    return response
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
