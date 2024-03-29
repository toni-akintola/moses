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

const educationSchema = z.object({
    school: z
        .string({ required_error: "Se requiere una escuela/universidad" })
        .min(2),
    country: z.string({
        required_error: "Se requiere país",
    }),
    degree: z.string({ required_error: "Se requiere una grado" }).min(2),
    concentration: z
        .string({ required_error: "Se requiere una concentración" })
        .min(2),
    startYear: z
        .string({ required_error: "Se requiere un año de inicio" })
        .min(4, {
            message: "El año debe tener al menos 4 caracteres.",
        }),
    endYear: z
        .string({ required_error: "Se requiere un año de termino" })
        .min(4, {
            message: "El año debe tener al menos 4 caracteres.",
        }),
    completed: z.boolean({
        required_error: "Debe especificar si completó o no la carrera.",
    }),
})

const educationsSchema = z.object({
    educations: z.array(educationSchema),
})
export function S2B() {
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
                    concentration: "",
                    startYear: "",
                    endYear: "",
                    country: "",
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

        router.push("/s3")
    }

    return (
        <div className="border py-4 px-8 border-gray-900/10 bg-white flex items-center flex-col justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-md p-4 border bg-indigo-500 flex flex-col"
                >
                    <Link
                        href="/s1"
                        className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 text-indigo-500" />
                        Atrás
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-48 bg-indigo-500 flex flex-col space-y-4">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="gap-y-4 flex flex-col items-center"
                            >
                                <h2 className="text-base font-semibold leading-7 text-white">
                                    Educación {index + 1}
                                </h2>
                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.school`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Universidad/Escuela Secundaria
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Universidad de Los Andes"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra una escuela.
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
                                                País
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Venezuela"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el país.
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
                                                Grado
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Licenciatura"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el grado.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.concentration`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Concentración
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Economia"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra la concentración.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`educations.${index}.startYear`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Año de inicio
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="2000"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el año de inicio.
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
                                                Año de termino
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="2000"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el año de termino.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
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
                                                    ¿Completaste?
                                                </FormLabel>
                                            </div>
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
                                        Eliminar educación
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
                                    concentration: "",
                                    startYear: "",
                                    endYear: "",
                                    country: "",
                                    completed: false,
                                })
                            }}
                        >
                            <PlusCircle className="h-4 w-4" />
                            Agregar educación
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
