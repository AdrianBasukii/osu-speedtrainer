"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Settings from "@/app/components/Settings/Settings"
import { handleUpdateName, handleResetPB, handleDeleteAccount } from "@/app/actions/settingAction"
import { useSettingAction } from "@/app/utils/settings/useSettingAction"

export default function AccountPage(){
    const [popupStatus, setPopup] = useState<string>("none")
    const {
        formAction: updateNameAction
    } = useSettingAction(
        handleUpdateName,
        "name_success",
        "name_error",
        handlePopup
    )

    const {
        formAction: handleResetAction
    } = useSettingAction(
        handleResetPB,
        "name_success",
        "name_error",
        handlePopup
    )

    const {
        formAction: handleDeleteAction
    } = useSettingAction(
        handleDeleteAccount,
        "del_success",
        "del_error",
        handlePopup
    )


    function handlePopup(state: string){
        setPopup(state)
    }

    return(
        <>
            {/* POPUPS */}

            <AnimatedPopup isVisible={popupStatus === "updateName"} handleClose={handlePopup}>
                <Settings.ItemHeading className="text-[#444444] font-medium">Type your new desired username</Settings.ItemHeading>
                <form action={updateNameAction} className="w-full flex flex-col gap-4">
                    <input type="text" placeholder="New username" name="name" className="p-2 w-96 h-12 border-3 border-[#222222] bg-[#181818] rounded-md" autoComplete="off"/>
                    <button type="submit" className="p-2 w-96 h-12 bg-[#222222] font-medium rounded-md hover:cursor-pointer">Change</button>
                </form>
            </AnimatedPopup>

            <AnimatedPopup isVisible={popupStatus === "resetPersonalBest"} handleClose={handlePopup}>
                <Settings.ItemHeading className="text-[#444444] font-medium">Reset Personal Best</Settings.ItemHeading>
                <Settings.ItemDesc className="text-[#e5e5e5] font-medium w-96">Warning: <span className="text-red-900">This action could not be undone</span>, please type <strong>'confirm'</strong> to reset your personal best records.</Settings.ItemDesc>
                <form action={handleResetAction} className="w-full flex flex-col gap-4">
                    <input type="text" placeholder="Your email" name="confirm" className="p-2 w-96 h-12 border-3 border-[#222222] bg-[#181818] rounded-md" autoComplete="off"/>
                    <button type="submit" className="p-2 w-96 h-12 bg-[#222222] font-medium rounded-md hover:cursor-pointer">Reset</button>
                </form>
            </AnimatedPopup>

            <AnimatedPopup isVisible={popupStatus === "deleteAccount"} handleClose={handlePopup}>
                <Settings.ItemHeading className="text-[#444444] font-medium">Delete your account</Settings.ItemHeading>
                <Settings.ItemDesc className="text-[#e5e5e5] font-medium w-96">Warning: <span className="text-red-900">This action could not be undone</span>, please type in your account email to confirm account deletion</Settings.ItemDesc>
                <form action={handleDeleteAction} className="w-full flex flex-col gap-4">
                    <input type="text" placeholder="Your email" name="yourEmail" className="p-2 w-96 h-12 border-3 border-[#222222] bg-[#181818] rounded-md" autoComplete="off"/>
                    <button type="submit" className="p-2 w-96 h-12 bg-red-900 font-medium rounded-md hover:cursor-pointer">Delete</button>
                </form>
            </AnimatedPopup>

            {/* Code */}

            <Settings.Heading>Account</Settings.Heading>
            <Settings.Item>
                <Settings.TextContainer>
                    <Settings.ItemHeading>Change your username</Settings.ItemHeading>
                    <Settings.ItemDesc>Choose a new username that fits you.</Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button onClick={() => handlePopup("updateName")}>Change</Settings.Button>
            </Settings.Item>

            <Settings.Item>
                <Settings.TextContainer>
                    <Settings.ItemHeading>Reset Personal Best</Settings.ItemHeading>
                    <Settings.ItemDesc>Delete all your current personal best records. <span className="text-red-900">You can’t undo this action!</span></Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button onClick={() => handlePopup("resetPersonalBest")}>Reset</Settings.Button>
            </Settings.Item>

            <Settings.Item className="border-b-2">
                <Settings.TextContainer>
                    <Settings.ItemHeading>Delete your account</Settings.ItemHeading>
                    <Settings.ItemDesc>Delete your account. <span className="text-red-900">You can’t undo this action!</span></Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button onClick={() => handlePopup("deleteAccount")} className="text-red-900">Delete</Settings.Button>
            </Settings.Item>
        </>
    )
}

interface PopupProps{
    children: React.ReactNode
    isVisible: boolean
    handleClose: (state: string) => void
}

function AnimatedPopup({children, isVisible, handleClose} : PopupProps){
    return(
        <AnimatePresence>
            {isVisible &&
            <motion.div
                initial={{ opacity: 0,}}
                animate={{ opacity: 1}}
                transition={{ duration: 0.1}}
                exit={{ opacity: 0 }}
                
            >
                <Settings.Popup handleState={() => handleClose("none")}>
                    {children}
                </Settings.Popup>
            </motion.div>
            }
        </AnimatePresence>
    )
}