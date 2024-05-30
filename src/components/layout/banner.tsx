"use client"
import Link from "next/link"
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu"

import { cn } from "@/lib/utils"
import { ChevronDownCircle, Copy, WaypointsIcon } from "lucide-react"
import { motion } from "framer-motion"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import React, { useState } from "react"
import { useParams } from "next/navigation"
import Logo from "@/components/landing/Logo"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export type NavProps = {
    information: string
    language: string
    access: string
}

export function MainNav(props: NavProps) {
    const { lang } = useParams()
    return (
        <div
            className="flex w-full items-center justify-between p-6 lg:px-8"
            aria-label="Global"
        >
            <Logo locale={lang as string} />
            <div className="flex space-x-2 items-center">
                {/* <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-laserBlue font-medium"
                >
                    {props.information}
                </motion.a> */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-transparent hover:bg-transparent flex flex-row justify-center">
                                <h2 className="text-laserBlue md:text-lg">
                                    {props.language}
                                </h2>
                                <ChevronDownCircle className="text-laserBlue h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Change language</DialogTitle>
                                <DialogDescription>
                                    Choose your language below.
                                </DialogDescription>
                            </DialogHeader>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <Link href="/en" title="English" className="">
                                    English
                                </Link>
                                <Link href="/es" title="Español">
                                    Spanish
                                </Link>
                                <Link href="/zh-CN" title="中国人">
                                    Chinese
                                </Link>
                                <Link href="/uk" title="українська">
                                    Ukrainian
                                </Link>
                                <Link href="/ar-SA" title="عربي">
                                    Arabic
                                </Link>
                            </ul>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {/* <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-laserBlue font-medium bg-clear">
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
                                        <ListItem href="/zh-CN" title="中国人">
                                            Chinese
                                        </ListItem>
                                        <ListItem href="/uk" title="українська">
                                            Ukrainian
                                        </ListItem>
                                        <ListItem href="/ar-SA" title="عربي">
                                            Arabic
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu> */}
                </motion.div>
            </div>
            <div className="lg:flex lg:flex-1 lg:justify-end">
                <motion.a
                    href={`/${lang}/resume-builder`}
                    className="text-sm font-medium tracking-tight leading-6 text-white bg-laserBlue rounded-md py-1 px-2 md:py-2 md:px-4"
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

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
            <p className="text-black dark:text-white">
                The Navbar will show on top of the page
            </p>
        </div>
    )
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null)
    return (
        <div
            className={cn(
                "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
                className
            )}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">
                            Web Development
                        </HoveredLink>
                        <HoveredLink href="/interface-design">
                            Interface Design
                        </HoveredLink>
                        <HoveredLink href="/seo">
                            Search Engine Optimization
                        </HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Algochurn"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind css components for your next project"
                        />
                        <ProductItem
                            title="Moonbeam"
                            href="https://gomoonbeam.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Rogue"
                            href="https://userogue.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">Hobby</HoveredLink>
                        <HoveredLink href="/individual">Individual</HoveredLink>
                        <HoveredLink href="/team">Team</HoveredLink>
                        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    )
}
