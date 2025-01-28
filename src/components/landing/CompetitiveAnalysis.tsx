import { Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const competitiveFeatures = [
    {
        feature: "AI-Powered Matching",
        ourProduct: true,
        linkedin: false,
        indeed: false,
        description:
            "Advanced AI that precisely matches candidates with job opportunities",
    },
    {
        feature: "Blue Collar Job Focus",
        ourProduct: true,
        linkedin: false,
        indeed: false,
        description:
            "Specialized platform for blue collar and underserved job markets",
    },
    {
        feature: "Free for Employers",
        ourProduct: true,
        linkedin: false,
        indeed: false,
        description: "No upfront costs or subscription fees for job postings",
    },
    {
        feature: "Multi-Language Support",
        ourProduct: true,
        linkedin: false,
        indeed: false,
        description:
            "Comprehensive language options to reach diverse talent pools",
    },
    {
        feature: "Comprehensive Job Listings",
        ourProduct: true,
        linkedin: true,
        indeed: true,
        description: "Extensive job posting capabilities",
    },
    {
        feature: "Basic Candidate Filtering",
        ourProduct: true,
        linkedin: true,
        indeed: true,
        description: "Standard candidate search and filtering options",
    },
]

const CompetitiveAnalysis = () => {
    return (
        <div className="bg-slate-950 py-24 px-4 w-full">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                    Why Choose Us Over Traditional Platforms
                </h2>
                <p className="text-lg text-slate-400">
                    A superior solution for employers and job seekers
                </p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LinkedIn Card */}
                <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">
                            LinkedIn
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {competitiveFeatures.map((item) => (
                                <li
                                    key={item.feature}
                                    className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-b-0"
                                >
                                    <div>
                                        <h4 className="text-white font-semibold">
                                            {item.feature}
                                        </h4>
                                    </div>
                                    {item.linkedin ? (
                                        <Check className="h-6 w-6 text-slate-500" />
                                    ) : (
                                        <X className="h-6 w-6 text-slate-600" />
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <Link href="https://www.linkedin.com/">
                                <Button
                                    variant="outline"
                                    className="w-full border-slate-700 text-slate-300 bg-slate-800/50"
                                >
                                    Visit LinkedIn
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Indeed Card */}
                <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">
                            Indeed
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {competitiveFeatures.map((item) => (
                                <li
                                    key={item.feature}
                                    className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-b-0"
                                >
                                    <div>
                                        <h4 className="text-white font-semibold">
                                            {item.feature}
                                        </h4>
                                    </div>
                                    {item.indeed ? (
                                        <Check className="h-6 w-6 text-slate-500" />
                                    ) : (
                                        <X className="h-6 w-6 text-slate-600" />
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <Link href="https://www.indeed.com/">
                                <Button
                                    variant="outline"
                                    className="w-full border-slate-700 text-slate-300 bg-slate-800/50"
                                >
                                    Visit Indeed
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                {/* Our Product Card */}
                <Card className="bg-slate-800 backdrop-blur-sm border border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white flex justify-between items-center">
                            Our Platform
                            <span className="bg-[#06b6d4] text-white px-3 py-1 rounded-full text-sm font-medium">
                                Recommended
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {competitiveFeatures.map((item) => (
                                <li
                                    key={item.feature}
                                    className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-b-0"
                                >
                                    <div>
                                        <h4 className="text-white font-semibold">
                                            {item.feature}
                                        </h4>
                                        <p className="text-slate-400 text-sm text-balance">
                                            {item.description}
                                        </p>
                                    </div>
                                    {item.ourProduct ? (
                                        <Check className="h-6 w-6 text-[#06b6d4]" />
                                    ) : (
                                        <X className="h-6 w-6 text-slate-600" />
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <Link href="#">
                                <Button className="w-full bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-white">
                                    Start Hiring Now
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CompetitiveAnalysis
