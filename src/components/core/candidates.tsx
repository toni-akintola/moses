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

import Image from "next/image"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"

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
                                        {candidate.resume_submission.number}
                                    </TableCell>
                                    <TableCell>
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

            {/* {candidateData?.map((candidate) => (
                <Link
                    href={`candidates/${candidate.id}`}
                    key={candidate.id}
                >
                    {candidate.id}
                </Link>
            ))} */}
        </div>
    )
}

export default Candidates
