"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps
    extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    indicatorClassName?: string
}

const Progress: React.FC<ProgressProps> & {
    Root: typeof ProgressPrimitive.Root
    Indicator: typeof ProgressPrimitive.Indicator
} = ({ className, value, indicatorClassName, ...props }) => {
    return (
        <ProgressPrimitive.Root
            className={cn(
                "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
                className
            )}
            value={value}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    )
}

Progress.Root = ProgressPrimitive.Root
Progress.Indicator = ProgressPrimitive.Indicator

Progress.displayName = "Progress"

export { Progress }
export default Progress
