"use client"
import React from "react"
import { motion } from "motion/react"
import Image from "next/image"

export const LogoCarousel = () => {
    const logos = [
        {
            name: "Google",
            logo: "/logos/henryfarms.svg",
            grayscale: true,
        },
        {
            name: "Microsoft",
            logo: "/logos/TysonFoods.svg",
            grayscale: true,
        },
        {
            name: "Amazon",
            logo: "logos/Welcome.US_logo.svg",
            grayscale: true,
        },
        {
            name: "Apple",
            logo: "/logos/AMPI.svg",
            grayscale: true,
        },
        {
            name: "Salesforce",
            logo: "/logos/accenture (1).svg",
            grayscale: true,
        },
        {
            name: "Salesforce",
            logo: "/logos/CMC.svg",
            grayscale: true,
        },
        {
            name: "Salesforce",
            logo: "/logos/IISTL.svg",
            grayscale: true,
        },
    ]

    return (
        <div className="bg-slate-950 py-24 px-4 w-full overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                    Trusted by Industry Leaders
                </h2>
                <p className="text-lg text-slate-400">
                    Companies that rely on our innovative solutions
                </p>
            </div>
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    className="flex items-center justify-center space-x-12"
                    animate={{
                        x: [-1200, 0, 1200],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...logos].map((logo, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={logo.logo}
                                alt={logo.name}
                                width={150}
                                height={50}
                                className={`
                                    object-contain h-16 w-auto transition-all duration-300
                                    ${
                                        logo.grayscale
                                            ? "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                                            : "opacity-100"
                                    }
                                `}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <div className="mt-8 text-center">
                <div className="inline-block bg-slate-900/40 backdrop-blur-sm rounded-full px-4 py-2">
                    <p className="text-slate-400 text-sm">
                        And many more innovative companies
                    </p>
                </div>
            </div>
        </div>
    )
}
