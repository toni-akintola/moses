"use client"
import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Certificate, Education, Experience, Skill } from "@/utils/types"
import { capitalizeFirstLetter } from "@/utils/helpers"
import dynamic from "next/dynamic"

export interface ResumeProps {
    age: string
    name: string
    number: string
    email: string
    proficiency: string
    educations: Education[]
    experiences: Experience[]
    skills: Skill[]
    authorizationStatus: string
    certificates: Certificate[]
}

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
)

// Define styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: "100%",
    },
    main: {
        flex: 3,
        padding: 20,
    },
    title: {
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
        color: "#555",
    },
    sidebar: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
        borderLeft: "1px solid #ccc",
        height: "100%",
    },
    sideBlock: {
        marginBottom: 20,
    },
})

// Define resume component
const MyResume = (props: ResumeProps) => (
    <Document>
        <Page size="A4">
            <View style={styles.page}>
                <View style={styles.main}>
                    <View style={styles.title}>
                        <Text style={styles.heading}>{props.name}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Experiences</Text>
                        {props.experiences.map((experience) => (
                            <View key={experience.id} style={styles.section}>
                                <View style={styles.text}>
                                    <Text>
                                        {experience.startYear} -{" "}
                                        {experience.endYear}
                                    </Text>
                                </View>
                                <View style={styles.text}>
                                    <Text>
                                        {experience.job}, {experience.employer},{" "}
                                        {experience.city}
                                    </Text>
                                </View>
                                <View style={styles.text}>
                                    <Text>{experience.duties}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Education</Text>
                        {props.educations.map((education) => (
                            <View key={education.id} style={styles.section}>
                                <View style={styles.text}>
                                    <Text>
                                        {education.startYear} -{" "}
                                        {education.endYear}
                                    </Text>
                                </View>
                                <View style={styles.text}>
                                    <Text>
                                        {education.degree}, {education.school},{" "}
                                        {education.country}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Authorization Status</Text>
                        <Text style={styles.text}>
                            {props.authorizationStatus}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Certificates</Text>
                        {props.certificates.map((certificate) => (
                            <Text key={certificate.id} style={styles.text}>
                                {certificate.title}: {certificate.description}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.sidebar}>
                    <View style={styles.sideBlock}>
                        <Text style={styles.heading}>Contact Info</Text>
                        <Text style={styles.text}>
                            <i className="fa fa-envelope" /> {props.email}
                        </Text>
                        <Text style={styles.text}>
                            <i className="fa fa-phone" /> {props.number}
                        </Text>
                    </View>
                    <View style={styles.sideBlock}>
                        <Text style={styles.heading}>Skills</Text>
                        <Text style={styles.text}>English Proficiency:</Text>
                        <Text style={styles.text}>
                            {capitalizeFirstLetter(props.proficiency)}
                        </Text>
                        {props.skills.map((skill) => (
                            <Text key={skill.id} style={styles.text}>
                                {skill.title}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </Page>
    </Document>
)

export default MyResume
