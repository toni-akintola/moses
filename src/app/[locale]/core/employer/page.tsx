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
import { Job, Application } from "../../../../../types/types"
import { auth } from "@clerk/nextjs/server"
import {
    Briefcase,
    Users,
    TrendingUp,
    Building2,
    Zap,
    Award,
    BarChart3,
    FileSpreadsheet,
    Filter,
    TrendingDown,
    Clock,
    GraduationCap,
    LineChart,
    PieChart,
    Calendar,
    DollarSign,
    Target,
    CheckCircle2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Progress from "@/components/ui/progress"

export default async function EmployerDashboard() {
    const supabase = await createClerkSupabaseClientSsr()
    const { userId } = await auth()
    const profileID = userId
    const { data: jobsData } = await supabase
        .from("jobs")
        .select("*")
        .eq("employer_id", profileID)
    const { data: applicationsData } = await supabase
        .from("applications")
        .select("*")
        .eq("employer_id", profileID)

    const jobs = (jobsData as Job[]) || []
    const applications = (applicationsData as Application[]) || []

    return (
        <ScrollArea className="h-full bg-white/95">
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h2
                        className="text-4xl font-bold tracking-tight text-gray-900 
                        animate-fade-in-left opacity-0 animate-delay-300 animate-duration-700"
                    >
                        Welcome Back, Employer 🏢
                    </h2>
                    <div className="flex items-center space-x-4">
                        <Badge
                            variant="outline"
                            className="bg-laserBlue/10 text-laserBlue border-laserBlue/30"
                        >
                            Enterprise
                        </Badge>
                        <Avatar className="animate-bounce-slow">
                            <AvatarImage
                                src="/headshots/company.jpg"
                                alt="Company Logo"
                            />
                            <AvatarFallback>CO</AvatarFallback>
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
                                        Active Jobs
                                    </CardTitle>
                                    <Briefcase className="text-laserBlue" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-laserBlue">
                                        {jobs.length}
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <TrendingUp className="text-green-600 h-4 w-4" />
                                        <p className="text-xs text-green-600">
                                            +15.3% from last month
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up animate-delay-700">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Total Applications
                                    </CardTitle>
                                    <Users className="text-laserBlue" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-laserBlue">
                                        {applications.length}
                                    </div>
                                    <Progress
                                        value={85}
                                        className="mt-2 bg-slate-200"
                                        indicatorClassName="bg-laserBlue"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Application Quality Score
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up animate-delay-900">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        Successful Hires
                                    </CardTitle>
                                    <CheckCircle2 className="text-laserBlue" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-laserBlue">
                                        12
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Target className="text-green-600 h-4 w-4" />
                                        <p className="text-xs text-green-600">
                                            80% of quarterly goal
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
                                        Recruitment Metrics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">
                                                Time-to-Hire
                                            </span>
                                            <span className="text-laserBlue">
                                                85%
                                            </span>
                                        </div>
                                        <Progress
                                            value={85}
                                            className="bg-slate-200"
                                            indicatorClassName="bg-laserBlue"
                                        />

                                        <div className="flex justify-between">
                                            <span className="text-gray-700">
                                                Offer Acceptance Rate
                                            </span>
                                            <span className="text-laserBlue">
                                                92%
                                            </span>
                                        </div>
                                        <Progress
                                            value={92}
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
                                        Hiring Pipeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Filter className="text-laserBlue" />
                                                <span className="text-gray-700">
                                                    Application Review
                                                </span>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-50 text-blue-700"
                                            >
                                                48 Pending
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Users className="text-laserBlue" />
                                                <span className="text-gray-700">
                                                    Interviews Scheduled
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-yellow-700 border-yellow-300"
                                            >
                                                15 Today
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <DollarSign className="text-laserBlue" />
                                                <span className="text-gray-700">
                                                    Offers Extended
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-green-700 border-green-300"
                                            >
                                                8 Active
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
                                        Recruitment Speed
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-laserBlue">
                                        18 days
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Average time to fill position
                                    </p>
                                    <Progress
                                        value={88}
                                        className="mt-4 bg-slate-200"
                                        indicatorClassName="bg-laserBlue"
                                    />
                                    <p className="text-xs text-green-600 mt-2">
                                        32% faster than industry average
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800 text-sm">
                                        <Building2 className="mr-2 text-laserBlue h-4 w-4" />
                                        Department Hiring
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Engineering
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="bg-purple-50 text-purple-700"
                                            >
                                                12 Open
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Sales
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-50 text-blue-700"
                                            >
                                                8 Open
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                Marketing
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="bg-green-50 text-green-700"
                                            >
                                                5 Open
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900 animate-fade-in-up">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800 text-sm">
                                        <GraduationCap className="mr-2 text-laserBlue h-4 w-4" />
                                        Top Required Skills
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                React/Next.js
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-laserBlue border-laserBlue/30"
                                            >
                                                35 Matches
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                TypeScript
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-laserBlue border-laserBlue/30"
                                            >
                                                28 Matches
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">
                                                UI/UX Design
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-laserBlue border-laserBlue/30"
                                            >
                                                22 Matches
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
                                        Today&apos;s Schedule
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>
                                                        TS
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Technical Screening
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Senior Frontend
                                                        Developer
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className="bg-laserBlue/10 text-laserBlue">
                                                2:00 PM
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>
                                                        HR
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Team Interview
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Product Designer
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className="bg-gray-100 text-gray-700">
                                                4:30 PM
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 shadow-sm text-gray-900">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-gray-800">
                                        <LineChart className="mr-2 text-laserBlue" />
                                        Hiring Trends
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">
                                                    Qualified Candidates
                                                </p>
                                                <p className="text-2xl font-bold text-laserBlue">
                                                    +28.5%
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
                                                Last Month: 85 qualified
                                            </span>
                                            <span>
                                                This Month: 109 qualified
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
                                Coming soon with AI-powered hiring insights and
                                predictions
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="reports" className="space-y-6">
                        <div className="text-gray-900 text-center py-20 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-bold mb-4">
                                Recruitment Reports
                            </h3>
                            <p className="text-gray-500">
                                Generate detailed hiring and recruitment
                                analytics
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
