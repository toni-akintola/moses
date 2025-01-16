"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ResumeUploadProps {
    onUploadComplete: (data: any) => void
    className?: string
}

export function ResumeUpload({
    onUploadComplete,
    className,
}: ResumeUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleUpload = async () => {
        if (!file) return

        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/parse-resume", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to upload resume")
            }

            const data = await response.json()
            onUploadComplete(data)
            toast({
                title: "Success",
                description: "Resume uploaded successfully",
            })
        } catch (error) {
            console.error("Error uploading resume:", error)
            toast({
                title: "Error",
                description: "Failed to upload resume",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
                <CardDescription>
                    Upload your resume in PDF or DOCX format
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="resume">Resume</Label>
                    <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-sm text-muted-foreground">
                        Supported formats: PDF, DOCX
                    </p>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleUpload} disabled={!file || loading}>
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Upload"
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ResumeUpload
