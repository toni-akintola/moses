import React from 'react'
import "./style.css"
import "./normalize.css"
import { Education, Experience, Skill } from '@/utils/types'
export interface ResumeProps {
    age: string
    name: string
    number: string
    email: string
    proficiency: string
    educations: Education[],
    experiences: Experience[],
    skills: Skill[]
}

const Resume = (props: ResumeProps) => {
  return (
    <>
  <meta charSet="utf-8" />
  <section id="main">
    <header id="title">
      <h1>{props.name}</h1>
    </header>
    <section className="main-block">
      <h2>
        Experiences
      </h2>
      {props.experiences.map((experience) => (
        <section key={experience.id} className="blocks">
        <div className="date">
          <span>{experience.startDate}</span>
          <span>{experience.endDate}</span>
        </div>
        <div className="decorator"></div>
        <div className="details">
          <header>
            <h3>{experience.job}</h3>
            <span className="place">{experience.employer}</span>
            <span className="location">{experience.city}</span>
          </header>
          <div>
            <ul>
              <li>
                {experience.duties}
              </li>
            </ul>
          </div>
        </div>
      </section>
      ))}
      <h2>
        Education
      </h2>
      {props.educations.map((education) => (
           <section key={education.id} className="blocks">
        <div className="date">
          <span>{education.startDate}</span>
          <span>{education.endDate}</span>
        </div>
        <div className="decorator"></div>
        <div className="details">
          <header>
            <h3>{education.degree}</h3>
            <span className="place">{education.school}</span>
            <span className="location">{education.nation}</span>
          </header>
        </div>
      </section>
      ))} 
    </section>
  </section>
  <aside id="sidebar">
    <div className="side-block" id="contact">
      <h1>Contact Info</h1>
      <ul>
        <li>
          <i className="fa fa-globe" /> johndoe.gtld
        </li>
        <li>
          <i className="fa fa-linkedin" /> linkedin.com/in/john
        </li>
        <li>
          <i className="fa fa-envelope" /> {props.email}
        </li>
        <li>
          <i className="fa fa-phone" /> {props.number}
        </li>
      </ul>
    </div>
    <div className="side-block" id="skills">
      <h1>Skills</h1>
      <ul>
        <li>English Proficiency: {props.proficiency}</li>
        {props.skills.map((skill) => (
            <li key={skill.id}>{skill.text}</li>
        ))}
      </ul>
    </div>
  </aside>
</>

  )
}

export default Resume