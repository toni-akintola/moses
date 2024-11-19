export const dynamic = "force-dynamic" // static by default, unless reading the request

export async function POST(request: Request) {
    const data = await request.json()

    if (!data.query || !data.location)
        return Response.json(
            {
                error: "Please include query and location strings in your request body.",
            },
            { status: 500 }
        )

    const baseUrl = "https://jobs-api14.p.rapidapi.com/v2/list"

    // Define query parameters
    const params = {
        query: data.query,
        location: data.location,
    }

    // Create a URL object
    const url = new URL(baseUrl)

    // Append query parameters
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
    })

    console.log(url.toString())
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": process.env.RAPID_API_KEY!,
            "x-rapidapi-host": "jobs-api14.p.rapidapi.com",
        },
    }

    try {
        const response = await fetch(url, options)
        const result = await response.json()
        console.log(result)
        return Response.json(result)
    } catch (error) {
        console.error(error)
    }

    return new Response(`Hello from ${process.env.VERCEL_REGION}`)
}
