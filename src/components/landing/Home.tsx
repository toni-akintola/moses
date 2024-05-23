"use client"
import { MainNav } from "@/components/landing/Banner"
import { LazyMotion, MotionProps, motion, domAnimation, m } from "framer-motion"
import AnimText from "@/components/motion/AnimText"
import { SparklesCore } from "@/components/ui/sparkles"
import { LampContainer } from "@/components/ui/lamp"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import Image from "next/image"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { PinContainer } from "@/components/ui/3d-pin"
import Link from "next/link"
export type HomeProps = {
    information: string
    language: string
    access: string
    locale: string
    create: string
    createSubtitle: string
    title: string
    assistant: string
    assistantSubtitle: string
    tos: string
    readMore: string
}

export default function Home(home: HomeProps) {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } }
    const content = [
    {
        title: "Deep learning powered resume builder",
        description:
            "Thanks to DeepL's state of the art language translation technology, our resume builder can translate your information from any source language into English.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                Language-agnostic
            </div>
        ),
    },
    {
        title: "AI personal assistant",
        description:
            "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                At your service
            </div>
        ),
    },
    {
        title: "Supply and demand marketplace",
        description:
            "Note: this feature is currently still in development. Exodo matches candidates and employers based on candidate qualifications and employer requirements.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--violet-500),var(--cyan-500))] flex items-center justify-center text-white">
                Matches candidates with employers
            </div>
        ),
    },
]

    return (
        <div className="h-screen p-4">
          <MainNav
                    information={home.information}
                    language={home.language}
                    access={home.access}
                />
            <LampContainer className="h-full -mb-10">
                <div className="w-3/4 md:w-1/2">
                    <motion.h1
                        initial={{ opacity: 0.5, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl mt-10"
                    >
                        {home.title}
                    </motion.h1>
                </div>
            </LampContainer>
            <div className="w-full flex items-center justify-center py-8 flex-col md:flex-row gap-y-20 mb-10">
                <Link href={`${home.locale}/resume-builder/s1`}>
                    <PinContainer
                        title={home.create}
                        href={`${home.locale}/resume-builder/s1`}
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                                {home.create}
                            </h3>
                            <div className="text-base !m-0 !p-0 font-normal">
                                <span className="text-slate-500 ">
                                    {home.createSubtitle}
                                </span>
                            </div>
                            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                        </div>
                    </PinContainer>
                </Link>
                <Link href={`${home.locale}/moses`}>
                    <PinContainer
                        title={home.assistant}
                        href={`${home.locale}/moses`}
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                                {home.assistant}
                            </h3>
                            <div className="text-base !m-0 !p-0 font-normal">
                                <span className="text-slate-500 ">
                                    {home.assistantSubtitle}
                                </span>
                            </div>
                            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                        </div>
                    </PinContainer>
                </Link>
            </div>
            <div className="p-4 flex justify-center">
              <StickyScroll content={content} />
            </div>
        </div>
        
    )
}
