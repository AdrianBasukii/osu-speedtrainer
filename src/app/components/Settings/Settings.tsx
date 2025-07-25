import Link from "next/link"

interface Props{
    children: React.ReactNode
}

function Settings({children} : Props){
    return(
        <div className="w-full grid grid-rows-[1fr_3fr] md:grid-rows-none md:grid-cols-[1fr_3fr] gap-8">
            {children}
        </div>
    )
}

function SettingCategory({children} : Props){
    return(
        <div className="w-full h-full rounded-xl bg-[#181818] flex justify-center p-6">
            <div className="flex flex-col gap-6">
                {children}
            </div>
        </div>
    )
}

function SettingList({children} : Props){
    return(
        <div className="w-full h-full rounded-xl bg-[#181818]">
            {children}
        </div>
    )
}

Settings.Category = SettingCategory
Settings.SettingList = SettingList


export default Settings