"use client"

import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string
    children?: React.ReactNode
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-min-[12rem] grid-cols-1 md:grid-cols-4 gap-4",
                className
            )}
        >
            {children}
        </div>
    )
}

export const BentoGridItem = ({
    className,
    href,
    title,
    description,
    header,
    icon,
    footer,
    ...linkParams
}: {
    className?: string
    title?: string | React.ReactNode
    description?: string | React.ReactNode
    header?: React.ReactNode
    icon?: React.ReactNode
    footer?: React.ReactNode
} & LinkProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title">) => {
    return (
        <Link
            href={href}
            className={cn(
                "rounded-xl group/bento no-underline hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-neutral-200 justify-between flex flex-col space-y-4 min-h-[12rem]",
                className
            )}
            {...linkParams}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 flex-grow transition duration-200 flex flex-col justify-between">
                <div>
                    {icon}
                    <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 flex-grow flex flex-wrap">
                        {description}
                    </div>
                </div>
                {footer ? (
                    <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 align-bottom bottom-0 pt-6">
                        {footer}
                    </div>
                ) : null}
            </div>
        </Link>
    )
}
