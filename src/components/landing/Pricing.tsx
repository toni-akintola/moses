import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"

const pricingPlans = [
    {
        name: "Candidates",
        price: "Free",
        description: "For individual job seekers",
        features: [
            "AI-powered job matching",
            "Resume parsing and analysis",
            "Personalized job recommendations",
            "Application tracking",
            "Career insights dashboard",
        ],
        featured: true,
    },
    {
        name: "Enterprise",
        price: "Free",

        description: "For businesses looking to place blue collar candidates",
        features: [
            "Post unlimited job listings",
            "AI candidate matching",
            "Applicant tracking system",
            "Interview scheduling",
            "Analytics dashboard",
        ],
    },
    {
        name: "Employers",
        price: "10% commission",
        description: "For large organizations with complex hiring needs",
        features: [
            "Custom API integration",
            "Dedicated account manager",
            "Custom workflow automation",
            "Advanced analytics & reporting",
            "Priority support",
        ],
    },
]

const Pricing = () => {
    return (
        <div className="py-24 px-4 bg-slate-950">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-slate-400">
                    Choose the plan that&apos;s right for you
                </p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative backdrop-blur-sm border-slate-800 ${
                            plan.featured
                                ? "bg-slate-800 border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                : "bg-slate-800/50"
                        }`}
                    >
                        {plan.featured && (
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <span className="bg-[#06b6d4] text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">
                                {plan.name}
                            </CardTitle>
                            <CardDescription className="text-slate-400">
                                {plan.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-white">
                                    {plan.price}
                                </span>
                                {/* {plan.period && (
                                    <span className="text-slate-400 ml-1">
                                        {plan.period}
                                    </span>
                                )} */}
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center text-slate-300"
                                    >
                                        <Check className="h-5 w-5 text-[#06b6d4] mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className={`w-full ${
                                    plan.featured
                                        ? "bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-white"
                                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                                }`}
                            >
                                {plan.name === "Employers"
                                    ? "Contact Sales"
                                    : "Get Started"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Pricing
