import Link from "next/link"

import { cn } from "@/lib/utils"
import { WaypointsIcon } from "lucide-react"
import { motion } from "framer-motion"
export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
        >
            <div className="flex lg:flex-1">
                <motion.a
                    href="#"
                    className="-m-1.5 p-1.5 flex-row items-center flex space-x-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <h1 className="text-2xl font-extrabold tracking-tight text-indigo-500">
                        Èxodo
                    </h1>
                </motion.a>
            </div>
            <div className="flex space-x-12">
                <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-black font-bold"
                >
                    Home
                </motion.a>
                <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-black font-bold"
                >
                    About
                </motion.a>
            </div>

            <div className="lg:flex lg:flex-1 lg:justify-end">
                <motion.a
                    href="/login"
                    className="text-sm font-semibold leading-6 text-white bg-indigo-500 rounded-md py-2 px-4"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Log in <span aria-hidden="true">&rarr;</span>
                </motion.a>
            </div>
        </nav>
    )
}
