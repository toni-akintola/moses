import { ResumeSubmission } from "../../../types/types"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    CalendarIcon,
    GraduationCapIcon,
    BriefcaseIcon,
    AwardIcon,
    Lightbulb,
} from "lucide-react"

interface ResumeDetailsProps {
    resumeSubmission: ResumeSubmission
}

export function ResumeDetails({ resumeSubmission }: ResumeDetailsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Resume Details</CardTitle>
                <CardDescription className="flex items-center gap-2">
                    English Proficiency Level:
                    <Badge variant="secondary">
                        {resumeSubmission.proficiency}
                    </Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="education">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <GraduationCapIcon className="h-4 w-4" />
                                Education
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                {resumeSubmission.educations?.map(
                                    (edu, index) => (
                                        <div
                                            key={index}
                                            className="border-l-2 pl-4 py-2"
                                        >
                                            <h4 className="font-medium">
                                                {edu.school}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {edu.degree}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <CalendarIcon className="h-3 w-3" />
                                                {edu.endDate}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {edu.city}, {edu.country}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="experience">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <BriefcaseIcon className="h-4 w-4" />
                                Experience
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                {resumeSubmission.experiences?.map(
                                    (exp, index) => (
                                        <div
                                            key={index}
                                            className="border-l-2 pl-4 py-2"
                                        >
                                            <h4 className="font-medium">
                                                {exp.jobTitle}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {exp.employer}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <CalendarIcon className="h-3 w-3" />
                                                {exp.startDate} -{" "}
                                                {exp.endDate || "Present"}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {exp.city}, {exp.country}
                                            </p>
                                            <p className="text-sm mt-2">
                                                {exp.duties}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="skills">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" />
                                Skills
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-wrap gap-2">
                                {resumeSubmission.skills?.map(
                                    (skill, index) => (
                                        <Badge key={index} variant="secondary">
                                            {skill.title}
                                        </Badge>
                                    )
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="certificates">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <AwardIcon className="h-4 w-4" />
                                Certificates
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {resumeSubmission.certificates?.map(
                                    (cert, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <Badge variant="outline">
                                                {cert.title}
                                            </Badge>
                                        </div>
                                    )
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
