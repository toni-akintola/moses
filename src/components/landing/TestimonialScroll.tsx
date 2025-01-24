"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

export const TestimonialScroll = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const testimonials = [
        {
            name: "Jillian Snavley",
            role: "Global Recruiting Sourcing Lead",
            company: "Accenture",
            quote: "I love how easy it is, like it’s quick and easy.\nMost of the technologies I’ve seen in this space are so complicated.",
            image: "/headshots/jsnavley.png",
            rating: 5,
        },
        {
            name: "Richard Castellini",
            role: "Former SVP",
            company: "CareerBuilder",
            quote: "The resume builder is incredibly intuitive. I was able to create a professional resume in minutes, highlighting my strengths in ways I never thought possible.",
            image: "/headshots/rcastellini.png",
            rating: 5,
        },
        {
            name: "Chris Grandpre",
            role: "Operating Partner",
            company: "MidOcean Partners",
            quote: "There is an aging trade labor force in the U.S. and an increasing gap in labor supply in the trades relative to the demand.  Tools like this can help blue collar employers address this challenge.",
            image: "/headshots/cgrandpre.png",
            rating: 5,
        },
        {
            name: "Lilliam Post",
            role: "Community Liaison",
            company: "Catholic Multicultural Center",
            quote: "I am excited [about] the pilot project.\nÈxodo is giving us hope in securing jobs for people in our community.",
            image: "/headshots/lpost.png",
            rating: 5,
        },
    ]

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        )
    }

    return (
        <div className="bg-slate-950 py-24 px-4 w-full overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                    What People Are Saying About Èxodo
                </h2>
                <p className="text-lg text-slate-400">
                    Whether you're an executive or a community leader, Èxodo can
                    be your superpower.
                </p>
            </div>
            <div className="max-w-4xl mx-auto relative group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 flex items-start space-x-6 border border-slate-600 hover:border-[#06b6d4] transition-all duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex-shrink-0">
                            <Image
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                width={500}
                                height={500}
                                className="rounded-full object-cover w-20 h-20"
                            />
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {testimonials[currentIndex].name}
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                        {testimonials[currentIndex].role} @{" "}
                                        {testimonials[currentIndex].company}
                                    </p>
                                </div>
                            </div>
                            <div className="relative mt-4">
                                <p className="text-slate-300 italic text-balance whitespace-pre-wrap">
                                    {testimonials[currentIndex].quote}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="top-1/2 -translate-y-1/2 w-full flex justify-between -left-16 -right-16 opacity-100 transition-opacity duration-300 mt-10">
                    <button
                        onClick={prevTestimonial}
                        className="bg-slate-800/50 hover:bg-slate-700/50 rounded-full p-2 backdrop-blur-sm"
                    >
                        <ChevronLeft className="text-[#06b6d4] w-6 h-6" />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="bg-slate-800/50 hover:bg-slate-700/50 rounded-full p-2 backdrop-blur-sm"
                    >
                        <ChevronRight className="text-[#06b6d4] w-6 h-6" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? "bg-[#06b6d4] w-6"
                                    : "bg-slate-600"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
