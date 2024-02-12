"use client"
import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Education, Experience, Skill } from "@/utils/types"
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
    <PDFViewer width="100%" height="800">
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
                                <View
                                    key={experience.id}
                                    style={styles.section}
                                >
                                    <View style={styles.text}>
                                        <Text>
                                            {experience.startDate} -{" "}
                                            {experience.endDate}
                                        </Text>
                                    </View>
                                    <View style={styles.text}>
                                        <Text>{experience.job}</Text>
                                        <Text>
                                            {experience.employer},{" "}
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
                                            {education.startDate} -{" "}
                                            {education.endDate}
                                        </Text>
                                    </View>
                                    <View style={styles.text}>
                                        <Text>{education.degree}</Text>
                                        <Text>
                                            {education.school},{" "}
                                            {education.nation}
                                        </Text>
                                    </View>
                                </View>
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
                            <Text style={styles.text}>
                                English Proficiency:
                            </Text>
                            <Text style={styles.text}>
                                {capitalizeFirstLetter(props.proficiency)}
                            </Text>
                            {props.skills.map((skill) => (
                                <Text key={skill.id} style={styles.text}>
                                    {skill.text}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    </PDFViewer>
)

export default MyResume
