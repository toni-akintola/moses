"use client"

import React from "react"

export interface TypePickerProps {
    options: {
        value: string
        label: string
    }[]
    activeOption: string
    onOptionChange: (option: string) => void
    className?: string
}

export const TypePicker: React.FC<TypePickerProps> = ({
    options,
    activeOption,
    onOptionChange,
    className,
}) => {
    return (
        <div className={`flex justify-center mb-8 ${className}`}>
            <div className="relative inline-flex p-1 rounded-full bg-slate-900/40 backdrop-blur-sm">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onOptionChange(option.value)}
                        className={`
                            px-6 py-2 rounded-full transition-all duration-300 
                            ${
                                activeOption === option.value
                                    ? "bg-[#06b6d4] text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                    : "text-slate-400 hover:text-slate-200"
                            }
                        `}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
