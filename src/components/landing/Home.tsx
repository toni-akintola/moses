"use client"
import { MainNav } from "@/components/layout/main-nav"
import { motion } from "motion/react"
import { LampContainer } from "@/components/ui/lamp"
import { Features } from "@/components/landing/Features"
import { useState } from "react"
import { TypePicker } from "@/components/ui/type-picker"

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
                    <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-white md:text-8xl">
                        Blue collar hiring redefined
                    </h1>
                    <p className="text-white text-lg lg:text-2xl">
                        An AI-powered job placement solution for blue collar
                        workers, tradespeople, and migrants.
                    </p>
                    {/* <div className="w-3/4 md:w-2/3 text-center flex justify-between">
                        <motion.a
                            className="text-clear bg-laserBlue text-lg p-1 px-4 rounded-full"
                            href={`${locale}/core`}
                        >
                            Sign up
                        </motion.a>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="text-clear text-lg p-1 px-4 rounded-full text-laserBlue"
                        >
                            Learn more
                        </HoverBorderGradient>
                    </div> */}
                </motion.div>
            </LampContainer>

            <div className="p-4 flex justify-center flex-col -mt-72">
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
