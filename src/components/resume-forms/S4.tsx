"use client"
import MyResume from "@/components/resume-preview/Resume"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
    translateAtom,
} from "@/utils/atoms"
import { zodResolver } from "@hookform/resolvers/zod"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { useAtom, useSetAtom } from "jotai"
import { ArrowLeft, MinusCircle, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const certificateSchema = z.object({
    title: z.string({
        required_error: "Se requiere un titulo",
    }),
    description: z.string({
        required_error: "Se requiere una descripción",
    }),
})

const skillsSchema = z.object({
    title: z.string({
        required_error: "Se requiere un titulo",
    }),
})

const additionalInfoSchema = z.object({
    authorizationStatus: z.string({
        required_error: "Se requiere una authorizacion",
    }),
    skills: z.array(skillsSchema),
    certificates: z.array(certificateSchema),
})

export default function S4() {
    const [authorizationStatus, setAuthorizationStatus] = useAtom(
        authorizationStatusAtom
    )
    const [skills, setSkills] = useAtom(skillsAtom)
    const [certificates, setCertificates] = useAtom(certificatesAtom)
    const [experiences, setExperiences] = useAtom(experiencesAtom)
    const [age, setAge] = useAtom(ageAtom)
    const [name, setName] = useAtom(nameAtom)
    const [number, setNumber] = useAtom(numberAtom)
    const [email, setEmail] = useAtom(emailAtom)
    const [proficiency, setProficiency] = useAtom(proficiencyAtom)
    const [educations, setEducations] = useAtom(educationsAtom)
    const [download, setDownload] = useState(false)
    const translate = useSetAtom(translateAtom)
    // 1. Define your form.
    const form = useForm<z.infer<typeof additionalInfoSchema>>({
        resolver: zodResolver(additionalInfoSchema),
        defaultValues: {
            authorizationStatus: "",
            skills: [{ title: "" }],
            certificates: [
                {
                    title: "",
                    description: "",
                },
            ],
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof additionalInfoSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        setAuthorizationStatus(values.authorizationStatus)
        setSkills(values.skills)
        setCertificates(values.certificates)

        // try {
        //     await translate()
        //     setDownload(true)
        //     const response = await fetch("/api/submit-resume", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             age: age,
        //             name: name,
        //             number: number,
        //             email: email,
        //             proficiency: proficiency,
        //             educations: educations,
        //             experiences: experiences,
        //             skills: skills,
        //             certificates: certificates,
        //             authorizationStatus: authorizationStatus,
        //         }),
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const {
        fields: certificateFields,
        append: certificateAppend,
        remove: certificateRemove,
    } = useFieldArray({
        control: form.control,
        name: "certificates",
    })

    const {
        fields: skillFields,
        append: skillAppend,
        remove: skillRemove,
    } = useFieldArray({
        control: form.control,
        name: "skills",
    })

    return (
        <div className="border py-4 px-8 border-gray-900/10 bg-white flex items-center flex-col justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-md p-4 border bg-indigo-500 flex flex-col"
                >
                    <Link
                        href="/s3"
                        className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 text-indigo-500" />
                        Inicio
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-48 bg-indigo-500 flex flex-col space-y-8 items-center">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Estado de Autorización
                        </h2>
                        <FormField
                            control={form.control}
                            name="authorizationStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        Estado de Autorización
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Autorizado"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        Entra su estado de autorización.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Certificados
                        </h2>
                        {certificateFields.map((certificateField, index) => (
                            <div
                                key={certificateField.id}
                                className="gap-y-4 flex flex-col items-center"
                            >
                                <h2 className="text-base font-semibold leading-7 text-white self-center">
                                    Certificado {index + 1}
                                </h2>
                                <FormField
                                    control={form.control}
                                    name={`certificates.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Titulo
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Plomería"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el nombre del su
                                                certificado.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`certificates.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Descripción
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Clase de 6 meses..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra una descripción del su
                                                certificado.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {certificateFields.length >= 2 && (
                                    <button
                                        type="button"
                                        className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                                        onClick={() => {
                                            certificateRemove(index)
                                        }}
                                    >
                                        <MinusCircle className="h-4 w-4" />
                                        Eliminar certificado
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                            onClick={() => {
                                certificateAppend({
                                    title: "",
                                    description: "",
                                })
                            }}
                        >
                            <PlusCircle className="h-4 w-4" />
                            Agregar certificado
                        </button>
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Habilidades
                        </h2>
                        {skillFields.map((skillField, index) => (
                            <div
                                key={skillField.id}
                                className="gap-y-4 flex flex-col items-center"
                            >
                                <h2 className="text-base font-semibold leading-7 text-white self-center">
                                    Habilidad {index + 1}
                                </h2>
                                <FormField
                                    control={form.control}
                                    name={`skills.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Titulo
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Comunicación"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el nombre del su
                                                certificado.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {skillFields.length >= 2 && (
                                    <button
                                        type="button"
                                        className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                                        onClick={() => {
                                            skillRemove(index)
                                        }}
                                    >
                                        <MinusCircle className="h-4 w-4" />
                                        Eliminar habilidad
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                            onClick={() => {
                                skillAppend({
                                    title: "",
                                })
                            }}
                        >
                            <PlusCircle className="h-4 w-4" />
                            Agregar habilidad
                        </button>
                        <Button
                            type="submit"
                            className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
                        >
                            Crear Currículum
                        </Button>
                        {download && (
                            <PDFDownloadLink
                                document={
                                    <MyResume
                                        name={name}
                                        email={email}
                                        number={number}
                                        proficiency={proficiency}
                                        experiences={experiences}
                                        educations={educations}
                                        skills={skills}
                                        age={age}
                                        certificates={certificates}
                                        authorizationStatus={
                                            authorizationStatus
                                        }
                                    />
                                }
                                fileName={`${name}-resume.pdf`}
                            >
                                <div className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200">
                                    Descargar
                                </div>
                            </PDFDownloadLink>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}
