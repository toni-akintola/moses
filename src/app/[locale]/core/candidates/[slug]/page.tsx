import React from "react"
import { createClient } from "@/utils/supabase/server"
import { RadialChart } from "@/components/ui/radial"
type Props = {}

const Candidate = async ({ params }: { params: { slug: string } }) => {
    const { slug: candidateID } = params
    console.log(candidateID)
    const supabase = createClient()
    const { data: candidateData, error: candidateError } = await supabase
        .from("candidates")
        .select("*")
        .eq("candidate_id", candidateID)
    const candidate = candidateData ? candidateData[0] : {}
    const resumeSubmission = candidate.resume_submission
    console.log(resumeSubmission.experiences)
    const { data: matchData, error: matchError } = await supabase
        .from("matches")
        .select("*")
        .eq("candidate_id", candidateID)
    console.log(matchData)
    return (
        <div className="flex flex-col p-4 px-8">
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
            <div className="flex flex-col space-y-5">
                {matchData?.map((match) => (
                    <RadialChart
                        key={match.id}
                        chartData={[
                            {
                                browser: "safari",
                                rating: match.rating,
                                fill: "#06b6d4",
                            },
                        ]}
                    />
                    // <p key={match.id}>{match.rating}</p>
                ))}
            </div>
        </div>
    )
}

export default Candidate
