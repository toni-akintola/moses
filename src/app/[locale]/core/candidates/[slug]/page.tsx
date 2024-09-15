import React from "react"
import { createClient } from "@/utils/supabase/server"
import { RadialChart } from "@/components/ui/radial"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Job, ResumeSubmission } from "@/utils/types"
type Props = {}

const Candidate = async ({ params }: { params: { slug: string } }) => {
    const { slug: candidateID } = params
    const supabase = createClient()
    const { data: candidateData, error: candidateError } = await supabase
        .from("candidates")
        .select("*")
        .eq("candidate_id", candidateID)
    const candidate = candidateData ? candidateData[0] : {}
    const resumeSubmission: ResumeSubmission = candidate.resume_submission
    console.log(resumeSubmission)
    console.log(resumeSubmission.experiences)
    const { data: matchData, error: matchError } = await supabase
        .from("matches")
        .select("*")
        .eq("candidate_id", candidateID)
    const matches = await Promise.all(
        matchData.map(async (match) => {
            const { data: jobData, error: jobError } = await supabase
                .from("jobs")
                .select("*")
                .eq("id", match.job_id)
            const jobs = jobData as Job[]
            const result = {
                id: match.id,
                rating: match.rating,
                job: jobs[0],
            }
            return result
        })
    )
    return (
        <div className="flex flex-col">
            {candidate && (
                <div className=" flex justify-between">
                    <div>
                        <h2 className="font-semibold text-lg">General Info</h2>
                        <p>{candidate.first_name || ""}</p>
                        <p>{candidate.last_name || ""}</p>
                        <p>{candidate.email || ""}</p>
                        <p>{resumeSubmission.age}</p>
                        <p>{resumeSubmission.number}</p>
                        <p>
                            Work authorized:{" "}
                            {resumeSubmission.authorizationStatus
                                ? "Yes"
                                : "No"}
                        </p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">Education</h2>
                        {resumeSubmission.educations.map((education, index) => (
                            <div key={index}>
                                <p>{education.school || ""}</p>
                                <p>
                                    {education.city || ""},{" "}
                                    {education.country || ""}
                                </p>
                                <p>{education.degree || ""}</p>
                                <p>{education.endDate || ""}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">Experience</h2>
                        {resumeSubmission.experiences.map(
                            (experience, index) => (
                                <div key={index}>
                                    <p>
                                        {experience.city || ""},{" "}
                                        {experience.country || ""}
                                    </p>
                                    <p>{experience.jobTitle || ""}</p>
                                    <p>{experience.employer || ""}</p>
                                    <p>{experience.startDate || ""}</p>
                                    <p>{experience.endDate || ""}</p>
                                    <p>{experience.duties || ""}</p>
                                </div>
                            )
                        )}
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">
                            Skills & Certifications
                        </h2>
                        {resumeSubmission.skills.map((skill) => (
                            <p key={skill.title}>{skill.title}</p>
                        ))}
                        {resumeSubmission.certificates.map((certificate) => (
                            <p key={certificate.title}>{certificate.title}</p>
                        ))}
                        <p>
                            English proficiency: {resumeSubmission.proficiency}
                        </p>
                    </div>
                </div>
            )}
            <div className="flex flex-col space-y-5 justify-center items-center pt-5">
                {matches?.map((match) => (
                    <Card key={match.id} className="flex flex-col w-2/3">
                        <CardHeader>
                            <CardTitle>{match.job.company}</CardTitle>
                            <CardDescription>{match.job.title}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadialChart
                                chartData={[
                                    {
                                        browser: "safari",
                                        rating: match.rating,
                                        fill: "#06b6d4",
                                    },
                                ]}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Contact Candidate</Button>
                        </CardFooter>
                    </Card>

                    // <p key={match.id}>{match.rating}</p>
                ))}
            </div>
        </div>
    )
}

export default Candidate
