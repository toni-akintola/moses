"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { Form, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
    }),
    salaryRange: z.string().min(2, {
        message: "Salary range must be at least 2 characters.",
    }),
    title: z.string().min(2, {
        message: "Job title must be at least 2 characters.",
    }),
    company: z.string().min(1, {
        message: "Company name must be at least 1 character.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    employmentType: z.string().min(2),
})
const Page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "",
            salaryRange: "",
            title: "",
            company: "",
            description: "",
            employmentType: "",
        },
    })
    const supabase = createClient()
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const { data, error } = await supabase
            .from("jobs")
            .insert([values])
            .select()
        console.log(data, error)
    }
    return (
        <div className="p-4 md:p-8 flex flex-col space-y-5">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Post New Job</Button>
                </DialogTrigger>
                <DialogContent className="max-w-full w-2/3 h-2/3">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Create New Job
                        </DialogTitle>
                        <DialogDescription>
                            Enter the job information.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid gap-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        placeholder="Chicago, IL"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="wage">Wage</Label>
                                    <Input
                                        id="wage"
                                        placeholder="$25"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="title"
                                    placeholder="Construction Laborer"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" type="text" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="employment-type">
                                    Employment type
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Full-time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Full-time">
                                            Full-time
                                        </SelectItem>
                                        <SelectItem value="Part-time">
                                            Part-time
                                        </SelectItem>
                                        <SelectItem value="Full-time and Part-time">
                                            Full-time and part-time
                                        </SelectItem>
                                        <SelectItem value="Contractor">
                                            Contractor
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Description</Label>
                                <Textarea />
                                <Button
                                    type="submit"
                                    className="w-1/3 self-center"
                                >
                                    Post Job
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Page