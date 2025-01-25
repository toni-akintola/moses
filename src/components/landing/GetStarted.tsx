import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const GetStarted = () => {
    return (
        <div className="bg-slate-950 py-12 md:py-24 px-4 sm:px-6 w-full overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-12 border border-slate-800"
            >
                {/* Left side - Text content */}
                <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                    <div className="space-y-4 md:space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-3xl md:text-4xl font-bold text-white max-w-[389px] sm:max-w-none lg:max-w-[389px]"
                        >
                            Ready to transform your career?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg md:text-xl text-slate-400 max-w-[389px] sm:max-w-none lg:max-w-[389px]"
                        >
                            Join our platform and unlock AI-powered job matching
                            designed to elevate your professional journey
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
                        >
                            <Link href="/sign-up">
                                <Button className="w-full sm:w-auto bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-white flex items-center justify-center group">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto border-slate-700 text-slate-300 bg-slate-800/50 flex items-center justify-center group"
                            >
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Right side - Gradient Background */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[407px] relative"
                >
                    <div className="bg-gradient-to-br from-slate-800 to-laserBlue rounded-[26px] overflow-hidden h-full transform hover:scale-[1.02] transition-transform duration-300">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-laserBlue/10 animate-pulse" />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default GetStarted
