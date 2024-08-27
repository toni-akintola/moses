import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { createClient } from "@/utils/supabase/server"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import React from "react"

type Props = {}

const Page = async (props: Props) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const profileID = user.data.user?.id
    const { data: matchData, error: matchError } = await supabase
        .from("matches")
        .select("*")
        .eq("profile_id", profileID)
    const matches = await Promise.all(
        matchData.map(async (match) => {
            const { data: candidateData, error: candidateError } =
                await supabase
                    .from("candidates")
                    .select("*")
                    .eq("candidate_id", match.candidate_id)
            const { data: jobData, error: jobError } = await supabase
                .from("jobs")
                .select("*")
                .eq("id", match.job_id)
            const result = {
                id: match.id,
                rating: match.rating,
                candidate: candidateData[0],
                job: jobData[0],
            }
            return result
        })
    )
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Matches</CardTitle>
                    <CardDescription>
                        Candidates whose qualifications fit your needs.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                {/* <TableHead>Company</TableHead> */}
                                <TableHead>Job Title</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Rating
                                </TableHead>
                                <TableHead>
                                    <span className="">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {matches?.map((match) => (
                                <TableRow key={match.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Link href={`candidates/${match.id}`}>
                                            <div className="aspect-square bg-gradient-to-b from-cyan-100 via-cyan-300 to-laserBlue rounded-md object-cover"></div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {match.candidate.first_name}{" "}
                                        {match.candidate.last_name}
                                    </TableCell>
                                    {/* <TableCell className="font-medium">
                                        {match.job.company}
                                    </TableCell> */}
                                    <TableCell className="font-medium">
                                        {match.job.title}
                                    </TableCell>

                                    <TableCell className="hidden md:table-cell font-bold">
                                        <p>{match.rating}</p>
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

export default Page
