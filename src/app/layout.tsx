import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./poviders";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Swift Panel",
    description: "Pterodactyl Panel using Next.js and MongoDB",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.className} antialiased`}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
