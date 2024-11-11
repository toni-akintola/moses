import { vectorize } from "@/functions/embedding"
import { ResumeSubmission } from "../../../../types/types"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const sampleResumeSubmission: ResumeSubmission = {
        age: "29",
        firstName: "Alex",
        lastName: "Smith",
        phoneNumber: "+1-555-1234-567",
        email: "alex.smith@example.com",
        proficiency: "Advanced",
        educations: [
            {
                id: 1,
                school: "University of California, Berkeley",
                degree: "Bachelor of Science in Computer Science",
                endDate: "2020-05-15",
                country: "USA",
                city: "Berkeley",
                completed: true,
            },
            {
                id: 2,
                school: "Stanford University",
                degree: "Master of Science in Artificial Intelligence",
                endDate: "2022-06-10",
                country: "USA",
                city: "Stanford",
                completed: true,
            },
        ],
        experiences: [
            {
                id: 1,
                employer: "Tech Solutions Inc.",
                jobTitle: "Software Engineer",
                city: "San Francisco",
                country: "USA",
                startDate: "2020-08-01",
                endDate: "2022-04-30",
                duties: "Developed web applications, optimized backend performance, and collaborated with cross-functional teams to enhance user experience.",
            },
            {
                id: 2,
                employer: "Innovate AI Labs",
                jobTitle: "Machine Learning Engineer",
                city: "Palo Alto",
                country: "USA",
                startDate: "2022-05-01",
                endDate: "Present",
                duties: "Designed and implemented machine learning models for predictive analytics, conducted data analysis, and contributed to product development in AI-powered tools.",
            },
        ],
        skills: [
            {
                id: 1,
                title: "Python",
            },
            {
                id: 2,
                title: "Machine Learning",
            },
            {
                id: 3,
                title: "Data Analysis",
            },
        ],
        certificates: [
            {
                id: 1,
                title: "Certified Data Scientist",
            },
            {
                id: 2,
                title: "AWS Certified Solutions Architect",
            },
        ],
        authorizationStatus: "Authorized to work in the USA",
    }

    const result = await vectorize(JSON.stringify(sampleResumeSubmission))
    return NextResponse.json(result)
}
