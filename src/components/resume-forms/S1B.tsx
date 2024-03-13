"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { phoneRegex } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
const S1Schema = z.object({
    fullName: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }),
    age: z.string().min(1, {
        message: "La edad debe ser un numero",
    }),
    phoneNumber: z
        .string()
        .regex(phoneRegex, "El número de teléfono no es válido"),
    email: z.string().email({
        message: "El correo electrónico no es válido",
    }),
    englishProficiency: z.enum(
        [
            "none",
            "elementary",
            "limited",
            "professional",
            "complete professional",
            "fluent",
        ],
        {
            required_error: "Debes especificar una competencia.",
        }
    ),
})

export function S1B() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof S1Schema>>({
        resolver: zodResolver(S1Schema),
        defaultValues: {
            fullName: "",
            age: "",
            phoneNumber: "",
            email: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof S1Schema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                        Inicio
                    </Link>
                    <div className="rounded-md m-6 py-12 px-16 md:px-48 bg-indigo-500 flex flex-col space-y-8">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Información General
                        </h2>
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        Nombre Completo
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Miguel de Cervantes"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        Entra su nombre completo.
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
                                        Edad
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="24" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        Entra su edad.
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
                                        Número de Teléfono
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="(800) 555-0100"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        Entra su número de teléfono.
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
                                        Correo Electrónico
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="miguel@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-white">
                                        Entra su correo electrónico.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
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
                        />
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
