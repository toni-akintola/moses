import Link from "next/link"

import { cn } from "@/lib/utils"
import { WaypointsIcon } from "lucide-react"

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
                <Link
                    href="#"
                    className="-m-1.5 p-1.5 flex-row items-center flex space-x-3"
                >
                    <h1 className="text-2xl font-extrabold tracking-tight text-indigo-400">
                        Èxodo
                    </h1>
                </Link>
            </div>
            <div className="flex space-x-12">
                <Link href="#" className="text-black font-bold">
                    Home
                </Link>
                <Link href="#" className="text-black font-bold">
                    About
                </Link>
            </div>

            <div className="lg:flex lg:flex-1 lg:justify-end">
                <Link
                    href="/login"
                    className="text-sm font-semibold leading-6 text-black"
                >
                    Log in <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </nav>
    )
}
