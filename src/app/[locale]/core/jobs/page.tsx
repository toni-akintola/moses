import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import Link from "next/link"
import React from "react"

type Props = {}

const Page = (props: Props) => {
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
                            Enter the job information
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Location</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Chicago, IL"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Wage</Label>
                                <Input
                                    id="last-name"
                                    placeholder="$25"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Title</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Construction Laborer"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Company</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Employment type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Full-time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="est">
                                        Full-time
                                    </SelectItem>
                                    <SelectItem value="cst">
                                        Part-time
                                    </SelectItem>
                                    <SelectItem value="mst">
                                        Full-time and part-time
                                    </SelectItem>
                                    <SelectItem value="pst">
                                        Contractor
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Description</Label>
                            <Textarea />
                            <Button type="submit" className="w-1/3 self-center">
                                Post Job
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Page
