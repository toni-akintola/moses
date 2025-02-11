"use client"
import { motion } from "motion/react"

export type LogoProps = {
    locale: string
}
export default function Logo(props: LogoProps) {
    return (
        <div className="flex lg:flex-1">
            <motion.a
                href={`/${props.locale}`}
                className="-m-1.5 p-1.5 flex-row items-center flex"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <h1 className="lg:text-2xl text-xl font-extrabold tracking-tight text-laserBlue">
                    Èxodo
                </h1>
            </motion.a>
        </div>
    )
}
