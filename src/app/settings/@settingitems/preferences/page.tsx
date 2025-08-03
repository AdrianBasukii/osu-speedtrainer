"use client"
import Settings from "@/app/components/Settings/Settings"

export default function PreferencePage(){
    return(
        <>
            <Settings.Heading>Preferences</Settings.Heading>
            <Settings.Item className="border-b-2 flex-col ">
                <Settings.ItemHeading>Theme Selection</Settings.ItemHeading>
                <Settings.TextContainer className="flex-row">
                    <ThemeItem className="dark"/>
                    <ThemeItem className="light"/>
                    <ThemeItem className="black"/>
                </Settings.TextContainer>
            </Settings.Item>
        </>
    )
}

function ThemeItem({className} : {className: string}){
    return(
        <div className="w-36 h-24 rounded-sm border-3 border-accent-secondary">
            <div className={`${className} bg-bg-primary rounded-md w-full h-full`}>
                <div className="w-full h-full rounded-md bg-bg-primary shadow-lg">

                </div>
            </div>
        </div>
    )
}