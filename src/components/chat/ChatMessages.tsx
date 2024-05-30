"use client"

import { MessagesContext } from "@/context/messages"
import { cn } from "@/utils/helpers"
import { FC, HTMLAttributes, useContext } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Balancer from "react-wrap-balancer"
interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}
const wrappedText = (text: string) =>
    text.split("\n").map((line, i) => (
        <span key={i}>
            {line}
            <br />
        </span>
    ))

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const { messages } = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse()

    return (
        <div
            {...props}
            className={cn(
                "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
                className
            )}
        >
            <div className="flex-1 flex-grow" />
            {inverseMessages.map((message) => {
                const wrappedMessage = wrappedText(message.text)
                return (
                    <div
                        className="chat-message"
                        key={`${message.id}-${message.id}`}
                    >
                        <Card className="mb-2">
                            <CardHeader>
                                <CardTitle
                                    className={
                                        message.isUserMessage
                                            ? "text-slate-700 dark:text-slate-400"
                                            : "text-laserBlue dark:text-cyan-700"
                                    }
                                >
                                    {message.isUserMessage ? "You" : "Moses"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <Balancer>{wrappedMessage}</Balancer>
                            </CardContent>
                            <CardFooter>
                                <CardDescription className="w-full"></CardDescription>
                            </CardFooter>
                        </Card>
                        {/* <div
                            className={cn("flex items-end", {
                                "justify-end": message.isUserMessage,
                            })}
                        >
                            <div
                                className={cn(
                                    "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
                                    {
                                        "order-1 items-end":
                                            message.isUserMessage,
                                        "order-2 items-start":
                                            !message.isUserMessage,
                                    }
                                )}
                            >
                                <p
                                    className={cn("px-4 py-2 rounded-lg", {
                                        "bg-blue-600 text-white":
                                            message.isUserMessage,
                                        "bg-gray-200 text-gray-900":
                                            !message.isUserMessage,
                                    })}
                                >
                                    <MarkdownLite text={message.text} />
                                </p>
                            </div>
                        </div> */}
                    </div>
                )
            })}
        </div>
    )
}

export default ChatMessages
