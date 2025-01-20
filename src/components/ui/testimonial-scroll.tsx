"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

export const TestimonialScroll = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const testimonials = [
        {
            name: "Maria Rodriguez",
            role: "Software Engineer",
            company: "TechInnovate",
            quote: "This platform completely transformed my job search. The AI-powered matching helped me find a role that perfectly aligns with my skills and career goals.",
            image: "/testimonial-1.jpg",
            rating: 5,
        },
        {
            name: "Alex Chen",
            role: "Product Manager",
            company: "StartupHub",
            quote: "The resume builder is incredibly intuitive. I was able to create a professional resume in minutes, highlighting my strengths in ways I never thought possible.",
            image: "/testimonial-2.jpg",
            rating: 5,
        },
        {
            name: "Sarah Thompson",
            role: "HR Director",
            company: "Global Enterprises",
            quote: "As an employer, this platform has streamlined our hiring process. The candidate matching is precise and saves us countless hours of manual screening.",
            image: "/testimonial-3.jpg",
            rating: 5,
        },
        {
            name: "David Kim",
            role: "Freelance Designer",
            company: "Independent",
            quote: "The multi-language support was a game-changer for me. I can now showcase my skills to international employers with ease.",
            image: "/testimonial-4.jpg",
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
                    What Our Users Say
                </h2>
                <p className="text-lg text-slate-400">
                    Real stories from people whose careers have been transformed
                </p>
            </div>
            <div className="max-w-4xl mx-auto relative group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 flex items-start space-x-6 border border-slate-800 hover:border-[#06b6d4] transition-all duration-300"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex-shrink-0">
                            <Image
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                width={100}
                                height={100}
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
                                        {testimonials[currentIndex].role} at{" "}
                                        {testimonials[currentIndex].company}
                                    </p>
                                </div>
                                <div className="flex text-[#06b6d4]">
                                    {[
                                        ...Array(
                                            testimonials[currentIndex].rating
                                        ),
                                    ].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 fill-current"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="relative mt-4">
                                <Quote className="absolute -left-8 top-0 text-slate-700 w-6 h-6" />
                                <p className="text-slate-300 italic pl-6">
                                    {testimonials[currentIndex].quote}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="top-1/2 -translate-y-1/2 w-full flex justify-between -left-16 -right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-10">
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
