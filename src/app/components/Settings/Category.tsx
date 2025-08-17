"use client"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TuneIcon from '@mui/icons-material/Tune';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "motion/react";

interface CategoryProps {
  href: string
  children: React.ReactNode
}

export default function Category({ href, children }: CategoryProps) {

    const path = usePathname()
    const active = path === href
    
    return (
        <Link href={href} className={`text-xl ${active ? 'text-text-primary' : 'text-accent-secondary'} font-medium flex items-center gap-2`}>
        {children}
        </Link>
    )
}

export function DesktopCategoryView(){
    return(
        <div className="hidden md:flex md:flex-col gap-6">
            <Category href="/settings/account">
                <PermIdentityIcon/>
                Account Settings
            </Category>
            <Category href="/settings/preferences">
                <TuneIcon/>
                Preferences
            </Category>
        </div>
    )
}

export function MobileCategoryView(){
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setOpen] = useState(false)

    const path = usePathname()
    const pathList = path.split("/")
    const activePath = pathList[pathList.length - 1]


    function handleDropdown(){
        setOpen(!isOpen)
    }

    useEffect(() => {
        function clickOutsideHandler(event: MouseEvent) {
            if (
                dropdownRef.current &&
                event.target instanceof Node &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", clickOutsideHandler)

        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        };
    }, [dropdownRef])
    
    return (
    <div className='w-full relative select-none block md:hidden'>
        <div 
            onClick={handleDropdown}
            ref={dropdownRef}
            className="w-full px-3 py-2 rounded-md font-medium text-accent-secondary border-2 border-bg-tertiary
            hover:cursor-pointer transition-all flex justify-between">
            <p className='text-xl md:text-md max-w-2/3 h-full flex items-center gap-2 truncate'>
                {activePath[0].toUpperCase()}{activePath.slice(1)}
            </p>
            <div className={`transition-all ${isOpen ? 'rotate-180' : ''}`}>
                <KeyboardArrowDownIcon/>
            </div>
        </div>

        <AnimatePresence>
        { isOpen && 
            <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1}}
                exit={{ opacity: 0, y: -5}}
                className='absolute z-15 w-full border-2 border-bg-tertiary bg-bg-secondary mt-1 rounded-md'>
              
              <Link href={'/settings/account'} className={`p-2 text-lg text-accent-secondary flex items-center gap-2 border-b border-bg-tertiary`}>
                Account
              </Link>

              <Link href={'/settings/preferences'} className={`p-2 text-lg text-accent-secondary flex items-center gap-2`}>
                Preferences
              </Link>
            
            </motion.div>
        }
        </AnimatePresence>
    </div>
)
}