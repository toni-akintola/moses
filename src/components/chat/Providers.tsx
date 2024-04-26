"use client"

import { MessagesProvider } from "@/context/messages"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "jotai"
import { FC, ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Provider>
                <MessagesProvider>{children}</MessagesProvider>
            </Provider>
        </QueryClientProvider>
    )
}

export default Layout
