import { chatbotPrompt } from "@/utils/prompt"
import {
    ChatGPTMessage,
    OpenAIStream,
    OpenAIStreamPayload,
} from "@/lib/openai-stream"
import { MessageArraySchema } from "@/lib/message"

export async function POST(request: Request) {
    const { messages } = await request.json()

    const parsedMessages = MessageArraySchema.parse(messages)

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
        return {
            role: message.isUserMessage ? "user" : "system",
            content: message.text,
        }
    })

    outboundMessages.unshift({
        role: "system",
        content: chatbotPrompt,
    })

    const payload: OpenAIStreamPayload = {
        model: "gpt-4o",
        messages: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1000,
        stream: true,
        n: 1,
    }

    const stream = await OpenAIStream(payload)

    return new Response(stream)
}
