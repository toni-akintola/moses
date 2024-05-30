// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimiter } from "@/lib/rate-limiter"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

let locales = ["en", "es"]

function getLocale(request: NextRequest) {
    let headers = { "accept-language": "en-US,en;q=0.5" }
    let languages = new Negotiator({ headers }).languages()

    let defaultLocale = "en"

    match(languages, locales, defaultLocale)
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl)
    // const ip = request.ip ?? "127.0.0.1"

    // try {
    //     const { success } = await rateLimiter.limit(ip)

    //     if (!success)
    //         return new NextResponse("You are writing messages too fast.")
    //     return NextResponse.next()
    // } catch (error) {
    //     return new NextResponse(
    //         "Sorry, something went wrong processing your message. Please try again later."
    //     )
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/(en|es)/:page*",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
