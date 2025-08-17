"use client"
import { useRef, useEffect } from "react"

interface Props{
    children: React.ReactNode
}

function Settings({children} : Props){
    return(
        <div className="w-full h-full flex flex-col md:grid md:grid-cols-[1fr_3fr] gap-4 lg:gap-8">
            {children}
        </div>
    )
}

export function SettingCategory({children} : Props){
    return(
        <div className="w-full h-16 md:h-fit rounded-xl md:bg-bg-secondary flex flex-wrap justify-center md:p-6">
                {children}
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
    return <h1 className={`text-center md:text-left text-2xl md:text-3xl text-accent-secondary mb-6 font-semibold ${className}`}>{children}</h1>
}

function SettingItem({children, className} : ClassProps){
    return(
        <div className={`w-full min-h-24 p-3 border-bg-tertiary border-t-2 ${className} flex gap-12 md:gap-0 flex-col md:flex-row md:justify-between`}>
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
        <h1 className={`text-lg md:text-xl ${className}`}>
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
    return (
        <div className="flex items-center justify-center w-full md:w-fit md:h-fill">
            <button className={`hover:cursor-pointer font-medium px-4 py-1 md:p-0 border-2 md:border-0 border-accent-primary rounded-full ${className}`} onClick={onClick}>{children}</button>
        </div>
    )
    
    
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
        <div className="w-full h-full absolute fixed top-0 left-0 z-20 bg-black/50 flex items-center justify-center">
            <div ref={popupRef} className="w-[90%] md:w-fit p-4 bg-bg-primary border-3 border-bg-tertiary rounded-lg flex flex-col gap-8">
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