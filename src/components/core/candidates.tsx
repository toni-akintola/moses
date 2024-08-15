import { createClient } from "@/utils/supabase/server"
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

type Props = {}

const Candidates = async (props: Props) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const userID = user.data.user?.id
    const { data: candidateData, error } = await supabase
        .from("candidates")
        .select()
        .eq("profile_id", userID)
    console.log(candidateData)
    console.log(error)
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
                                <TableRow key={candidate.candidate_id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Link
                                            href={`candidates/${candidate.candidate_id}`}
                                        >
                                            <Image
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src="/placeholder.svg"
                                                width="64"
                                            />
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
                    href={`candidates/${candidate.candidate_id}`}
                    key={candidate.candidate_id}
                >
                    {candidate.candidate_id}
                </Link>
            ))} */}
        </div>
    )
}

export default Candidates
