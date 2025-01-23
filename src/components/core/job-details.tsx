import { Job } from "../../../types/types"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Briefcase,
    Building2,
    CalendarDays,
    ExternalLink,
    MapPin,
    DollarSign,
    Clock,
} from "lucide-react"
import Link from "next/link"

interface JobDetailsProps {
    job: Job
    showApplyButton?: boolean
}

export function JobDetails({ job, showApplyButton = true }: JobDetailsProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        <CardDescription className="mt-2">
                            <div className="flex items-center gap-2 text-base">
                                <Building2 className="h-4 w-4" />
                                {job.company}
                            </div>
                        </CardDescription>
                    </div>
                    {/* {job.image && (
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                            <img
                                src={job.image}
                                alt={`${job.company} logo`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )} */}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                        </div>
                        {job.salaryRange && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <DollarSign className="h-4 w-4" />
                                {job.salaryRange}
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                            {job.employmentType || "Not specified"}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            Posted:{" "}
                            {/* {new Date(job.datePosted).toLocaleDateString()} */}
                            {job.datePosted}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <Badge
                                variant={
                                    job.is_active ? "default" : "secondary"
                                }
                            >
                                {job.is_active ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Job Providers */}
                {job.jobProviders && job.jobProviders.length > 0 && (
                    <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium mb-2">
                            Also posted on:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {job.jobProviders.map((provider, index) => (
                                <Link key={index} href={provider.url}>
                                    <Badge variant="outline">
                                        {provider.jobProvider}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description */}
                <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-2">
                        Job Description
                    </h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                        {job.description.split("\n").map((paragraph, index) => (
                            <p key={index} className="mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Apply Button */}
                {showApplyButton && (
                    <div className="pt-4 border-t flex justify-end gap-4">
                        <Button asChild variant="outline">
                            <Link href={job.url || "#"} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Original
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={`#`}>Apply Now</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
