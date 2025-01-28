import { addWaitlistEmail } from "@/app/api/waitlist"

export async function POST(request: Request) {
    const { email } = await request.json()
    await addWaitlistEmail(email)
    return new Response("Email added to waitlist", { status: 200 })
}
