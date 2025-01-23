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

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
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
            image: "/resume-builder.png",
            gradient: "from-[#814A9E80] to-[#BAB0BB80]",
            featured: false,
        },
        {
            title: "Multi-lingual Options",
            description:
                "Break language barriers with seamless multi-language support",
            image: "/multilingual.png",
            gradient: "from-[#278E9B80] to-[#B7BDC580]",
            featured: false,
        },
        {
            title: "Manage Matches & Candidates",
            description:
                "Streamline your hiring process with advanced candidate tracking",
            image: "/candidates.png",
            gradient: "from-[#278E9B80] to-[#B7BDC580]",
            featured: true,
        },
        {
            title: "Virtual AI Assistant",
            description:
                "Your personal AI-powered career companion and job search ally",
            image: "/assistant.png",
            gradient: "from-[#814A9E80] to-[#BAB0BB80]",
            featured: false,
        },
    ]

    const employerFeatures = [
        {
            title: "Advanced Candidate Matching",
            description:
                "Leverage AI to find the most suitable candidates for your roles",
            image: "/candidate-matching.png",
            gradient: "from-[#814A9E80] to-[#BAB0BB80]",
            featured: false,
        },
        {
            title: "Comprehensive Candidate Profiles",
            description:
                "Access detailed, multi-dimensional candidate insights",
            image: "/candidate-profiles.png",
            gradient: "from-[#278E9B80] to-[#B7BDC580]",
            featured: false,
        },
        {
            title: "Diversity & Inclusion Tools",
            description:
                "Enhance your hiring process with intelligent diversity screening",
            image: "/diversity-tools.png",
            gradient: "from-[#278E9B80] to-[#B7BDC580]",
            featured: true,
        },
        {
            title: "Recruitment Analytics",
            description:
                "Gain deep insights into your hiring performance and trends",
            image: "/recruitment-analytics.png",
            gradient: "from-[#814A9E80] to-[#BAB0BB80]",
            featured: false,
        },
    ]

    return (
        <div className="h-full p-4">
            <MainNav
                information={home.information}
                language={home.language}
                access={home.access}
            />
            <LampContainer className="h-full -mb-10 overflow-x-hidden">
                <motion.div
                    className="w-3/4 md:w-2/3 text-center flex items-center flex-col space-y-4"
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                >
                    <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-white md:text-7xl mt-10">
                        {/* {home.title} */}
                        Job-matching redefined
                    </h1>
                    <p className="text-white text-lg">
                        An AI-powered job placement solution for the vulnerable
                        and underserved.
                    </p>
                    <div className="w-3/4 md:w-2/3 text-center flex justify-between">
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
                    </div>
                </motion.div>
            </LampContainer>

            <div className="p-4 flex justify-center flex-col -mt-40">
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
                    <TestimonialScroll />
                    <CompetitiveAnalysis />
                </section>
                <section id="resources">
                    {/* Add any resource-related content here */}
                    <div className="text-white text-center py-10">
                        Resources coming soon
                    </div>
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
