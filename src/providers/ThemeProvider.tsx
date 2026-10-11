import { ThemeProvider as NextThemeProvider } from "@wrksz/themes/next";
import type { ReactNode } from "react";

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemeProvider>
    );
}

export default ThemeProvider;
