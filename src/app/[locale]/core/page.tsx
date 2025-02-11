import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
import { Candidate, Match } from "../../../../types/types"
import { auth } from "@clerk/nextjs/server"
import {
    TargetIcon,
    Users,
    TrendingUp,
    Rocket,
    Zap,
    Award,
    BarChart3,
    Globe,
    Briefcase,
    FileSpreadsheet,
    Filter,
    TrendingDown,
    Clock,
    Building2,
    GraduationCap,
    LineChart,
    PieChart,
    Calendar,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Progress from "@/components/ui/progress"

export default async function Page() {
    const supabase = await createClerkSupabaseClientSsr()
    const { userId } = await auth()
    const profileID = userId
    const { data: matchData, error: matchError } = await supabase
        .from("matches")
        .select("*")
        .eq("profile_id", profileID)
    const { data: candidateData, error } = await supabase
        .from("candidates")
        .select()
        .eq("profile_id", profileID)

    const matches = matchData as Match[]
    const candidates = candidateData as Candidate[]

    return (
        <ScrollArea className="h-full bg-white/95">
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h2
                        className="text-4xl font-bold tracking-tight text-gray-900 
                        animate-fade-in-left opacity-0 animate-delay-300 animate-duration-700"
                    >
                        Welcome Back, Innovator 🚀
                    </h2>
                    <div className="flex items-center space-x-4">
                        <Badge
                            variant="outline"
                            className="bg-laserBlue/10 text-laserBlue border-laserBlue/30"
                        >
                            Pro User
                        </Badge>
                        <Avatar className="animate-bounce-slow">
                            <AvatarImage
                                src="/headshots/lpost.jpg"
                                alt="User Avatar"
                            />
                            <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-gray-100 border border-gray-200">
                        <TabsTrigger
                            value="overview"
                            className="text-gray-700 data-[state=active]:bg-laserBlue/20 data-[state=active]:text-laserBlue"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            className="text-gray-700 data-[state=active]:bg-laserBlue/20 data-[state=active]:text-laserBlue"
                        >
                            Advanced Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="reports"
                            className="text-gray-700 data-[state=active]:bg-laserBlue/20 data-[state=active]:text-laserBlue"
                        >
                            Reports
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up animate-delay-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Matches
                                    </CardTitle>
                                    <TargetIcon className="text-laserBlue" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-laserBlue">
                                        {matches.length}
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <TrendingUp className="text-green-600 h-4 w-4" />
                                        <p className="text-xs text-green-600">
                                            +20.1% from last month
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up animate-delay-700">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Candidates
                                    </CardTitle>
                                    <Users className="text-laserBlue" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-laserBlue">
                                        {candidates.length}
                                    </div>
                                    <Progress
                                        value={candidates.length * 5}
                                        className="mt-2 bg-slate-200"
                                        indicatorClassName="bg-laserBlue"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Profile Completeness
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up animate-delay-900">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Job Placements
                                    </CardTitle>
                                    <Rocket className="text-laserBlue" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-laserBlue">
                                        0
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Zap className="text-yellow-600 h-4 w-4" />
                                        <p className="text-xs text-yellow-600">
                                            Opportunities Pending
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-left animate-delay-1100">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800">
                                        <BarChart3 className="mr-2 text-laserBlue" />
                                        Performance Insights
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">
                                                Candidate Engagement
                                            </span>
                                            <span className="text-laserBlue">
                                                72%
                                            </span>
                                        </div>
                                        <Progress
                                            value={72}
                                            className="bg-slate-200"
                                            indicatorClassName="bg-laserBlue"
                                        />

                                        <div className="flex justify-between">
                                            <span className="text-gray-700">
                                                Placement Success Rate
                                            </span>
                                            <span className="text-laserBlue">
                                                65%
                                            </span>
                                        </div>
                                        <Progress
                                            value={65}
                                            className="bg-slate-200"
                                            indicatorClassName="bg-laserBlue"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-right animate-delay-1100">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800">
                                        <FileSpreadsheet className="mr-2 text-laserBlue" />
                                        Candidate Pipeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Filter className="text-laserBlue" />
                                                <span className="text-gray-700">
                                                    Screening
                                                </span>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-50 text-blue-700"
                                            >
                                                12 Candidates
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <TrendingDown className="text-laserBlue" />
                                                <span className="text-gray-700">
                                                    Interview Stage
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-yellow-700 border-yellow-300"
                                            >
                                                5 Candidates
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Award className="text-laserBlue" />
                                                <span className="text-gray-700">
                                                    Final Selection
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-green-700 border-green-300"
                                            >
                                                3 Candidates
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800 text-sm">
                                        <Clock className="mr-2 text-laserBlue h-4 w-4" />
                                        Time to Placement
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-laserBlue">
                                        45 days
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Average time from application to
                                        placement
                                    </p>
                                    <Progress
                                        value={75}
                                        className="mt-4 bg-slate-200"
                                        indicatorClassName="bg-laserBlue"
                                    />
                                    <p className="text-xs text-green-600 mt-2">
                                        25% faster than industry average
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800 text-sm">
                                        <Building2 className="mr-2 text-laserBlue h-4 w-4" />
                                        Top Industries
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Technology
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="bg-purple-50 text-purple-700"
                                            >
                                                45%
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Healthcare
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-50 text-blue-700"
                                            >
                                                30%
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Finance
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="bg-green-50 text-green-700"
                                            >
                                                25%
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800 text-sm">
                                        <GraduationCap className="mr-2 text-laserBlue h-4 w-4" />
                                        Skills in Demand
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Machine Learning
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-laserBlue border-laserBlue/30"
                                            >
                                                High
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Cloud Computing
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-laserBlue border-laserBlue/30"
                                            >
                                                High
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Data Analysis
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-laserBlue border-laserBlue/30"
                                            >
                                                Medium
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800">
                                        <Calendar className="mr-2 text-laserBlue" />
                                        Upcoming Interviews
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>
                                                        JD
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        John Doe
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Software Engineer
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className="bg-laserBlue/10 text-laserBlue">
                                                Today, 2:00 PM
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>
                                                        AS
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Alice Smith
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Data Scientist
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className="bg-gray-100 text-gray-700">
                                                Tomorrow, 10:00 AM
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800">
                                        <LineChart className="mr-2 text-laserBlue" />
                                        Recruitment Trends
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">
                                                    Application Rate
                                                </p>
                                                <p className="text-2xl font-bold text-laserBlue">
                                                    +12.5%
                                                </p>
                                            </div>
                                            <PieChart className="text-laserBlue h-8 w-8" />
                                        </div>
                                        <Progress
                                            value={85}
                                            className="bg-slate-200"
                                            indicatorClassName="bg-laserBlue"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>
                                                Previous: 125 applications
                                            </span>
                                            <span>
                                                Current: 142 applications
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
                        <div className="text-gray-900 text-center py-20 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse">
                            <h3 className="text-2xl font-bold mb-4">
                                Advanced Analytics
                            </h3>
                            <p className="text-gray-500">
                                Coming soon with deeper insights and AI-powered
                                recommendations
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="reports" className="space-y-6">
                        <div className="text-gray-900 text-center py-20 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-bold mb-4">
                                Custom Reports
                            </h3>
                            <p className="text-gray-500">
                                Generate detailed reports and analytics
                            </p>
                            <div className="mt-6 flex justify-center space-x-4">
                                <Badge
                                    variant="outline"
                                    className="px-4 py-2 cursor-pointer hover:bg-laserBlue/10"
                                >
                                    Export PDF
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="px-4 py-2 cursor-pointer hover:bg-laserBlue/10"
                                >
                                    Export CSV
                                </Badge>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    )
}
