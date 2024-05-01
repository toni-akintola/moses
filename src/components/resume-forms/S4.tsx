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
import { FormItemText } from "@/utils/types"
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

export type S4Props = {
    backButton: string
    title: string
    heading: string
    skills: FormItemText
    placeholders: {
        driving: string
        vehicleMaintenance: string
        construction: string
        plumbing: string
        welding: string
        equipmentOperation: string
        heavyMachineryOperation: string
        landscaping: string
        recycling: string
        fishing: string
        agriculturalWork: string
        mining: string
        manufacturing: string
        mechanicalSkills: string
        problemSolvingSkills: string
        technicalSkills: string
        physicalStrengthAndEndurance: string
        safetyProtocolsAdherence: string
        teamworkAndCollaboration: string
        attentionToDetail: string
    }
    add: string
    remove: string
    nextButton: string
}
const additionalInfoSchema = z.object({
    authorizationStatus: z.boolean({
        required_error: "Inválido.",
    }),
    skills: z.array(skillsSchema),
    certificates: z.array(certificateSchema),
})

export default function S4(props: S4Props) {
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
        router.push("s5")
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
        <div className="py-4 px-8 border-t justify-center border-gray-900/10 bg-white flex items-center flex-col">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-md p-4 border bg-indigo-500 flex flex-col"
                >
                    <Link
                        href="s3"
                        className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 text-indigo-500" />
                        {props.backButton}
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-20 bg-indigo-500 flex flex-col space-y-8 items-center">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            {props.title}
                        </h2>
                        {skillFields.map((skillField, index) => (
                            <div
                                key={skillField.id}
                                className="gap-y-4 flex flex-col"
                            >
                                <h2 className="text-base font-semibold leading-7 text-white self-center">
                                    {props.heading} {index + 1}
                                </h2>
                                <FormField
                                    control={form.control}
                                    name={`skills.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.skills.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-56">
                                                        <SelectValue
                                                            placeholder={
                                                                props.skills
                                                                    .placeholder
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel></SelectLabel>
                                                            <SelectItem value="Driving">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .driving
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Vehicle Maintenance">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .vehicleMaintenance
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Construction">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .construction
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Plumbing">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .plumbing
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Welding">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .welding
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Equipment Operation">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .equipmentOperation
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Heavy Machinery Operation">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .heavyMachineryOperation
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Landscaping">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .landscaping
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Recycling">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .recycling
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Fishing">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .fishing
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Agricultural Work">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .agriculturalWork
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Mining">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .mining
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Manufacturing">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .manufacturing
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Mechanical Skills">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .mechanicalSkills
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Problem-solving Skills">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .problemSolvingSkills
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Technical Skills">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .technicalSkills
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Physical Strength and Endurance">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .physicalStrengthAndEndurance
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Safety Protocols Adherence">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .safetyProtocolsAdherence
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Teamwork and Collaboration">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .teamworkAndCollaboration
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Attention to Detail">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .attentionToDetail
                                                                }
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.skills.subtitle}
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
                                        {props.remove}
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
                            {props.add}
                        </button>
                        <Button
                            type="submit"
                            className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
                        >
                            {props.nextButton}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
