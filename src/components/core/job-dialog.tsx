"use client"
import Jobs from "@/components/core/jobs"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
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
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { nanoid } from "@/utils/helpers"
import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    id: z.string(),
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
const JobDialog = () => {
    const supabase = createClient()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: nanoid(),
            location: "",
            salaryRange: "",
            title: "",
            company: "",
            description: "",
            employmentType: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const user = await supabase.auth.getUser()
        const employer_id = user.data.user?.id
        const { data, error } = await supabase
            .from("jobs")
            .insert([{ ...values, employer_id }])
            .select()
        console.log(data, error)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Post New Job</Button>
            </DialogTrigger>
            <DialogContent className="max-w-full w-2/3">
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
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Chicago, IL"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="salaryRange"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wage</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="$25"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Construction Laborer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="employmentType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Employment type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select employment type" />
                                            </SelectTrigger>
                                        </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogClose asChild>
                            <Button type="submit" className="w-1/3 self-center">
                                Post Job
                            </Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default JobDialog
