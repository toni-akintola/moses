"use client"

import { MessagesContext } from "@/context/messages"
import { cn } from "@/utils/helpers"
import { Message } from "@/lib/message"
import { useMutation } from "@tanstack/react-query"
import { CornerDownLeft, Loader2 } from "lucide-react"
import { nanoid } from "nanoid"
import { FC, HTMLAttributes, useContext, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import TextareaAutosize from "react-textarea-autosize"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>("")
    const {
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
    } = useContext(MessagesContext)

    const { mutate: sendMessage, isLoading } = useMutation({
        mutationKey: ["sendMessage"],
        // include message to later use it in onMutate
        mutationFn: async (_message: Message) => {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages }),
            })

            return response.body
        },
        onMutate(message) {
            addMessage(message)
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error("No stream")

            // construct new message to add
            const id = nanoid()
            const responseMessage: Message = {
                id,
                isUserMessage: false,
                text: "",
            }

            // add new message to state
            addMessage(responseMessage)

            setIsMessageUpdating(true)

            const reader = stream.getReader()
            const decoder = new TextDecoder()
            let done = false

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)
                updateMessage(id, (prev) => prev + chunkValue)
            }

            // clean up
            setIsMessageUpdating(false)
            setInput("")

            setTimeout(() => {
                textareaRef.current?.focus()
            }, 10)
        },
        onError: (_, message) => {
            toast.error("Something went wrong. Please try again.")
            removeMessage(message.id)
            textareaRef.current?.focus()
        },
    })

    return (
        <div
            {...props}
            className={cn(
                "border-t pt-4 space-x-3 border-zinc-300 flex flex-row items-center justify-center w-full",
                className
            )}
        >
            <div className="relative flex-1 overflow-hidden rounded-lg outline-none">
                <Input
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()

                            const message: Message = {
                                id: nanoid(),
                                isUserMessage: true,
                                text: input,
                            }

                            sendMessage(message)
                        }
                    }}
                    value={input}
                    autoFocus
                    disabled={isLoading}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write a message..."
                    className="pr-14 w-full bg-zinc-100 py-1.5 text-gray-900 text-sm sm:leading-6"
                />
            </div>

            <Button
                onClick={(e) => {
                    e.preventDefault()

                    const message: Message = {
                        id: nanoid(),
                        isUserMessage: true,
                        text: input,
                    }

                    sendMessage(message)
                }}
                className="w-24"
            >
                {isLoading ? <Spinner /> : "Send"}
            </Button>
        </div>
    )
}

export default ChatInput
