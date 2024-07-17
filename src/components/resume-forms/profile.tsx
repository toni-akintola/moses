"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Profile } from "@/utils/types"
import { Trash } from "lucide-react"
import React, { useEffect, useState } from "react"

type ProfileProps = {
    initialData: Profile
    title: string
    description: string
}

const ProfilePage = ({ initialData, title, description }: ProfileProps) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <div className="flex flex-col justify-between">
            <Heading title={title} description={description} />
            <Separator />
            <div className="grid-cols-4 grid gap-8 p-4">
                {initialData.resumeSubmission &&
                    Object.keys(initialData.resumeSubmission!).map((key) => (
                        <Card key={key}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {key}
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground">
                                    ...
                                </p>
                            </CardContent>
                        </Card>
                    ))}
            </div>
            <div className="flex items-center justify-center p-4">
                <Button className="w-1/3">Edit</Button>
            </div>
            <div></div>
        </div>
    )
}

export default ProfilePage
