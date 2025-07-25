interface Props{
    children: React.ReactNode
}

function Settings({children} : Props){
    return(
        <div className="w-full h-full grid grid-rows-[1fr_3fr] md:grid-rows-none md:grid-cols-[1fr_3fr] gap-8">
            {children}
        </div>
    )
}

function SettingCategory({children} : Props){
    return(
        <div className="w-full h-fit rounded-xl bg-[#181818] flex flex-wrap justify-center p-6">
            <div className="flex flex-col gap-6">
                {children}
            </div>
        </div>
    )
}

function SettingList({children} : Props){
    return(
        <div className="w-full rounded-xl bg-[#181818] p-6">
            {children}
        </div>
    )
}

function SettingHeading({children} : Props){
    return <h1 className="text-3xl text-[#444444] mb-6 font-semibold">{children}</h1>
}

Settings.Category = SettingCategory
Settings.SettingList = SettingList
Settings.Heading = SettingHeading


export default Settings