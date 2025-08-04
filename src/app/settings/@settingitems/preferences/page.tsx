"use client"
import Settings from "@/app/components/Settings/Settings"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSession, SessionProvider } from "next-auth/react"
import { useState } from "react"

export default function PreferencePage(){

    return(
        <SessionProvider>
            <PreferenceContent/>
        </SessionProvider>
    )
}

function PreferenceContent(){
    const { data: session } = useSession()
    const themes = ["dark", "light", "black"]
    type Theme = typeof themes[number]
    const [colorScheme, setColorScheme] = useState<Theme>(session?.user?.colorScheme || "dark")

    return(
        <>
            <Settings.Heading>Preferences</Settings.Heading>
            <Settings.Item className="border-b-2 flex-col gap-6 pb-8">
                <Settings.ItemHeading>Theme Selection</Settings.ItemHeading>
                <Settings.TextContainer className="flex-row xl:gap-4">
                    {
                        themes.map((theme) => (
                            <ThemeItem 
                                key={theme} 
                                className={theme} 
                                active={colorScheme === theme}
                            />
                        ))
                    }
                </Settings.TextContainer>
            </Settings.Item>
        </>
    )
}

function ThemeItem({className, active} : {className: string, active?: boolean}){

    const title = className[0].toUpperCase() + className.slice(1)
    return(
        <div className={`relative w-full lg:w-48 xl:w-64 aspect-3/2 rounded-lg border-2 border-bg-tertiary ${active && "border-blue-500"} hover:border-blue-500 hover:cursor-pointer transition-all`}>
            {active && <CheckCircleIcon className="absolute top-2 right-2 text-blue-500"/>}
            
            <div className={`${className} bg-bg-primary rounded-t-lg w-full h-full`}>
                <div className="w-full h-full p-4 rounded-md bg-bg-primary shadow-lg">
                    <div className="bg-bg-secondary h-full w-full p-3 rounded-md flex flex-col justify-center gap-2">
                        <h1 className="text-text-primary font-medium">{title}</h1>
                        <p className="text-accent-secondary text-sm">Sample Content</p>
                        <div className="w-full h-3 bg-bg-tertiary rounded-full"/>
                        <div className="w-full h-3 bg-accent-primary rounded-full"/>
                    </div>
                </div>
            </div>

            <div className="w-full px-4 py-3 bg-bg-secondary font-medium rounded-b-md">
                {title}
            </div>
        </div>
    )
}