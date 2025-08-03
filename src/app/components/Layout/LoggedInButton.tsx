"use client"
import PersonIcon from '@mui/icons-material/Person';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef, useEffect, useState } from 'react';
import { handleSignOut } from "@/app/actions/authAction";
import { AnimatePresence, motion } from "motion/react";
import Link from 'next/link';

export default function LoggedInButton({children}: {children: React.ReactNode}){
    const [isOpen, setOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

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

    return(
        <div className='w-48 relative select-none'>
            <div 
            ref={dropdownRef}
            onClick={handleDropdown}
            className="w-full px-3 py-2 bg-bg-secondary rounded-md font-medium text-accent-secondary 
            hover:cursor-pointer transition-all flex justify-between">
                <p className='max-w-2/3 h-full flex items-center gap-2 truncate'>
                    <PermIdentityIcon sx={{fontSize: 20}}/>
                    {children}
                </p>
                <div className={`transition-all ${isOpen ? 'rotate-180' : ''}`}>
                    <KeyboardArrowDownIcon/>
                </div>
            </div>

            <AnimatePresence>
            {isOpen &&
            
                <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1}}
                    exit={{ opacity: 0, y: -5}}
                    className='absolute z-15 w-full bg-bg-secondary mt-1 rounded-md'>

                    <DropdownItem href="/" className='rounded-t-md border-b border-bg-tertiary'>
                        <HomeIcon sx={{fontSize: 20}}/>
                        Home
                    </DropdownItem>
                    <DropdownItem href="/profile" className='border-b border-bg-tertiary'>
                        <PersonIcon sx={{fontSize: 20}}/>
                        Profile
                    </DropdownItem>
                    <DropdownItem href="/settings" className='border-b border-bg-tertiary'>
                        <SettingsIcon sx={{fontSize: 20}}/>
                        Settings
                    </DropdownItem>
                    <DropdownItem action={handleSignOut} className='rounded-b-md'>
                        <LogoutIcon sx={{fontSize: 20}}/>
                        Logout
                    </DropdownItem>
                </motion.div>
            
            }
            </AnimatePresence>
        </div>
    )
}

interface DropdownProps{
    action?: () => void
    href?: string
    className?: string
    children: React.ReactNode
}

function DropdownItem({href, action, children, className} : DropdownProps){ 

    return(
        <div className={`w-full px-3 py-3 text-accent-secondary font-medium hover:bg-bg-tertiary hover:cursor-pointer flex flex-col ${className}`}>
            {href && 
            <Link href={href} className='flex gap-2 items-center'>
                {children}
            </Link>}

            {action && 
            <form action={action}>
                    <input type="hidden" name="provider" value="google"/>
                    <button 
                    type="submit"
                    className="w-full text-left flex gap-2 items-center hover:cursor-pointer">
                        {children}
                    </button>
            </form>}
        </div>
    )
}