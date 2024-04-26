import { POST } from "@/app/api/translate/route"
import { describe, expect, test } from "@jest/globals"

it("should return added data with status 201", async () => {
    const requestObj = {
        json: async () => ({
            toTranslate: "Encargado de instalacion de rotilos",
        }),
    } as any

    const response = await POST(requestObj)
    const body = await response.json()
    console.log(body)

    expect(response.status).toBe(200)
})
