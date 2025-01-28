"use client"
import { MainNav } from "@/components/layout/main-nav"
import { motion } from "motion/react"
import { LampContainer } from "@/components/ui/lamp"
import { Features } from "@/components/landing/Features"
import { useState } from "react"
import { TypePicker } from "@/components/ui/type-picker"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export type HomeMessage = {
    information: string
    language: string
    access: string
    title: string
    create: string
    createSubtitle: string
    assistant: string
    assistantSubtitle: string
    scrollOneTitle: string
    scrollOneDescription: string
    scrollOneCaption: string
    scrollTwoTitle: string
    scrollTwoDescription: string
    scrollTwoCaption: string
    scrollThreeTitle: string
    scrollThreeDescription: string
    scrollThreeCaption: string
}
export type HomeProps = {
    home: HomeMessage
    locale: string
}

import GetStarted from "@/components/landing/GetStarted"
import Pricing from "@/components/landing/Pricing"
import { TestimonialScroll } from "@/components/landing/TestimonialScroll"
import { LogoCarousel } from "@/components/landing/LogoCarousel"
import CompetitiveAnalysis from "@/components/landing/CompetitiveAnalysis"

export default function Home({ home, locale }: HomeProps) {
    const [userType, setUserType] = useState<"candidate" | "employer">(
        "candidate"
    )
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Add your waitlist API call here
        console.log("Submitting email:", email)
        const response = await fetch("/api/waitlist", {
            method: "POST",
            body: JSON.stringify({ email }),
        })
        if (response.ok) {
            setSubmitted(true)
            setEmail("")
        } else {
            console.error("Failed to add email to waitlist")
        }
    }

    const candidateFeatures = [
        {
            title: "Comprehensive Resume Builder",
            description:
                "Craft a professional resume with our intuitive, AI-powered builder",
            image: "/screenshots/resume-builder.png",
            gradient: "from-[#814A9E80] to-[#BAB0BB80]",
        },
        {
            title: "Multi-lingual Options",
            description:
                "Break language barriers with seamless multi-language support",
            image: "/screenshots/job-search.png",
            gradient: "from-[#278E9B80] to-[#B7BDC580]",
        },
        {
            title: "Manage Matches & Candidates",
            description:
                "Streamline your hiring process with advanced candidate tracking",
            image: "/screenshots/dashboard.png",
            gradient: "from-[#278E9B80] to-[#B7BDC580]",
        },
        {
            title: "Virtual AI Assistant",
            description:
                "Your personal AI-powered career companion and job search ally",
            image: "/screenshots/personal-assistant.png",
            gradient: "from-[#814A9E80] to-[#BAB0BB80]",
        },
    ]

    const employerFeatures = [
        {
            title: "Recruitment Analytics",
            description:
                "Gain deep insights into your hiring performance and trends",
            image: "/screenshots/employer-dashboard.png",
            gradient: "from-[#814A9E80] to-[#BAB0BB80]",
        },
        {
            title: "Advanced Candidate Matching",
            description:
                "Leverage AI to find the most suitable candidates for your roles",
            image: "/screenshots/matches.png",
            gradient: "from-[#814A9E80] to-[#BAB0BB80]",
        },
        {
            title: "Comprehensive Candidate Profiles",
            description:
                "Access detailed, multi-dimensional candidate insights",
            image: "/screenshots/candidate-profile.png",
            gradient: "from-[#278E9B80] to-[#B7BDC580]",
        },
        // {
        //     title: "Diversity & Inclusion Tools",
        //     description:
        //         "Enhance your hiring process with intelligent diversity screening",
        //     image: "/.png",
        //     gradient: "from-[#278E9B80] to-[#B7BDC580]",
        // },
    ]

    return (
        <div className="h-full p-4">
            <MainNav
                information={home.information}
                language={home.language}
                access={home.access}
            />
            <LampContainer className="h-full overflow-x-hidden z-0">
                <motion.div
                    className="w-3/4 md:w-2/3 text-center flex items-center flex-col space-y-4"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                >
                    <div className="relative">
                        <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-white md:text-8xl">
                            Blue collar hiring redefined
                        </h1>
                        <motion.div
                            className="absolute -top-4 -right-24"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            <div className="bg-gradient-to-r from-laserBlue to-slate-500 text-xs px-3 py-1 rounded-full text-white">
                                BETA
                            </div>
                        </motion.div>
                    </div>
                    <p className="text-white text-lg lg:text-2xl">
                        An AI-powered job placement solution for blue collar
                        workers, tradespeople, and migrants.
                    </p>
                </motion.div>
            </LampContainer>

            {/* Waitlist Form - Moved outside LampContainer */}
            <div className="p-4 flex justify-center -mt-64 mb-10">
                <motion.form
                    onSubmit={handleWaitlistSubmit}
                    className="w-full max-w-md space-y-4"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                >
                    {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-laserBlue to-slate-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div> */}
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Join our exclusive waitlist"
                        className="relative rounded-lg border-2 border-laserBlue bg-black/25 text-white placeholder:text-gray-300 w-full px-4 py-4 text-lg"
                        required
                        disabled={submitted}
                    />

                    <Button
                        type="submit"
                        className="relative z-60 w-full bg-gradient-to-r from-laserBlue to-slate-500 text-lg font-semibold text-white py-4 rounded-lg transition-all duration-300"
                        disabled={submitted}
                    >
                        {submitted ? "Thank you! 🚀" : "Get Early Access"}
                    </Button>
                </motion.form>
            </div>

            {submitted && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-blue-400 text-sm mt-2 text-center"
                >
                    You&apos;re on the list! We&apos;ll notify you when we
                    launch officially.
                </motion.p>
            )}

            <div className="p-4 flex justify-center flex-col">
                <TypePicker
                    options={[
                        {
                            value: "candidate",
                            label: "Candidates & Enterprises",
                        },
                        { value: "employer", label: "Employers" },
                    ]}
                    activeOption={userType}
                    onOptionChange={(option) =>
                        setUserType(option as "candidate" | "employer")
                    }
                />

                <section id="product">
                    <Features
                        content={
                            userType === "candidate"
                                ? candidateFeatures
                                : employerFeatures
                        }
                        userType={userType}
                    />
                </section>
                <section id="solutions">
                    <CompetitiveAnalysis />
                </section>
                <section id="testimonials">
                    {/* Add any resource-related content here */}
                    <TestimonialScroll />
                </section>
                <section id="pricing">
                    <Pricing />
                </section>
                <section id="about">
                    <GetStarted />
                </section>
            </div>
        </div>
    )
}
