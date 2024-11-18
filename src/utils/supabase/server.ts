import { auth } from "@clerk/nextjs/server"
import { createClient } from "@supabase/supabase-js"
export async function createBackendSupabaseClient() {
    return createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    )
}

export async function createClerkSupabaseClientSsr() {
    const { getToken } = await auth()

    return createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            global: {
                // Get the custom Supabase token from Clerk
                fetch: async (url, options = {}) => {
                    const clerkToken = await getToken({
                        template: "moses",
                    })

                    // Insert the Clerk Supabase token into the headers
                    const headers = new Headers(options?.headers)
                    headers.set("Authorization", `Bearer ${clerkToken}`)

                    // Now call the default fetch
                    return fetch(url, {
                        ...options,
                        headers,
                    })
                },
            },
        }
    )
}
