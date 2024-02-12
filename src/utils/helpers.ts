import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from "nanoid"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7
) // 7-character random string

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_SITE_URL}!`
  }
  
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}!`;
};