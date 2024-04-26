"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Copy, WaypointsIcon } from "lucide-react"
import { motion } from "framer-motion"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import React from "react"

export type NavProps = {
    locale: string
    information: string
    language: string
    access: string
}

export function MainNav(props: NavProps) {
    return (
        <div
            className="flex items-center justify-between p-6 lg:px-8 bg-white"
            aria-label="Global"
        >
            <div className="flex lg:flex-1">
                <motion.a
                    href="\"
                    className="-m-1.5 p-1.5 flex-row items-center flex"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <h1 className="lg:text-2xl font-extrabold tracking-tight text-indigo-500">
                        Èxodo
                    </h1>
                </motion.a>
            </div>
            <div className="flex space-x-2 items-center">
                <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-black font-bold"
                >
                    {props.information}
                </motion.a>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-black font-bold">
                                    {props.language}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <ListItem href="/en" title="English">
                                            English
                                        </ListItem>
                                        <ListItem href="/es" title="Español">
                                            Spanish
                                        </ListItem>
                                        <ListItem href="/" title="中国人">
                                            Chinese
                                        </ListItem>
                                        <ListItem href="/" title="українська">
                                            Ukrainian
                                        </ListItem>
                                        <ListItem href="/" title="عربي">
                                            Arabic
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </motion.div>
            </div>
            <div className="lg:flex lg:flex-1 lg:justify-end">
                <motion.a
                    href={`${props.locale}/resume-builder/s1`}
                    className="text-sm font-semibold leading-6 text-white bg-indigo-500 rounded-md py-1 px-2 md:py-2 md:px-4"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {props.access} <span aria-hidden="true">&rarr;</span>
                </motion.a>
            </div>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
