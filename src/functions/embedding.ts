import OpenAI from "openai"
export async function vectorize(data: string) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
    console.log(client.apiKey)
    const embedding = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: JSON.stringify(data),
        encoding_format: "float",
    })

    console.log(embedding.data[0].embedding)
    return embedding.data[0].embedding
}
