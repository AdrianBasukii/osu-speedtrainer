"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategoryProps {
  href: string
  children: React.ReactNode
}

export default function Category({ href, children }: CategoryProps) {

    const path = usePathname()
    const active = path === href
    
    return (
        <Link href={href} className={`text-xl ${active ? 'text-[#e5e5e5]' : 'text-[#444444]'} font-medium flex items-center gap-2`}>
        {children}
        </Link>
    )
}