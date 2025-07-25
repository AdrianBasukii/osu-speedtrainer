import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"
import Settings from "@/app/components/Settings/Settings"
import React from "react"

export default async function SettingsLayout({category, settingitems} : {category: React.ReactNode, settingitems: React.ReactNode}){
    const session = await auth()
        
    if(!session){
        notFound()
    }

    return(
        <Settings>
            <Settings.Category>{category}</Settings.Category>
            <Settings.SettingList>{settingitems}</Settings.SettingList>
        </Settings>
    )
}