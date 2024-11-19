import { Button } from "@/components/ui/button"
import { Chat } from "@/components/ui/chat"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MessageCircleIcon } from "lucide-react"
import React from "react"

type Props = {}

const AIDialog = (props: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild className="w-16 h-16 shadow-2xl">
                <Button
                    variant="outline"
                    className="transition duration-300 ease-in-out"
                >
                    <MessageCircleIcon className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-5xl">
                <DialogHeader>
                    <DialogTitle>Modelpy AI</DialogTitle>
                    {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
                </DialogHeader>
                <Chat />
            </DialogContent>
        </Dialog>
    )
}

export default AIDialog
