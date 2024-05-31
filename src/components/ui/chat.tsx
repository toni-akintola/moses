"use client"
import ChatInput from "@/components/chat/ChatInput"
import ChatMessages from "@/components/chat/ChatMessages"
import { Button } from "@/components/ui/button"
import { ChatBubble } from "@/components/ui/chat-bubble"
import { Input } from "@/components/ui/input"

import { initialMessages, scrollToBottom } from "@/utils/helpers"
import { Message, useChat } from "ai/react"
import { useParams } from "next/navigation"
import { useEffect, useRef } from "react"

export function Chat() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        data,
    } = useChat({
        initialMessages,
    })

    const { lang } = useParams()
    useEffect(() => {
        setTimeout(() => scrollToBottom(containerRef), 100)
    }, [messages])

    return (
        <div className="rounded-2xl border h-[75vh] flex flex-col justify-between w-full">
            <div className="p-6 overflow-auto" ref={containerRef}>
                <ChatMessages />
            </div>
            <form onSubmit={handleSubmit} className="p-4 flex clear-both">
                <ChatInput />
            </form>
        </div>
    )
}
