"use client"
import { MainNav } from "@/components/landing/Banner"
import { LazyMotion, MotionProps, motion, domAnimation, m } from "framer-motion"
import AnimText from "@/components/motion/AnimText"

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
const Hero = (props: Props) => {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } }
    const text =
        "Constructora de currículum de español a inglés y asistente personal".split(
            " "
        )
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible,
    }
    return (
        <div className="flex h-screen justify-center bg-gradient-to-b from-white via-indigo-300 to-indigo-700">
            <header className="absolute inset-x-0 top-0 z-50">
                <MainNav />
            </header>
            <div className="relative isolate flex px-6 pt-10 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    {/* closing addition */}
                    {/* <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    /> */}
                </div>
                <div className="sm:py-32 lg:pt-44 mx-auto max-w-2xl pt-44 grid-rows-3">
                    <div className="space-y-12 text-center flex flex-col items-center grid-rows-3">
                        <motion.div className="flex">
                            <AnimText delay={2} />
                        </motion.div>
                        {/* <AnimatedHeader text="Constructora de currículum de español a inglés y asistente personal" /> */}
                        {/* <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Constructora de currículum de español a inglés y
                            asistente personal
                        </h1> */}

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <motion.a
                                href="/s1"
                                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Crear currículum
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

export default Hero
