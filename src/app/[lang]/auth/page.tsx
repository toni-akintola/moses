"use client"
import { MainNav } from "@/components/landing/Banner"
import Logo from "@/components/landing/Logo"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react"
import { useForm } from "react-hook-form"

type Props = {}

export default function Auth(props: Props) {
    const form = useForm()
    return (
        <div>
            <div className=" justify-center items-center h-screen p-12">
                <div className="container rounded-md grid grid-cols-2 h-full">
                    <div className="p-10 h-full flex-col justify-between text-white rounded-md bg-muted">
                        <Logo locale="en" />
                        <div className="flex flex-col items-center">
                            <h2 className="text-black font-semibold text-xl">
                                Individual
                            </h2>
                            <ul className="self-start text-black list-disc">
                                <li>Individual accounts...</li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="text-black font-semibold text-xl">
                                Enterprise
                            </h2>
                            <ul className="self-start text-black list-disc">
                                <li>Enterprise accounts...</li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="text-black font-semibold text-xl">
                                Employer
                            </h2>
                            <ul className="self-start text-black list-disc">
                                <li>Employer accounts...</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-pIndigo h-full flex flex-col text-white rounded-md items-center justify-start p-4">
                        <div className="justify-between items-center flex flex-row w-full">
                            <p className="font-semibold">
                                Already have an account?
                            </p>
                            <Button className="text-pIndigo bg-white place-self-end">
                                Login
                            </Button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <Form {...form}>
                                <form className="flex items-center flex-col justify-center space-y-4">
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
                                    <Button className="bg-white text-pIndigo w-full">
                                        Next
                                    </Button>
                                    <div className="flex-row flex items-center space-x-3">
                                        <hr className="bg-gray-300 h-0.5 w-16"></hr>
                                        <p>Or continue with</p>
                                        <hr className="bg-gray-300 h-0.5 w-16"></hr>
                                    </div>
                                    <div className="flex flex-col space-y-3 w-full">
                                        <Button>Google</Button>
                                        <Button>GitHub</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
