"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface ResumeUploadProps {
    onUploadComplete: (data: any) => void
    className?: string
}

const ResumeUpload = ({ onUploadComplete, className }: ResumeUploadProps) => {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) {
            toast({
                title: "No file selected",
                description: "Please select a resume file to upload",
                variant: "destructive",
            })
            return
        }

        try {
            setLoading(true)
            //   const formData = new FormData()
            //   formData.append("file", file)
            console.log(file)

            const response = await fetch("/api/parse-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ file: file }),
            })

            if (!response.ok) {
                throw new Error("Failed to upload resume")
            }

            const data = await response.json()
            onUploadComplete(data)

            toast({
                title: "Resume uploaded successfully",
                description:
                    "Your resume has been processed and the form will be pre-filled with the extracted information.",
            })
        } catch (error) {
            console.error("Error uploading resume:", error)
            toast({
                title: "Error uploading resume",
                description:
                    "There was a problem uploading your resume. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="resume">Upload Resume</Label>
                <div className="flex items-center gap-2">
                    <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={!file || loading}>
                        {loading ? (
                            <Icons.spinner className="h-4 w-4 animate-spin" />
                        ) : (
                            "Upload"
                        )}
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX
                </p>
            </div>
        </form>
    )
}

export default ResumeUpload
