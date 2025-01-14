"use client"

interface LastUpdatedProps {
    date: string
}

export function LastUpdated({ date }: LastUpdatedProps) {
    return (
        <div className="text-sm text-muted-foreground mt-1">
            {new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}
        </div>
    )
}
