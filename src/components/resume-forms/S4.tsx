"use client"
import MyResume from "@/components/resume-preview/Resume"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const certificateSchema = z.object({
    title: z.string({
        required_error: "Inválido.",
    }),
    description: z.string({
        required_error: "Inválido.",
    }),
})

const skillsSchema = z.object({
    title: z.string({
        required_error: "Inválido.",
    }),
})

const additionalInfoSchema = z.object({
    authorizationStatus: z.boolean({
        required_error: "Inválido.",
    }),
    skills: z.array(skillsSchema),
    certificates: z.array(certificateSchema),
})

export default function S4() {
    const [skills, setSkills] = useAtom(skillsAtom)
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof additionalInfoSchema>>({
        resolver: zodResolver(additionalInfoSchema),
        defaultValues: {
            authorizationStatus: false,
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

        setSkills(values.skills)
        router.push("/s5")

        // try {
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
        fields: skillFields,
        append: skillAppend,
        remove: skillRemove,
    } = useFieldArray({
        control: form.control,
        name: "skills",
    })

    return (
        <div className="border py-4 px-8 justify-center border-gray-900/10 bg-white flex items-center flex-col">
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
                        Atrás
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-20 bg-indigo-500 flex flex-col space-y-8 items-center">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Habilidades
                        </h2>
                        {skillFields.map((skillField, index) => (
                            <div
                                key={skillField.id}
                                className="gap-y-4 flex flex-col"
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
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-56">
                                                        <SelectValue placeholder="Habilidades" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel></SelectLabel>
                                                            <SelectItem value="Driving">
                                                                Conducción
                                                            </SelectItem>
                                                            <SelectItem value="Vehicle Maintenance">
                                                                Mantenimiento de
                                                                Vehículos
                                                            </SelectItem>
                                                            <SelectItem value="Construction">
                                                                Construcción
                                                            </SelectItem>
                                                            <SelectItem value="Plumbing">
                                                                Fontanería
                                                            </SelectItem>
                                                            <SelectItem value="Welding">
                                                                Soldadura
                                                            </SelectItem>
                                                            <SelectItem value="Equipment Operation">
                                                                Operación de
                                                                Equipos
                                                            </SelectItem>
                                                            <SelectItem value="Heavy Machinery Operation">
                                                                Operación de
                                                                Maquinaria
                                                                Pesada
                                                            </SelectItem>
                                                            <SelectItem value="Landscaping">
                                                                Jardinería
                                                            </SelectItem>
                                                            <SelectItem value="Recycling">
                                                                Reciclaje
                                                            </SelectItem>
                                                            <SelectItem value="Fishing">
                                                                Pesca
                                                            </SelectItem>
                                                            <SelectItem value="Agricultural Work">
                                                                Trabajo Agrícola
                                                            </SelectItem>
                                                            <SelectItem value="Mining">
                                                                Minería
                                                            </SelectItem>
                                                            <SelectItem value="Manufacturing">
                                                                Manufactura
                                                            </SelectItem>
                                                            <SelectItem value="Mechanical Skills">
                                                                Habilidades
                                                                Mecánicas
                                                            </SelectItem>
                                                            <SelectItem value="Problem-solving Skills">
                                                                Habilidades para
                                                                Resolver
                                                                Problemas
                                                            </SelectItem>
                                                            <SelectItem value="Technical Skills">
                                                                Habilidades
                                                                Técnicas
                                                            </SelectItem>
                                                            <SelectItem value="Physical Strength and Endurance">
                                                                Fuerza y
                                                                Resistencia
                                                                Física
                                                            </SelectItem>
                                                            <SelectItem value="Safety Protocols Adherence">
                                                                Adherencia a
                                                                Protocolos de
                                                                Seguridad
                                                            </SelectItem>
                                                            <SelectItem value="Teamwork and Collaboration">
                                                                Trabajo en
                                                                Equipo y
                                                                Colaboración
                                                            </SelectItem>
                                                            <SelectItem value="Attention to Detail">
                                                                Atención al
                                                                Detalle
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el nombre del su
                                                habilidad.
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
                            Próximo
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
