"use client"
import Logo from "@/components/landing/Logo"
import { createBrowserClient } from "@supabase/ssr"
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
import { GoogleButton, MicrosoftButton } from "@/components/ui/oauth-button"
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
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Provider } from "@supabase/supabase-js"

type Props = {}

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    accountType: z.string(),
})

export default function Auth(props: Props) {
    const supabase = createClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            accountType: "",
        },
    })

    const params = useParams()
    const locale = params.locale as string

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })
        console.log(data, error)
    }
    return (
        <div>
            <div className="justify-center items-center h-screen md:px-40 md:py-16">
                <div className="container rounded-md h-full">
                    <div className="bg-laserBlue h-full flex flex-col text-white rounded-md items-center justify-center p-4">
                        <div className="flex flex-col items-center justify-center">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex items-center flex-col justify-center space-y-4 w-full"
                                >
                                    <h2 className="font-semibold text-2xl">
                                        Get started
                                    </h2>
                                    <div className="w-full">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">
                                                        Email
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="text-black"
                                                            placeholder="email@example.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    {/* <FormDescription className="text-white">
                                                Enter your email.
                                            </FormDescription> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="text-black">
                                                    <FormLabel className="text-white">
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="••••••••"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    {/* <FormDescription className="text-white">
                                                Enter your password.
                                            </FormDescription> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="accountType"
                                            render={({ field }) => (
                                                <FormItem className="text-gray-600">
                                                    <FormLabel className="text-white">
                                                        Account Type
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Individual" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel></SelectLabel>
                                                                    <SelectItem value="Individual">
                                                                        Individual
                                                                    </SelectItem>
                                                                    <SelectItem value="Enterprise">
                                                                        Enterprise
                                                                    </SelectItem>
                                                                    <SelectItem value="Employer">
                                                                        Employer
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription className="text-white"></FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="bg-white text-laserBlue w-full"
                                    >
                                        Next
                                    </Button>
                                </form>
                            </Form>
                            <div className="flex-row flex items-center space-x-3">
                                <hr className="bg-gray-300 h-0.5 w-16"></hr>
                                <p>Or continue with</p>
                                <hr className="bg-gray-300 h-0.5 w-16"></hr>
                            </div>
                            <div className="flex flex-col space-y-3 w-full">
                                <GoogleButton
                                    locale={locale}
                                    provider={"google" as Provider}
                                />
                                <MicrosoftButton
                                    locale={locale}
                                    provider={"microsoft" as Provider}
                                />
                            </div>
                            <div className="justify-between items-center flex flex-row w-full">
                                <Link
                                    href="sign-up"
                                    className="flex justify-center w-full"
                                >
                                    <p className="font-semibold underline">
                                        {"Don't have an account?"}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
