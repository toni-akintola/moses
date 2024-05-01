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
import { educationsAtom } from "@/utils/atoms"
import { useAtom } from "jotai"
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
import { FormItemText } from "@/utils/types"
export type S2Props = {
    backButton: string
    title: string
    highSchool: string
    university: string
    education: {
        school: FormItemText
        country: FormItemText
        city: FormItemText
        degree: FormItemText
        startYear: FormItemText
        endYear: FormItemText
    }
    placeholders: {
        diploma: string
        ged: string
        bachelors: string
        none: string
    }
    completed: string
    add: string
    remove: string
    nextButton: string
}
const educationSchema = z.object({
    school: z.string({ required_error: "Inválido." }),
    country: z.string({
        required_error: "Inválido.",
    }),
    city: z.string({
        required_error: "Inválido.",
    }),
    degree: z.string({ required_error: "Inválido." }).min(1, {
        message: "Invalido.",
    }),
    endYear: z.string({ required_error: "Inválido." }).min(4, {
        message: "Inválido.",
    }),
    completed: z.boolean({
        required_error: "Inválido.",
    }),
})

const educationsSchema = z.object({
    educations: z.array(educationSchema),
})
export function S2(props: S2Props) {
    const [educations, setEducations] = useAtom(educationsAtom)
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof educationsSchema>>({
        resolver: zodResolver(educationsSchema),
        defaultValues: {
            educations: [
                {
                    school: "",
                    degree: "",
                    endYear: "",
                    country: "",
                    city: "",
                    completed: false,
                },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "educations",
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof educationsSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values.educations)
        setEducations(values.educations)

        router.push("s3")
    }

    return (
        <div className="border py-4 px-8 border-gray-900/10 bg-white flex items-center flex-col justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-md p-4 border bg-indigo-500 flex flex-col"
                >
                    <Link
                        href="s1"
                        className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 text-indigo-500" />
                        {props.backButton}
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-48 bg-indigo-500 flex flex-col space-y-4 items-center">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            {props.title}
                        </h2>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="gap-y-4 flex flex-col md:px-8"
                            >
                                <h2 className="text-base font-semibold leading-7 text-white">
                                    {fields.length > 1
                                        ? props.university
                                        : props.highSchool}
                                </h2>
                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.school`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.education.school.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.education.school
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {
                                                    props.education.school
                                                        .subtitle
                                                }
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.country`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.education.country.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.education.country
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {
                                                    props.education.country
                                                        .subtitle
                                                }
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.city`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.education.city.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.education.city
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.education.city.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.degree`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.education.degree.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue
                                                            placeholder={
                                                                props.education
                                                                    .degree
                                                                    .placeholder
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel></SelectLabel>
                                                            <SelectItem value="None">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .none
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="High School Diploma">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .diploma
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="GED">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .ged
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Bachelor's Degree">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .bachelors
                                                                }
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {
                                                    props.education.degree
                                                        .subtitle
                                                }
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.endYear`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.education.endYear.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        props.education.endYear
                                                            .placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {
                                                    props.education.endYear
                                                        .subtitle
                                                }
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                    control={form.control}
                                    name={`educations.${index}.completed`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    className="data-[state=checked]:bg-white data-[state=checked]:text-indigo-500 border-white"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-white">
                                                    {props.completed}
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                /> */}
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
                                    school: "",
                                    degree: "",
                                    endYear: "",
                                    country: "",
                                    city: "",
                                    completed: false,
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
