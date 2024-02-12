"use client"
import React, { useRef } from "react"
import { useAtom } from "jotai"
import {
    ageAtom,
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
    const [skills, setSkils] = useAtom(skillsAtom)

    return (
        <MyResume
            name={name}
            email={email}
            number={number}
            proficiency={proficiency}
            experiences={experiences}
            educations={educations}
            skills={skills}
            age={age}
        />
    )
}

export default Preview
