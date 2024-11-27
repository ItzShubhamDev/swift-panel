'use client';

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </NextUIProvider>
    );
}