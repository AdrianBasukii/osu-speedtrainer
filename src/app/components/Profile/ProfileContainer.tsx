interface Props{
    children: React.ReactNode
    className?: string
    title?: string
}

export default function ProfileContainer({children, className, title} : Props){
    return(
        <div className="w-full h-full bg-[#181818] rounded-md py-4 px-6 flex flex-col">
            {title && <h1 className="w-full font-medium text-3xl text-[#444444]">{title}</h1>}
            <div className={`w-full h-full ${className}`}>
                {children}
            </div>
        </div>
    )
}