import { createBackendSupabaseClient } from "@/utils/supabase/server"

export async function addWaitlistEmail(email: string) {
    const supabase = await createBackendSupabaseClient()

    const { data, error } = await supabase.from("waitlist").insert({ email })

    return !error ? data : error
}
