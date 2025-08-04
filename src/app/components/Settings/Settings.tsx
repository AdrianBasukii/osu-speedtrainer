"use client"
import { useRef, useEffect } from "react"

interface Props{
    children: React.ReactNode
}

function Settings({children} : Props){
    return(
        <div className="w-full h-full grid grid-rows-[1fr_3fr] md:grid-rows-none md:grid-cols-[1fr_3fr] gap-4 lg:gap-8">
            {children}
        </div>
    )
}

export function SettingCategory({children} : Props){
    return(
        <div className="w-full h-full md:h-fit rounded-xl bg-bg-secondary flex flex-wrap justify-center p-6">
            <div className="flex md:flex-col gap-6">
                {children}
            </div>
        </div>
    )
}

export function SettingList({children} : Props){
    return(
        <div className="w-full rounded-xl bg-bg-secondary p-6">
            {children}
        </div>
    )
}

interface ClassProps extends Props{
    className?: string
}

function SettingHeading({children, className} : ClassProps){
    return <h1 className={`text-3xl text-accent-secondary mb-6 font-semibold ${className}`}>{children}</h1>
}

function SettingItem({children, className} : ClassProps){
    return(
        <div className={`w-full min-h-24 p-3 border-bg-tertiary border-t-2 ${className} flex justify-between`}>
            {children}
        </div>
    )
}

function SettingTextContainer({children, className} : ClassProps){
    return(
        <div className={`flex flex-col gap-3 ${className}`}>
            {children}
        </div>
    )
}

function SettingItemHeading({children, className} : ClassProps){
    return(
        <h1 className={`text-xl ${className}`}>
            {children}
        </h1>
    )
}

function SettingItemDescription({children, className} : ClassProps){
    return(
        <p className={`text-accent-secondary ${className}`}>
            {children}
        </p>
    )
}

interface ButtonProps extends ClassProps{
    onClick: () => void
}

function SettingButton({children, className, onClick} : ButtonProps){
    return <button className={`hover:cursor-pointer font-medium ${className}`} onClick={onClick}>{children}</button>
}

interface PopupProps extends Props{
    handleState: () => void
}

function SettingPopup({children, handleState} : PopupProps){

    const popupRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        function clickOutsideHandler(event: MouseEvent) {
            if (
                popupRef.current &&
                event.target instanceof Node &&
                !popupRef.current.contains(event.target)
            ) {
                handleState();
            }
        }

        document.addEventListener("mousedown", clickOutsideHandler)

        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        };
    }, [popupRef])
    return(
        <div className="w-full h-full absolute top-0 left-0 z-20 bg-black/50 flex items-center justify-center">
            <div ref={popupRef} className="p-4 bg-bg-primary border-3 border-bg-tertiary rounded-lg flex flex-col gap-8">
                {children}
            </div>
        </div>
    )
}

Settings.Heading = SettingHeading
Settings.Item = SettingItem
Settings.ItemHeading = SettingItemHeading
Settings.ItemDesc = SettingItemDescription
Settings.TextContainer = SettingTextContainer
Settings.Button = SettingButton
Settings.Popup = SettingPopup

export default Settings