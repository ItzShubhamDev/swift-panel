import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./poviders";
import { Sidebar } from "@/components/common/Sidebar";
import { Navbar } from "@/components/common/Navbar";

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
                    <div className="flex h-screen bg-gray-50">
                        <Sidebar />
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <Navbar />
                            <main className="flex-1 overflow-y-auto bg-gray-50 p-4">{children} </main>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
