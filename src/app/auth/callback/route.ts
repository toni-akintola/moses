import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"
import { type CookieOptions, createServerClient } from "@supabase/ssr"
import { profile } from "console"

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/"
    if (code) {
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options })
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.delete({ name, ...options })
                    },
                },
            }
        )
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        const user = (await supabase.auth.getUser()).data.user
        const nextLocaleCookie = request.cookies.get("NEXT_LOCALE")
        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user?.id)
            .single()
        if (!data && user?.email) {
            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    user_id: user.id,
                    email: user.email,
                    firstTimeUser: true,
                    accountType: "Individual",
                })
            console.log(profileError)
        }
        const locale = nextLocaleCookie ? nextLocaleCookie.value : "en" // Extracting locale's value: 'en'
        if (!error && user) {
            return NextResponse.redirect(`${origin}${next}/${locale}/core`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
