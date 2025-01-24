import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const GetStarted = () => {
    return (
        <div className="bg-slate-950 py-24 px-4 w-full">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-slate-800">
                {/* Left side - Text content */}
                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-white max-w-[389px]">
                            Ready to transform your career?
                        </h2>
                        <p className="text-xl text-slate-400 max-w-[389px]">
                            Join our platform and unlock AI-powered job matching
                            designed to elevate your professional journey
                        </p>
                        <div className="flex items-center space-x-4">
                            <Button className="bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-white flex items-center group">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                className="border-slate-700 text-slate-300 bg-slate-800/50 flex items-center group"
                            >
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right side - Gradient Background */}
                <div className="w-full lg:w-1/2 h-[407px] relative">
                    <div className="bg-gradient-to-br from-slate-800 to-laserBlue   rounded-[26px] overflow-hidden h-full"></div>
                </div>
            </div>
        </div>
    )
}

export default GetStarted
