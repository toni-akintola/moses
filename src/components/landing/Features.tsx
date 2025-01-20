import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const features = [
    {
        name: "Comprehensive Resume Builder",
        description:
            "Craft a professional resume with our intuitive, AI-powered builder",
        image: "/resume-builder.png",
        gradient: "from-[#814A9E80] to-[#BAB0BB80]",
        featured: false,
    },
    {
        name: "Multi-lingual Options",
        description:
            "Break language barriers with seamless multi-language support",
        image: "/multilingual.png",
        gradient: "from-[#278E9B80] to-[#B7BDC580]",
        featured: false,
    },
    {
        name: "Manage Matches & Candidates",
        description:
            "Streamline your hiring process with advanced candidate tracking",
        image: "/candidates.png",
        gradient: "from-[#278E9B80] to-[#B7BDC580]",
        featured: true,
    },
    {
        name: "Virtual AI Assistant",
        description:
            "Your personal AI-powered career companion and job search ally",
        image: "/assistant.png",
        gradient: "from-[#814A9E80] to-[#BAB0BB80]",
        featured: false,
    },
]

const Features = () => {
    return (
        <div className="py-24 px-4 bg-slate-950">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                    Product Features
                </h2>
                <p className="text-lg text-slate-400">
                    Powerful tools designed to elevate your job search and
                    hiring process
                </p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature) => (
                    <Card
                        key={feature.name}
                        className={`relative backdrop-blur-sm border-slate-800 ${
                            feature.featured
                                ? "bg-slate-900/40 border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                : "bg-slate-900/40"
                        }`}
                    >
                        {feature.featured && (
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                {/* <span className="bg-[#06b6d4] text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </span> */}
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl text-white flex justify-between items-center">
                                {feature.name}
                                <ArrowRight className="h-6 w-6 text-[#06b6d4]" />
                            </CardTitle>
                            <p className="text-slate-400 mt-2">
                                {feature.description}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div
                                className={`rounded-[30px] overflow-hidden relative bg-gradient-to-br ${feature.gradient}`}
                            >
                                <Image
                                    src={feature.image}
                                    alt={feature.name}
                                    width={864}
                                    height={275}
                                    className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Features
