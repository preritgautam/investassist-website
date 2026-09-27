import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Builds an absolute URL against NEXT_PUBLIC_APP_URL (e.g. "localhost:3000"),
// adding a protocol if one isn't already present so links work in both local
// dev (http) and production (https) without hardcoding either.
export function getAppUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "localhost:3000"
  const withProtocol = /^https?:\/\//.test(base) ? base : `http${base.startsWith("localhost") ? "" : "s"}://${base}`
  return `${withProtocol.replace(/\/$/, "")}${path}`
}
