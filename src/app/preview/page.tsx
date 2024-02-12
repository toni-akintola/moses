"use client"
import React from "react"

import Resume from "@/components/resume-preview/Resume"
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
type Props = {}

const Preview = (props: Props) => {
    const [age, setAge] = useAtom(ageAtom)
    const [name, setName] = useAtom(nameAtom)
    const [number, setNumber] = useAtom(numberAtom)
    const [email, setEmail] = useAtom(emailAtom)
    const [proficiency, setProficiency] = useAtom(proficiencyAtom)
    const [educations, setEducations] = useAtom(educationsAtom)
    const [experiences, setExperiences] = useAtom(experiencesAtom)
    const [skills, setSkils] = useAtom(skillsAtom)
    return (
        <div>
            <Resume
                age={age}
                name={name}
                number={number}
                email={email}
                proficiency={proficiency}
                educations={educations}
                experiences={experiences}
                skills={skills}
            />
        </div>
    )
}

export default Preview
