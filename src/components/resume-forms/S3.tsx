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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useAtom, useSetAtom } from "jotai"
import {
    ageAtom,
    educationsAtom,
    emailAtom,
    experiencesAtom,
    nameAtom,
    numberAtom,
    proficiencyAtom,
    skillsAtom,
    translateAtom,
} from "@/utils/atoms"
import { useRouter } from "next/navigation"
import { FormItemText } from "@/utils/types"

const experienceSchema = z.object({
    employer: z.string({
        required_error: "Inválido.",
    }),
    job: z.string({
        required_error: "Inválido.",
    }),
    city: z.string({
        required_error: "Inválido.",
    }),
    country: z.string({
        required_error: "Inválido.",
    }),
    startYear: z
        .string({
            required_error: "Inválido.",
        })
        .min(4, {
            message: "Inválido.",
        }),
    endYear: z
        .string({
            required_error: "Inválido.",
        })
        .min(4, {
            message: "Inválido.",
        }),
    duties: z
        .string({
            required_error: "Inválido.",
        })
        .min(3, {
            message: "Inválido.",
        }),
})
export type S3Props = {
    backButton: string
    title: string
    employer: FormItemText
    jobTitle: FormItemText
    city: FormItemText
    country: FormItemText
    startYear: FormItemText
    endYear: FormItemText
    duties: FormItemText
    add: string
    remove: string
    nextButton: string
}
const experiencesSchema = z.object({
    experiences: z.array(experienceSchema),
})

export function S3(props: S3Props) {
    const router = useRouter()
    const [download, setDownload] = useState(false)
    const [experiences, setExperiences] = useAtom(experiencesAtom)
    const [skills, setSkills] = useAtom(skillsAtom)
    const [age, setAge] = useAtom(ageAtom)
    const [name, setName] = useAtom(nameAtom)
    const [number, setNumber] = useAtom(numberAtom)
    const [email, setEmail] = useAtom(emailAtom)
    const [proficiency, setProficiency] = useAtom(proficiencyAtom)
    const [educations, setEducations] = useAtom(educationsAtom)
    // 1. Define your form.
    const form = useForm<z.infer<typeof experiencesSchema>>({
        resolver: zodResolver(experiencesSchema),
        defaultValues: {
            experiences: [
                {
                    employer: "",
                    job: "",
                    city: "",
                    country: "",
                    startYear: "",
                    endYear: "",
                    duties: "...",
                },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "experiences",
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof experiencesSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values.experiences)
        setExperiences(values.experiences)

        router.push("s4")
    }

    return (
        <div className="border py-4 px-8 border-gray-900/10 bg-white flex items-center flex-col justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-md p-4 border bg-indigo-500 flex flex-col"
                >
                    <Link
                        href="s2"
                        className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 text-indigo-500" />
                        {props.backButton}
                    </Link>
                    <div className="rounded-md m-6 py-12 px-16 md:px-48 bg-indigo-500 flex flex-col space-y-8 items-center">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="gap-y-4 flex flex-col"
                            >
                                <h2 className="text-base font-semibold leading-7 text-white">
                                    {props.title} {index + 1}
                                </h2>
                                <FormField
                                    control={form.control}
                                    name={`experiences.${index}.employer`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.employer.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.employer
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.employer.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experiences.${index}.job`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.jobTitle.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.jobTitle
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.jobTitle.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experiences.${index}.city`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.city.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.city.placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.city.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experiences.${index}.country`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.country.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.country
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.country.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experiences.${index}.startYear`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.startYear.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.startYear
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.startYear.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experiences.${index}.endYear`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.endYear.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.endYear
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.endYear.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`experiences.${index}.duties`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.duties.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={
                                                        props.duties.placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.duties.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {fields.length >= 2 && (
                                    <button
                                        type="button"
                                        className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                                        onClick={() => {
                                            remove(index)
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
                                append({
                                    employer: "",
                                    job: "",
                                    city: "",
                                    country: "",
                                    startYear: "",
                                    endYear: "",
                                    duties: "",
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
