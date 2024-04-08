"use client"
import { MainNav } from "@/components/landing/Banner"
import { LazyMotion, MotionProps, motion, domAnimation, m } from "framer-motion"
import AnimText from "@/components/motion/AnimText"
import { useTranslations } from "next-intl"
export type Props = {}
const animation: MotionProps = {
    transition: {
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1,
    },
    animate: { scale: 1.2 },
}
export default function Hero ({ params }: { params: { lang: string } }) {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } }
    const text =
        "Constructora de currículum de español a inglés y asistente personal".split(
            " "
        )
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible,
    }
    // const t = useTranslations("")
    return (
        <div className="flex h-screen justify-center bg-gradient-to-b from-white via-indigo-300 to-indigo-700">
            <header className="absolute inset-x-0 top-0 z-50">
                <MainNav />
            </header>
            <div className="relative isolate flex px-6 pt-10 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                ></div>
                <div className="sm:py-32 lg:pt-44 mx-auto max-w-2xl pt-44 grid-rows-3">
                    <div className="space-y-12 text-center flex flex-col items-center grid-rows-3">
                        <motion.div className="flex w-full h-64 -mt-20">
                            <AnimText delay={2} />
                        </motion.div>

                        <div className="flex items-center justify-center gap-x-6">
                            <motion.a
                                href="/s1"
                                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Construir currículum
                            </motion.a>
                            <motion.a
                                href="/moses"
                                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Asistente personal
                            </motion.a>
                        </div>
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-black ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Al crear una cuenta, aceptas nuestros términos
                                de servicio.{" "}
                                <a href="#" className="font-bold text-black">
                                    <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                    />
                                    Leer más.{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

