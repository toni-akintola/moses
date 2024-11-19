import { createBackendSupabaseClient } from "@/utils/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const supabase = await createBackendSupabaseClient()
    const { userId } = await auth()
    const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single()
    console.log(error)
    return NextResponse.json(profileData)
}
