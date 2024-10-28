import { createBackendSupabaseClient } from "@/utils/supabase/server"

export async function queryRowByID(tableName: string, id: string) {
    const supabase = await createBackendSupabaseClient()

    const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)

    return data ? !error : null
}
