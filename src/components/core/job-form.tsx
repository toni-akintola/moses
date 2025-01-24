"use client"

import { Button } from "@/components/ui/button"
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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Job } from "../../../types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { nanoid } from "@/utils/helpers"
import { useSession } from "@clerk/nextjs"
import createClerkSupabaseClient from "@/utils/supabase/client"
import { vectorize } from "@/functions/openai"
import { Plus } from "lucide-react"

const formSchema = z.object({
    id: z.string(),
    title: z.string().min(2, {
        message: "Job title must be at least 2 characters.",
    }),
    company: z.string().min(1, {
        message: "Company name must be at least 1 character.",
    }),
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
    }),
    salaryRange: z.string().min(2, {
        message: "Salary range must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    employmentType: z.string().min(2),
    status: z.enum(["active", "closed", "draft"]).default("active"),
    is_active: z.boolean().default(true),
})

type Props = {
    job?: Job
    mode?: "create" | "edit"
}

const JobForm = ({ job, mode = "create" }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: job || {
            id: nanoid(),
            title: "",
            company: "",
            location: "",
            salaryRange: "",
            description: "",
            employmentType: "",
            status: "active",
            is_active: true,
        },
    })

    const { session } = useSession()
    const supabase = createClerkSupabaseClient(session)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!session) return
        const employer_id = session.user.id
        const embedding = await vectorize(JSON.stringify(values))
        const datePosted = new Date().toISOString()

        if (mode === "create") {
            const { data, error } = await supabase
                .from("jobs")
                .insert([{ ...values, employer_id, embedding, datePosted }])
            if (error) console.error(error)
        } else {
            const { data, error } = await supabase
                .from("jobs")
                .update({ ...values, embedding })
                .eq("id", values.id)
            if (error) console.error(error)
        }

        // Refresh the page to show the new job
        window.location.reload()
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">
                        {mode === "create" ? "Add new job" : "Edit job"}
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>
                        {mode === "create" ? "Create New Job" : "Edit Job"}
                    </SheetTitle>
                    <SheetDescription>
                        {mode === "create"
                            ? "Post a new job listing."
                            : "Edit your job listing."}
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
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
                                            <Input
                                                placeholder="Company Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                            <FormLabel>Salary Range</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="$25/hr"
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
                                name="employmentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employment Type</FormLabel>
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
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="closed">
                                                    Closed
                                                </SelectItem>
                                                <SelectItem value="draft">
                                                    Draft
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
                                            <Textarea
                                                placeholder="Enter job description and requirements..."
                                                className="min-h-[150px]"
                                                onChange={field.onChange}
                                                value={field.value}
                                                disabled={field.disabled}
                                                name={field.name}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                {mode === "create"
                                    ? "Create Job"
                                    : "Save Changes"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default JobForm
