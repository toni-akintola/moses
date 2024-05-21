"use client"
import { MainNav } from "@/components/landing/Banner"
import { LazyMotion, MotionProps, motion, domAnimation, m } from "framer-motion"
import AnimText from "@/components/motion/AnimText"
import { SparklesCore } from "@/components/ui/sparkles"
import { LampContainer } from "@/components/ui/lamp"

export type HomeProps = {
    locale: string
    create: string
    title: string
    assistant: string
    tos: string
    readMore: string
}
const animation: MotionProps = {
    transition: {
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1,
    },
    animate: { scale: 1.2 },
}
export default function Home(home: HomeProps) {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } }

    return (
        <LampContainer>
            <div className="flex w-1/2">
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    {home.title}
                </motion.h1>
            </div>
        </LampContainer>
        //     <div className="relative isolate flex px-6 pt-10 lg:px-8">
        //         <div
        //             className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        //             aria-hidden="true"
        //         ></div>
        //         <div className="sm:py-32 lg:pt-44 mx-auto max-w-2xl pt-44 grid-rows-3">
        //             <div className="w-full absolute inset-0 h-screen">
        //     <SparklesCore
        //       id="tsparticlesfullpage"
        //       background="transparent"
        //       minSize={0.6}
        //       maxSize={1.4}
        //       particleDensity={100}
        //       className="w-full h-full"
        //       particleColor="#FFFFFF"
        //     />
        //   </div>
        //   <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        //     Build great products
        //   </h1>
        //             <div className="space-y-12 text-center flex flex-col items-center grid-rows-3">
        //                 <motion.div className="flex w-full h-64 -mt-20">
        //                     {/* <AnimText delay={2} /> */}
        //                     <SparklesCore
        //       background="transparent"
        //       minSize={0.4}
        //       maxSize={1}
        //       particleDensity={1200}
        //       className="w-full h-full"
        //       particleColor="#FFFFFF"
        //     />
        //                 </motion.div>
        //                 <div className="flex items-center justify-center gap-x-6">
        //                     <motion.a
        //                         href={`${home.locale}/resume-builder/s1`}
        //                         className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        //                         whileHover={{ scale: 1.1 }}
        //                         whileTap={{ scale: 0.9 }}
        //                     >
        //                         {home.create}
        //                     </motion.a>
        //                     <motion.a
        //                         href={`${home.locale}/moses`}
        //                         className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        //                         whileHover={{ scale: 1.1 }}
        //                         whileTap={{ scale: 0.9 }}
        //                     >
        //                         {home.assistant}
        //                     </motion.a>
        //                 </div>
        //                 <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        //                     <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-black ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        //                         {home.tos}{" "}
        //                         <a href="#" className="font-bold text-black">
        //                             <span
        //                                 className="absolute inset-0"
        //                                 aria-hidden="true"
        //                             />
        //                             {home.readMore}{" "}
        //                             <span aria-hidden="true">&rarr;</span>
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
    )
}
