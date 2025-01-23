"use client"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useEffect } from "react"

export interface IRedoAnimTextProps {
    delay: number
}

export default function RedoAnimText({ delay }: IRedoAnimTextProps) {
    const textIndex = useMotionValue(0)
    const texts = [
        "Creador de currículums y asistente personal para el mundo",
        "世界各地的简历制作者和个人助理",
        "конструктор резюме та персональний помічник для всього світу",
        "منشئ السيرة الذاتية والمساعد الشخصي للعالم",
        "Resume builder and personal assistant for the world",
    ]

    const baseText = useTransform(textIndex, (latest) => texts[latest] || "")
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const displayText = useTransform(rounded, (latest) =>
        baseText.get().slice(0, latest)
    )
    const updatedThisRound = useMotionValue(true)

    useEffect(() => {
        animate(count, 100, {
            type: "tween",
            delay: delay,
            duration: 2,
            ease: "easeIn",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
            onUpdate(latest) {
                if (updatedThisRound.get() === true && latest > 0) {
                    updatedThisRound.set(false)
                } else if (updatedThisRound.get() === false && latest === 0) {
                    if (textIndex.get() === texts.length - 1) {
                        textIndex.set(0)
                    } else {
                        textIndex.set(textIndex.get() + 1)
                    }
                    updatedThisRound.set(true)
                }
            },
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <motion.span className="text-4xl font-bold tracking-tight text-indigo-500 sm:text-6xl">
            {displayText}
        </motion.span>
    )
}
