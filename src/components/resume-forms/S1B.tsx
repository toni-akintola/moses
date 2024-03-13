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
const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "El nombre debe tener al menos dos caracteres.",
    }),
    age: z.number().min(1, {
        message: "La edad debe ser un numero",
    }),
    phoneNumber: z
        .string()
        .regex(phoneRegex, "El número de teléfono no es válido"),
    email: z.string().email(),
    englishProficiency: z.enum(
        [
            "none, elementary, limited, professional, complete professional, fluent",
        ],
        {
            required_error: "Debes especificar una competencia.",
        }
    ),
})

export function S1B() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            age: 0,
            phoneNumber: "",
            email: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div className="border h-screen border-gray-900/10 bg-white flex items-center flex-col">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 rounded-md m-6 py-12 px-16 border bg-indigo-500 flex flex-col"
                >
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Nombre Completo
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription className="text-white">
                                    This is your public display name.
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
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription className="text-white">
                                    This is your public display name.
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
                                    Edad
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription className="text-white">
                                    This is your public display name.
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
                                    Edad
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription className="text-white">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="englishProficiency"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="text-white">
                                    Notify me about...
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
                                                    value="all"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal text-white">
                                                All new messages
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem
                                                    className="border-white text-white"
                                                    value="mentions"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal text-white">
                                                Direct messages and mentions
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem
                                                    className="border-white text-white"
                                                    value="none"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal text-white">
                                                Nothing
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
                </form>
            </Form>
        </div>
    )
}
