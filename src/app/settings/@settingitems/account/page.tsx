"use client"
import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import Settings from "@/app/components/Settings/Settings"

export default function AccountPage(){
    const popupRef = useRef<HTMLDivElement>(null)
    const [showUpdateName, setUpdateName] = useState<boolean>(false)
    const [showUpdateEmail, setUpdateEmail] = useState<boolean>(false)
    const [showDelete, setDelete] = useState<boolean>(false)

    useEffect(() => {
        function clickOutsideHandler(event: MouseEvent) {
            if (
                popupRef.current &&
                event.target instanceof Node &&
                !popupRef.current.contains(event.target)
            ) {
                setUpdateName(false);
            }
        }

        document.addEventListener("mousedown", clickOutsideHandler)

        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        };
    }, [popupRef])

    function handleUpdateName(){
        if(!showUpdateEmail && !showDelete){
            setUpdateName(!showUpdateName)
        }
    }

    function handleDelete(){
        if(!showUpdateEmail && !showUpdateName){
            setDelete(!showDelete)
        }
    }

    return(
        <>
            {/* POPUPS */}
            {showUpdateName && 
            <AnimatePresence>
            <motion.div
                initial={{ opacity: 0,}}
                animate={{ opacity: 1}}
                transition={{ duration: 0.1}}
                exit={{ opacity: 0 }}
                
            >
                <Settings.Popup handleState={handleUpdateName}>
                    <Settings.ItemHeading className="text-[#444444] font-medium">Type your new desired username</Settings.ItemHeading>
                        <form action="" className="w-full flex flex-col gap-4">
                        <input type="text" placeholder="New username" name="name" className="p-2 w-96 h-12 border-3 border-[#222222] bg-[#181818] rounded-md" autoComplete="off"/>
                        <button type="submit" className="p-2 w-96 h-12 bg-[#222222] font-medium rounded-md hover:cursor-pointer">Change</button>
                    </form>
                </Settings.Popup>
            </motion.div>
            </AnimatePresence>}

            {showDelete && 
            <AnimatePresence>
            <motion.div
                initial={{ opacity: 0,}}
                animate={{ opacity: 1}}
                transition={{ duration: 0.1}}
                exit={{ opacity: 0 }}
                
            >
                <Settings.Popup handleState={handleDelete}>
                    <Settings.ItemHeading className="text-[#444444] font-medium">Delete your account</Settings.ItemHeading>
                    <Settings.ItemDesc className="text-[#e5e5e5] font-medium w-96">Warning: <span className="text-red-900">This action could not be undone</span>, please type in your account email to confirm account deletion</Settings.ItemDesc>
                        <form action="" className="w-full flex flex-col gap-4">
                        <input type="text" placeholder="Your email" name="name" className="p-2 w-96 h-12 border-3 border-[#222222] bg-[#181818] rounded-md" autoComplete="off"/>
                        <button type="submit" className="p-2 w-96 h-12 bg-red-900 font-medium rounded-md hover:cursor-pointer">Delete</button>
                    </form>
                </Settings.Popup>
            </motion.div>
            </AnimatePresence>}

            <Settings.Heading>Account</Settings.Heading>
            <Settings.Item>
                <Settings.TextContainer>
                    <Settings.ItemHeading>Change your username</Settings.ItemHeading>
                    <Settings.ItemDesc>Choose a new username that fits you.</Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button onClick={handleUpdateName}>Change</Settings.Button>
            </Settings.Item>

            <Settings.Item>
                <Settings.TextContainer>
                    <Settings.ItemHeading>Change your username</Settings.ItemHeading>
                    <Settings.ItemDesc>Choose a new username that fits you.</Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button onClick={handleUpdateName}>Change</Settings.Button>
            </Settings.Item>

            <Settings.Item className="border-b-2">
                <Settings.TextContainer>
                    <Settings.ItemHeading>Delete your account</Settings.ItemHeading>
                    <Settings.ItemDesc>Delete your account. <span className="text-red-900">You can’t undo this action!</span></Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button onClick={handleDelete} className="text-red-900">Delete</Settings.Button>
            </Settings.Item>
        </>
    )
}