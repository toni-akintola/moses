"use client"
import { MainNav } from "@/components/layout/banner"
import { LazyMotion, MotionProps, motion, domAnimation, m } from "framer-motion"
import AnimText from "@/components/motion/AnimText"
import { SparklesCore } from "@/components/ui/sparkles"
import { LampContainer } from "@/components/ui/lamp"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import Image from "next/image"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { PinContainer } from "@/components/ui/3d-pin"
import Link from "next/link"
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

export default function Home({ home, locale }: HomeProps) {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } }
    const content = [
        {
            title: home.scrollOneTitle,
            description: home.scrollOneDescription,
            content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                    {home.scrollOneCaption}
                </div>
            ),
        },
        {
            title: home.scrollTwoTitle,
            description: home.scrollTwoDescription,
            content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                    {home.scrollTwoCaption}
                </div>
            ),
        },
        {
            title: home.scrollThreeTitle,
            description: home.scrollThreeDescription,
            content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--violet-500),var(--cyan-500))] flex items-center justify-center text-white">
                    {home.scrollThreeCaption}
                </div>
            ),
        },
    ]

    return (
        <div className="h-full p-4">
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
                        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-white md:text-7xl mt-10"
                    >
                        {home.title}
                    </motion.h1>
                </div>
            </LampContainer>
            <div className="w-full flex items-center justify-center py-8 flex-col md:flex-row gap-y-20 mb-10">
                <Link href={`${locale}/resume-builder`}>
                    <PinContainer
                        title={home.create}
                        href={`${locale}/resume-builder`}
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
                <Link href={`${locale}/moses`}>
                    <PinContainer
                        title={home.assistant}
                        href={`${locale}/moses`}
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