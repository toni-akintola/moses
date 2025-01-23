import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { ResumeDetails } from "@/components/core/resume-details"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { LastUpdated } from "@/components/ui/last-updated"

interface Props {
    params: Promise<{
        slug: string
    }>
}

export default async function CandidatePage(props: Props) {
    const params = await props.params
    const supabase = await createClerkSupabaseClientSsr()
    const { userId } = await auth()

    const { data: candidate, error } = await supabase
        .from("candidates")
        .select()
        .eq("id", params.slug)
        .eq("profile_id", userId)
        .single()

    if (error) {
        console.log(error)
        return <div>Error loading candidate</div>
    }

    if (!candidate) {
        return <div>Candidate not found</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/core/candidates">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">
                        {candidate.first_name} {candidate.last_name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {candidate.email}
                        </div>
                        {candidate.resume_submission?.phoneNumber && (
                            <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {candidate.resume_submission.phoneNumber}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Status</CardTitle>
                        <CardDescription>
                            Current application status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium">
                                    Current Status
                                </div>
                                <Badge variant="outline" className="mt-1">
                                    Searching
                                </Badge>
                            </div>
                            <div>
                                <div className="text-sm font-medium">
                                    Last Updated
                                </div>
                                <LastUpdated date={Date.now().toString()} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common tasks and actions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline">Update Status</Button>
                            <Button variant="outline">Send Message</Button>
                            <Button variant="outline">
                                Schedule Interview
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="resume" className="w-full">
                <TabsList>
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                    <TabsTrigger value="jobs">Matched Jobs</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                <TabsContent value="resume" className="mt-6">
                    {candidate.resume_submission && (
                        <ResumeDetails
                            resumeSubmission={candidate.resume_submission}
                        />
                    )}
                </TabsContent>
                <TabsContent value="jobs">
                    <Card>
                        <CardHeader>
                            <CardTitle>Matched Jobs</CardTitle>
                            <CardDescription>
                                Jobs that match this candidate&apos;s profile
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                No matched jobs yet.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="timeline">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Timeline</CardTitle>
                            <CardDescription>
                                Recent activity and updates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                No recent activity.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
