import { createClient } from "@/utils/supabase/server"

const submitResume = async () => {
    const supabase = createClient()
    const { data: notes } = await supabase.from("submissions").insert({})
}
