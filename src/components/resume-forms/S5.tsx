"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
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
import Link from "next/link"
import { ArrowLeft, MinusCircle, PlusCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
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
import { useAtom, useSetAtom } from "jotai"
import { useRouter } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import MyResume from "@/components/resume-preview/Resume"

const certificateSchema = z.object({
    title: z.string({
        required_error: "Inválido.",
    }),
})

const stepFiveSchema = z.object({
    authorizationStatus: z.boolean({
        required_error: "Inválido.",
    }),
    certificates: z.array(certificateSchema),
})
export default function S5() {
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
    const form = useForm<z.infer<typeof stepFiveSchema>>({
        resolver: zodResolver(stepFiveSchema),
        defaultValues: {
            authorizationStatus: false,
            certificates: [
                {
                    title: "",
                },
            ],
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof stepFiveSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        setCertificates(values.certificates)
        setAuthorizationStatus(values.authorizationStatus)

        try {
            await translate().then(() => {
                fetch("/api/submit-resume", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        age: age,
                        name: name,
                        number: number,
                        email: email,
                        proficiency: proficiency,
                        educations: educations,
                        experiences: experiences,
                        skills: skills,
                        certificates: certificates,
                        authorizationStatus: authorizationStatus,
                    }),
                })
            })
            setDownload(true)
        } catch (error) {
            console.log(error)
        }

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
        fields: certificateFields,
        append: certificateAppend,
        remove: certificateRemove,
    } = useFieldArray({
        control: form.control,
        name: "certificates",
    })

    return (
        <div className="border-t py-4 px-8 border-gray-900/10 bg-white flex items-center flex-col justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-md p-4 border bg-indigo-500 flex flex-col"
                >
                    <Link
                        href="/resume-builder/s4"
                        className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 text-indigo-500" />
                        Atrás
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-20 bg-indigo-500 flex flex-col space-y-8 items-center">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Certificados
                        </h2>
                        {certificateFields.map((certificateField, index) => (
                            <div
                                key={certificateField.id}
                                className="gap-y-4 flex flex-col"
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
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-56">
                                                        <SelectValue placeholder="Certificados" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel></SelectLabel>
                                                            <SelectItem value="CDL (Commercial Driver's License)">
                                                                Licencia de
                                                                Conductor
                                                                Comercial (CDL)
                                                            </SelectItem>
                                                            <SelectItem value="ASE Certification (Automotive Service Excellence)">
                                                                Certificación
                                                                ASE (Excelencia
                                                                en Servicio
                                                                Automotriz)
                                                            </SelectItem>
                                                            <SelectItem value="OSHA Certification (Occupational Safety and Health Administration)">
                                                                Certificación
                                                                OSHA
                                                                (Administración
                                                                de Seguridad y
                                                                Salud
                                                                Ocupacional)
                                                            </SelectItem>
                                                            <SelectItem value="Welding Certification">
                                                                Certificación de
                                                                Soldadura
                                                            </SelectItem>
                                                            <SelectItem value="Forklift Operator Certification">
                                                                Certificación de
                                                                Operador de
                                                                Montacargas
                                                            </SelectItem>
                                                            <SelectItem value="Heavy Equipment Operator Certification">
                                                                Certificación de
                                                                Operador de
                                                                Equipos Pesados
                                                            </SelectItem>
                                                            <SelectItem value="CPR Certification (Cardiopulmonary Resuscitation)">
                                                                Certificación de
                                                                RCP (Reanimación
                                                                Cardiopulmonar)
                                                            </SelectItem>
                                                            <SelectItem value="First Aid Certification">
                                                                Certificación de
                                                                Primeros
                                                                Auxilios
                                                            </SelectItem>
                                                            <SelectItem value="Confined Space Entry Certification">
                                                                Certificación de
                                                                Entrada a
                                                                Espacios
                                                                Confinados
                                                            </SelectItem>
                                                            <SelectItem value="Scaffold Safety Certification">
                                                                Certificación de
                                                                Seguridad en
                                                                Andamios
                                                            </SelectItem>
                                                            <SelectItem value="Hazardous Materials Handling Certification">
                                                                Certificación de
                                                                Manejo de
                                                                Materiales
                                                                Peligrosos
                                                            </SelectItem>
                                                            <SelectItem value="Fishing Vessel Safety Certification">
                                                                Certificación de
                                                                Seguridad en
                                                                Embarcaciones de
                                                                Pesca
                                                            </SelectItem>
                                                            <SelectItem value="Agricultural Pesticide Applicator Certification">
                                                                Certificación de
                                                                Aplicador de
                                                                Pesticidas
                                                                Agrícolas
                                                            </SelectItem>
                                                            <SelectItem value="Mining Safety Certification">
                                                                Certificación de
                                                                Seguridad en
                                                                Minería
                                                            </SelectItem>
                                                            <SelectItem value="Construction Safety Certification">
                                                                Certificación de
                                                                Seguridad en
                                                                Construcción
                                                            </SelectItem>
                                                            <SelectItem value="Electrical Safety Certification">
                                                                Certificación de
                                                                Seguridad
                                                                Eléctrica
                                                            </SelectItem>
                                                            <SelectItem value="Fire Safety Certification">
                                                                Certificación de
                                                                Seguridad contra
                                                                Incendios
                                                            </SelectItem>
                                                            <SelectItem value="Machine Guarding Certification">
                                                                Certificación de
                                                                Protección de
                                                                Maquinaria
                                                            </SelectItem>
                                                            <SelectItem value="Fall Protection Certification">
                                                                Certificación de
                                                                Protección
                                                                contra Caídas
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el nombre del su
                                                certificado.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                    control={form.control}
                                    name={`certificates.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Descripción (opcional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Clase de 6 meses..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra una descripción del
                                                certificado.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

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
                                })
                            }}
                        >
                            <PlusCircle className="h-4 w-4" />
                            Agregar certificado
                        </button>
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Estado de Autorización
                        </h2>
                        <FormField
                            control={form.control}
                            name="authorizationStatus"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="data-[state=checked]:bg-white data-[state=checked]:text-indigo-500 border-white"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-white">
                                            ¿Tiene autorización legal de
                                            trabajar en los Estados Unidos?
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
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
