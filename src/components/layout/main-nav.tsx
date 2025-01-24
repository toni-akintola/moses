"use client"
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
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

export type NavProps = {
    information: string
    language: string
    access: string
}

const ListItem = ({
    className,
    title,
    children,
    ...props
}: React.ComponentPropsWithoutRef<"a"> & {
    title: string
}) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
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
}
ListItem.displayName = "ListItem"

export function MainNav(props: NavProps) {
    const { locale } = useParams()
    return (
        <div
            className="relative flex w-full items-center justify-between z-50 px-4 py-2"
            aria-label="Global"
        >
            <Logo locale={locale as string} />
            <div className="flex space-x-5 items-center">
                <motion.a
                    href="#product"
                    className="text-laserBlue font-medium hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Product
                </motion.a>

                <motion.a
                    href="#solutions"
                    className="text-laserBlue font-medium hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Solutions
                </motion.a>
                <motion.a
                    href="#pricing"
                    className="text-laserBlue font-medium hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Pricing
                </motion.a>
                <motion.a
                    href="#testimonials"
                    className="text-laserBlue font-medium hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Testimonials
                </motion.a>
                <motion.a
                    href="#about"
                    className="text-laserBlue font-medium hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {props.information}
                </motion.a>
            </div>
            <div className="lg:flex lg:flex-1 lg:justify-end space-x-2">
                <motion.a
                    href={`/${locale}/core`}
                    className="text-sm font-medium tracking-tight leading-6 text-white rounded-md py-1 px-2 md:py-2 md:px-4 hover:bg-laserBlue/20 transition-all duration-300 ease-in-out"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Sign in
                </motion.a>
                <motion.a
                    href={`/${locale}/core`}
                    className="text-sm font-medium tracking-tight leading-6 text-black bg-laserBlue rounded-full py-1 px-2 md:py-2 md:px-4 hover:bg-laserBlue/80 transition-all duration-300 ease-in-out"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Sign up for free
                    <span aria-hidden="true" className="ml-1">
                        &rarr;
                    </span>
                </motion.a>
            </div>
        </div>
    )
}

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
