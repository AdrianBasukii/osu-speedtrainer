"use client"
import Settings from "@/app/components/Settings/Settings"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSession, SessionProvider } from "next-auth/react"
import { useState, useEffect } from "react"
import { handleTheme } from "@/app/actions/settingAction"
import { useSettingAction } from "@/app/utils/settings/useSettingAction"
import { AnimatePresence, motion } from "motion/react"

export default function PreferencePage(){

    return(
        <SessionProvider>
            <Settings.Heading>Preferences</Settings.Heading>
            <ThemeChange/>
        </SessionProvider>
    )
}

function ThemeChange(){
    const { data: session, update } = useSession()
    const initialColorScheme = session?.user?.colorScheme || "dark";
    const themes = ["dark", "light", "black"]
    type Theme = typeof themes[number]
    const [colorScheme, setColorScheme] = useState<Theme>(initialColorScheme)
    const {
        formAction: updateThemeAction
    } = useSettingAction(
        handleTheme,
        "theme_success",
        "theme_error",
        async () => {
            await update({
                user: {
                    ...session?.user,
                    colorScheme: colorScheme
                }
            }) 
            document.body.classList.remove("dark", "light", "black")
            document.body.classList.add(colorScheme)
        }
    )

    useEffect(() => {
        setColorScheme(initialColorScheme)
    }, [initialColorScheme])

    function handleThemeChange(theme: Theme) {
        setColorScheme(theme);
    }

    return(
        <>
            <Settings.Item className="border-b-2 flex-col gap-6 pb-6 transition-all">
                <Settings.ItemHeading>Theme Selection</Settings.ItemHeading>
                <Settings.TextContainer className="flex-row xl:gap-4 xl:justify-between">
                    {
                        themes.map((theme) => (
                            <ThemeItem 
                                key={theme} 
                                className={theme} 
                                active={colorScheme === theme}
                                onClick={() => handleThemeChange(theme as Theme)}
                            />
                        ))
                    }
                </Settings.TextContainer>

                <AnimatedButtons isVisible={colorScheme !== initialColorScheme}> 
                    <form action={updateThemeAction} className="w-full flex justify-end gap-4 mt-6">
                        <input type="hidden" name="theme" value={colorScheme}/>
                        <button onClick={() => handleThemeChange(initialColorScheme)} className="w-20 py-1 border-2 border-accent-secondary rounded-sm font-medium hover:cursor-pointer">Cancel</button>
                        <button type="submit" className="w-20 py-1 bg-accent-primary rounded-sm font-medium hover:cursor-pointer">Save</button>
                    </form>
                </AnimatedButtons>
                
            </Settings.Item>
        </>
    )
}

function ThemeItem({className, active, onClick} : {className: string, active?: boolean, onClick?: () => void}) {

    const title = className[0].toUpperCase() + className.slice(1)
    return(
        <div onClick={onClick} className={`relative w-full lg:w-48 xl:w-64 aspect-3/2 rounded-lg border-2 border-bg-tertiary ${active && "border-blue-500"} hover:border-blue-500 hover:cursor-pointer transition-all`}>
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

interface ButtonProps{
    children: React.ReactNode
    isVisible: boolean
}

function AnimatedButtons({children, isVisible} : ButtonProps){
    return(
        <AnimatePresence>
            {isVisible &&
            <motion.div
                initial={{ opacity: 0, y: -10}}
                animate={{ opacity: 1, y: 0}}
                transition={{ duration: 0.1}}
                exit={{ opacity: 0, y: -10}}
                
            >
                {children}
            </motion.div>
            }
        </AnimatePresence>
    )
}