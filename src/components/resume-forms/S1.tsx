"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import type { TFunction } from "i18next"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { phoneRegex } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
    ageAtom,
    emailAtom,
    nameAtom,
    numberAtom,
    proficiencyAtom,
} from "@/utils/atoms"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { stagger, useAnimate } from "framer-motion"
import { useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { FormItemText } from "@/utils/types"
import { AbstractIntlMessages } from "next-intl"

export type S1Props = {
    backButton: string
    general: string
    age: FormItemText
    name: FormItemText
    phoneNumber: FormItemText
    email: FormItemText
    proficiency: { title: string; one: string; five: string; subtitle: string }
    nextButton: string
}
const S1Schema = z.object({
    fullName: z.string().min(2, {
        message: "Inválido.",
    }),
    age: z.string().min(1, {
        message: "Inválido.",
    }),
    phoneNumber: z.string().regex(phoneRegex, "Inválido."),
    email: z.string().email({
        message: "Inválido.",
    }),

    numberSlider: z.number(),
})

const englishProficiency = new Map<number, string>([
    [1, "ILR Level 0"],
    [2, "ILR Level 1"],
    [3, "ILR Level 2"],
    [4, "ILR Level 3"],
    [5, "ILR Level 4"],
])
export interface I18T {}
export function S1(props: S1Props) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof S1Schema>>({
        resolver: zodResolver(S1Schema),
        defaultValues: {
            fullName: "",
            age: "",
            phoneNumber: "",
            email: "",
            numberSlider: 1,
        },
    })

    const [fullName, setFullName] = useAtom(nameAtom)
    const [age, setAge] = useAtom(ageAtom)
    const [proficiency, setProficiency] = useAtom(proficiencyAtom)
    const [number, setNumber] = useAtom(numberAtom)
    const [email, setEmail] = useAtom(emailAtom)
    const router = useRouter()

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof S1Schema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setFullName(values.fullName)
        setAge(values.age)
        const proficiencyValue = englishProficiency.get(
            values.numberSlider
        ) as string
        setProficiency(proficiencyValue)
        console.log(proficiencyValue)
        setNumber(values.phoneNumber)
        setEmail(values.email)

        router.push(`s2`)
    }
    return (
        <div className="border py-4 px-8 border-gray-900/10 bg-white flex items-center flex-col justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-md p-4 border bg-indigo-500 flex flex-col"
                >
                    <Link
                        href="/"
                        className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 text-indigo-500" />
                        {props.backButton}
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-56 bg-indigo-500 flex flex-col space-y-8 items-center">
                        <h2 className="font-semibold leading-7 text-white">
                            {props.general}
                        </h2>
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        {props.name.title}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={props.name.placeholder}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        {props.name.subtitle}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        {props.age.title}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={props.age.placeholder}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        {props.age.subtitle}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        {props.phoneNumber.title}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                props.phoneNumber.placeholder
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        {props.phoneNumber.subtitle}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        {props.email.title}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                props.email.placeholder
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        {props.email.subtitle}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numberSlider"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        {props.proficiency.title}
                                    </FormLabel>
                                    <FormControl>
                                        <Slider
                                            className=""
                                            max={5}
                                            step={1}
                                            defaultValue={[value]}
                                            onValueChange={(vals) => {
                                                onChange(vals[0])
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white"></FormDescription>
                                    <div className="flex justify-between flex-row">
                                        <p className="text-white text-sm">
                                            {props.proficiency.one}
                                        </p>
                                        <p className="text-white text-sm">
                                            {props.proficiency.five}
                                        </p>
                                    </div>
                                    <p className="text-white text-sm">
                                        {props.proficiency.subtitle}
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <FormField
                            control={form.control}
                            name="englishProficiency"
                            render={({ field }) => (
                                <FormItem className="space-y-3 border rounded-md p-2">
                                    <FormLabel className="text-white">
                                        Nivel de Inglés
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-white text-white"
                                                        value="none"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Ninguno
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-white text-white"
                                                        value="elementary"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Primario
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-white text-white"
                                                        value="limited"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Limitado
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-white text-white"
                                                        value="professional"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Profesional
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-white text-white"
                                                        value="complete professional"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Profesional Completo
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-white text-white"
                                                        value="fluent"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Fluido
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
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
