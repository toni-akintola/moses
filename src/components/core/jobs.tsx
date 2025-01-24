import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
import Link from "next/link"
import React from "react"
import { auth } from "@clerk/nextjs/server"
import { Job } from "../../../types/types"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import JobForm from "./job-form"

type Props = {}

const Jobs = async (props: Props) => {
    const supabase = await createClerkSupabaseClientSsr()
    const { userId: employerID } = await auth()
    const { data: jobsData, error } = await supabase
        .from("jobs")
        .select()
        .eq("employer_id", employerID)

    let jobs: Job[] = jobsData || []

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                    <CardTitle>Jobs</CardTitle>
                    <CardDescription>Manage your job listings.</CardDescription>
                </div>
                <JobForm />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Posted Date</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">
                                    {job.title}
                                </TableCell>
                                <TableCell>{job.company}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            job.is_active
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{job.datePosted}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Link href={`search/${job.id}`}>
                                            <Button size="icon" variant="ghost">
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">
                                                    View job
                                                </span>
                                            </Button>
                                        </Link>
                                        <JobForm job={job} mode="edit" />
                                        <form
                                            action={async () => {
                                                "use server"
                                                const supabase =
                                                    await createClerkSupabaseClientSsr()
                                                await supabase
                                                    .from("jobs")
                                                    .delete()
                                                    .eq("id", job.id)
                                            }}
                                        >
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                type="submit"
                                                className="text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Delete job
                                                </span>
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{jobs.length}</strong> jobs
                </div>
            </CardFooter>
        </Card>
    )
}

export default Jobs
