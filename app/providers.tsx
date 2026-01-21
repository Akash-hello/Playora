"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TooltipProvider>
                {children}
                <Toaster />
                <Sonner />
            </TooltipProvider>
        </ThemeProvider>
    )
}
