"use client"
import React, { useRef } from "react"
import { useAtom } from "jotai"
import {
    ageAtom,
    authorizationStatusAtom,
    certificatesAtom,
    educationsAtom,
    emailAtom,
    experiencesAtom,
    nameAtom,
    numberAtom,
    proficiencyAtom,
    skillsAtom,
} from "@/utils/atoms"
import MyResume from "@/components/resume-preview/Resume"

const Preview = () => {
    const [age, setAge] = useAtom(ageAtom)
    const [name, setName] = useAtom(nameAtom)
    const [number, setNumber] = useAtom(numberAtom)
    const [email, setEmail] = useAtom(emailAtom)
    const [proficiency, setProficiency] = useAtom(proficiencyAtom)
    const [educations, setEducations] = useAtom(educationsAtom)
    const [experiences, setExperiences] = useAtom(experiencesAtom)
    const [skills, setSkills] = useAtom(skillsAtom)
    const [certficates, setCertificates] = useAtom(certificatesAtom)
    const [authorizationStatus, setAuthorization] = useAtom(
        authorizationStatusAtom
    )
    return (
        <div>
            <MyResume
                name={name}
                email={email}
                number={number}
                proficiency={proficiency}
                experiences={experiences}
                educations={educations}
                skills={skills}
                certificates={certficates}
                authorizationStatus={authorizationStatus}
                age={age}
            />
        </div>
    )
}

export default Preview
