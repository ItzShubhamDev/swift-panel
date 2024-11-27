import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

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
      <body className={`${roboto.className} antialiased`}>
        <NextTopLoader />
        <div className="flex h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
