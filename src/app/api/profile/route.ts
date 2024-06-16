import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    const userID = userData.user?.id
    const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userData.user?.id)
        .single()

    return NextResponse.json(profileData)
}
