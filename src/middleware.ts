// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimiter } from "@/lib/rate-limiter"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import createIntlMiddleware from "next-intl/middleware"

const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "es", "uk", "zh-CN", "ar-SA"],
    defaultLocale: "en",
})

const isProtectedRoute = createRouteMatcher("/(.*core.*)")

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
    if (req.url.includes("api")) return

    return handleI18nRouting(req)
})
// export async function middleware(request: NextRequest) {
//     if (
//         request.nextUrl.pathname.startsWith("/auth") ||
//         request.nextUrl.pathname.startsWith("/api")
//     ) {
//         return
//     }

//     const response = handleI18nRouting(request)

//     const supabase = createClient()

//     const user = await supabase.auth.getUser()
//     if (request.nextUrl.pathname.includes("/core") && user.error) {
//         return NextResponse.redirect(new URL("login", request.url))
//     }
//     return response
// }

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
