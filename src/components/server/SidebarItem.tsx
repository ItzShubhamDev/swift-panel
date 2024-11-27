"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Item({ href, name, icon }: { href: string, name: string, icon: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <Link href={href} className={
            `flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors ${pathname.includes(href) ? 'bg-gray-800 text-emerald-400' : ''}`
        }>
            {icon}
            <span>{name}</span>
        </Link>
    )
}