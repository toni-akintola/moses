"use client";

import { useChat } from "ai/react";
import { ApertureIcon } from "lucide-react";
import { cn } from "@/utils/helpers";
import Chat from "@/components/chat/Chat";

export default function ChatPage() {
  return (
    <div className="max-w-6xl flex flex-col items-center w-full h-full">
      <div className="flex flex-col w-full gap-6 grow my-2 sm:my-10 p-4 sm:p-8 sm:border rounded-sm overflow-y-auto">
        <Chat />
      </div>
    </div>
  );
}
