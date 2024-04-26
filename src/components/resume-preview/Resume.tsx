import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import {
    Certificate,
    Education,
    Experience,
    ResumeSubmission,
    Skill,
} from "@/utils/types"
import { capitalizeFirstLetter } from "@/utils/helpers"
export interface ResumeProps {
    resume: ResumeSubmission
}

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
const MyResume = ({ resume }: ResumeProps) => (
    <Document>
        <Page size="A4">
            <View style={styles.page}>
                <View style={styles.main}>
                    <View style={styles.title}>
                        <Text style={styles.heading}>{resume.name}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Experiences</Text>
                        {resume.experiences
                            ? resume.experiences.map((experience) => (
                                  <View
                                      key={experience.id}
                                      style={styles.section}
                                  >
                                      <View style={styles.text}>
                                          <Text>
                                              {experience.startYear} -{" "}
                                              {experience.endYear}
                                          </Text>
                                      </View>
                                      <View style={styles.text}>
                                          <Text>
                                              {experience.job},{" "}
                                              {experience.employer},{" "}
                                          </Text>
                                          <Text>
                                              {experience.city},{" "}
                                              {experience.country}{" "}
                                          </Text>
                                      </View>
                                      <View style={styles.text}>
                                          <Text>{experience.duties}</Text>
                                      </View>
                                  </View>
                              ))
                            : null}
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Education</Text>
                        {resume.educations
                            ? resume.educations.map((education) => (
                                  <View
                                      key={education.id}
                                      style={styles.section}
                                  >
                                      <View style={styles.text}>
                                          <Text>
                                              {education.startYear} -{" "}
                                              {education.endYear} |{" "}
                                              {education.completed
                                                  ? "Completed"
                                                  : "Not Completed"}
                                          </Text>
                                      </View>
                                      <View style={styles.text}>
                                          <Text>
                                              {education.degree},{" "}
                                              {education.school},{" "}
                                          </Text>
                                          <Text>
                                              {education.city},{" "}
                                              {education.country}
                                              {""}
                                          </Text>
                                      </View>
                                  </View>
                              ))
                            : null}
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Authorization Status</Text>
                        <Text style={styles.text}>
                            {resume.authorizationStatus
                                ? "Authorized to work"
                                : "Not yet authorized to work"}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Certificates</Text>
                        {resume.certificates
                            ? resume.certificates.map((certificate) => (
                                  <Text
                                      key={certificate.id}
                                      style={styles.text}
                                  >
                                      {certificate.title}
                                  </Text>
                              ))
                            : null}
                    </View>
                </View>
                <View style={styles.sidebar}>
                    <View style={styles.sideBlock}>
                        <Text style={styles.heading}>Contact Info</Text>
                        <Text style={styles.text}>
                            <i className="fa fa-envelope" /> {resume.email}
                        </Text>
                        <Text style={styles.text}>
                            <i className="fa fa-phone" /> {resume.number}
                        </Text>
                    </View>
                    <View style={styles.sideBlock}>
                        <Text style={styles.heading}>Skills</Text>
                        <Text style={styles.text}>English Proficiency:</Text>
                        <Text style={styles.text}>
                            {capitalizeFirstLetter(resume.proficiency)}
                        </Text>
                        {resume.skills
                            ? resume.skills.map((skill) => (
                                  <Text key={skill.id} style={styles.text}>
                                      {skill.title}
                                  </Text>
                              ))
                            : null}
                    </View>
                </View>
            </View>
        </Page>
    </Document>
)

export default MyResume
