"use client"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from "motion/react";

interface SelectProps{
    options: string[]
    value: string
    onClick: (value: string) => void
}

export default function ProfileDropdown({options, onClick, value} : SelectProps){
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setOpen] = useState(false)

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
    <div className='w-28 relative select-none'>
        <div 
            onClick={handleDropdown}
            ref={dropdownRef}
            className="w-full px-3 py-2 border-2 border-bg-tertiary rounded-md font-medium text-accent-secondary 
            hover:cursor-pointer transition-all flex justify-between">
            <p className='max-w-2/3 h-full flex items-center gap-2 truncate'>
                {value}
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

            
                <div className={`w-full px-3 py-3 text-accent-secondary font-medium hover:bg-bg-tertiary hover:cursor-pointer flex flex-col`}>
                    <button 
                    onClick={() => onClick(options[0])}
                    type="submit"
                    className="w-full text-left flex gap-2 items-center hover:cursor-pointer">
                        {options[0]}
                    </button>
                </div>

                <div className={`w-full px-3 py-3 text-accent-secondary font-medium hover:bg-bg-tertiary hover:cursor-pointer flex flex-col`}>
                    <button 
                    onClick={() => onClick(options[1])}
                    type="submit"
                    className="w-full text-left flex gap-2 items-center hover:cursor-pointer">
                        {options[1]}
                    </button>
                </div>
            
            </motion.div>
        }
        </AnimatePresence>
    </div>
)
}