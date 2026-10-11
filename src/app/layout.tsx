import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/styling";
import { AppProviders } from "@/providers";

import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Hackathon",
    description: "Aplicación web desarrollada para el hackathon.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="es"
            suppressHydrationWarning
            className={cn(
                "h-full antialiased",
                geistSans.variable,
                geistMono.variable,
            )}
        >
            <body className="flex min-h-dvh flex-col font-sans">
                <ThemeProvider>
                    <AppProviders>{children}</AppProviders>
                </ThemeProvider>
            </body>
        </html>
    );
}
