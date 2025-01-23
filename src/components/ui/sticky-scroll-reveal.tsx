"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string
        description: string
        image: string
        icon?: React.ReactNode
    }[]
    contentClassName?: string
}) => {
    const [activeCard, setActiveCard] = useState(0)

    return (
        <div className="bg-slate-950 py-24 px-4 w-full">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                    How We Transform Your Career Journey
                </h2>
                <p className="text-lg text-slate-400">
                    Innovative features that set us apart
                </p>
            </div>
            <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12 rounded-2xl bg-slate-900/40 backdrop-blur-sm p-8 lg:p-12">
                {/* Left Side - Clickable Text Content */}
                <div className="w-full lg:w-1/2 space-y-8 pr-4">
                    {content.map((item, index) => (
                        <motion.div
                            key={item.title + index}
                            onClick={() => setActiveCard(index)}
                            className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer group ${
                                activeCard === index
                                    ? "bg-slate-800/60 border border-[#06b6d4]/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                    : "bg-transparent hover:bg-slate-800/30"
                            }`}
                            initial={{ opacity: 0.3 }}
                            animate={{
                                opacity: activeCard === index ? 1 : 0.7,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                {item.icon && (
                                    <div className="text-[#06b6d4]">
                                        {item.icon}
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-white">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-slate-300 text-lg">
                                {item.description}
                            </p>
                            <div className="mt-4 flex justify-end">
                                <ArrowRight className="h-6 w-6 text-[#06b6d4] group-hover:translate-x-2 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Side - Dynamic Image Display */}
                <div className="hidden lg:block w-1/2 h-[600px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCard}
                            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src={content[activeCard].image}
                                alt={content[activeCard].title}
                                fill
                                className="object-cover transition-all duration-500 hover:scale-105"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
