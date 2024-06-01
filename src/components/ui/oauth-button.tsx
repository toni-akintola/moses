import { createBrowserClient } from "@supabase/ssr"

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
export type OAuthProps = {
    locale: string
}

export const signInWithOAuth = async () => {}
export const GoogleButton = ({ locale }: OAuthProps) => {
    return (
        <button
            className="flex w-full items-center rounded bg-white px-4 py-4 text-sm font-bold drop-shadow-md hover:bg-gray-50"
            onClick={async () => {
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: `http://localhost:3000/auth/callback?locale=${locale}`,
                    },
                })
                console.log(data, error)
            }}
        >
            <GoogleLogo />
            <div className="flex justify-center w-full">
                <p className="text-black">Sign in with Google</p>
            </div>
        </button>
    )
}

const GoogleLogo = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 775 794"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M775 405.797C775 373.248 772.362 349.496 766.653 324.865H395.408V471.773H613.32C608.929 508.282 585.204 563.264 532.482 600.209L531.743 605.127L649.124 696.166L657.256 696.979C731.943 627.921 775 526.315 775 405.797"
            fill="#4285F4"
        />
        <path
            d="M395.408 792.866C502.167 792.866 591.792 757.676 657.256 696.979L532.482 600.209C499.093 623.521 454.279 639.796 395.408 639.796C290.845 639.796 202.099 570.741 170.463 475.294L165.826 475.688L43.772 570.256L42.1759 574.698C107.198 704.013 240.758 792.866 395.408 792.866Z"
            fill="#34A853"
        />
        <path
            d="M170.463 475.294C162.116 450.662 157.285 424.269 157.285 397C157.285 369.728 162.116 343.338 170.024 318.706L169.803 313.46L46.2193 217.373L42.1759 219.299C15.3772 272.961 0 333.222 0 397C0 460.778 15.3772 521.036 42.1759 574.698L170.463 475.294"
            fill="#FBBC05"
        />
        <path
            d="M395.408 154.201C469.656 154.201 519.74 186.31 548.298 213.143L659.891 104.059C591.356 40.2812 502.167 1.13428 395.408 1.13428C240.758 1.13428 107.198 89.9835 42.1759 219.299L170.024 318.706C202.099 223.259 290.845 154.201 395.408 154.201"
            fill="#EB4335"
        />
    </svg>
)

export const MicrosoftButton = (locale: any) => {
    return (
        <button
            className="flex w-full items-center rounded bg-white px-4 py-4 text-sm font-bold drop-shadow-md hover:bg-gray-50"
            onClick={async () => {
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: "azure",
                    options: {
                        scopes: "email",
                        redirectTo: `/${locale}/core`,
                    },
                })

                console.log(data, error)
            }}
        >
            <MicrosoftLogo />
            <div className="flex justify-center w-full">
                <p className="text-black">Sign in with Microsoft</p>
            </div>
        </button>
    )
}

const MicrosoftLogo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 23 23"
    >
        <path fill="#f3f3f3" d="M0 0h23v23H0z" />
        <path fill="#f35325" d="M1 1h10v10H1z" />
        <path fill="#81bc06" d="M12 1h10v10H12z" />
        <path fill="#05a6f0" d="M1 12h10v10H1z" />
        <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
)
