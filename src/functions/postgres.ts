import { createBackendSupabaseClient } from "@/utils/supabase/server"
import { Profile } from "../../types/types"

export async function queryRowByID(tableName: string, id: string) {
    const supabase = await createBackendSupabaseClient()

    const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)

    return data ? !error : null
}

export async function createProfile(profile: Profile) {
    const supabase = await createBackendSupabaseClient()

    const { data, error } = await supabase.from("profiles").insert(profile)

    return !error ? data : error
}
