import { createClerkSupabaseClientSsr } from "@/utils/supabase/server"
import Link from "next/link"
import React from "react"

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

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { ResumeDetails } from "./resume-details"

type Props = {}

const Candidates = async (props: Props) => {
    const supabase = await createClerkSupabaseClientSsr()

    const { userId } = await auth()
    const { data: candidateData, error } = await supabase
        .from("candidates")
        .select()
        .eq("profile_id", userId)
    if (error) console.log(error)
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Candidates</CardTitle>
                    <CardDescription>Your candidates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Email
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Phone number
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {candidateData?.map((candidate) => (
                                <TableRow key={candidate.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Link
                                            href={`candidates/${candidate.id}`}
                                        >
                                            <div className="aspect-square bg-gradient-to-b from-cyan-100 via-cyan-300 to-laserBlue rounded-md object-cover"></div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {candidate.first_name}{" "}
                                        {candidate.last_name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            Searching
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {candidate.email}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {
                                            candidate.resume_submission
                                                ?.phoneNumber
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            View resume
                                                        </span>
                                                    </Button>
                                                </SheetTrigger>
                                                <SheetContent
                                                    side="right"
                                                    className="w-[400px] sm:w-[540px]"
                                                >
                                                    <SheetHeader>
                                                        <SheetTitle>
                                                            {
                                                                candidate.first_name
                                                            }{" "}
                                                            {
                                                                candidate.last_name
                                                            }
                                                            &apos;s Resume
                                                        </SheetTitle>
                                                        <SheetDescription>
                                                            <Link
                                                                href={`candidates/${candidate.id}`}
                                                                className="hover:text-primary transition-colors"
                                                            >
                                                                View detailed
                                                                resume
                                                                information
                                                            </Link>
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <div className="mt-6">
                                                        {candidate.resume_submission ? (
                                                            <ResumeDetails
                                                                resumeSubmission={
                                                                    candidate.resume_submission
                                                                }
                                                            />
                                                        ) : (
                                                            <p className="text-muted-foreground">
                                                                No resume data
                                                                available
                                                            </p>
                                                        )}
                                                    </div>
                                                </SheetContent>
                                            </Sheet>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Toggle menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                        candidates
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Candidates
