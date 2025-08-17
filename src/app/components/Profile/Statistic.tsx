interface Props{
    title: string
    content: string | number | undefined
    time?: string | undefined
    className?: string
}

export default function Statistic({title, content, time, className} : Props){
    return(
        <div className="w-full h-full flex items-center justify-center py-4 md:py-6">
            <div className={`flex flex-col gap-2 md:gap-3 ${className}`}>
                <p className="text-accent-secondary font-medium text-sm md:text-base">{title}</p>
                <h1 className="text-2xl md:text-3xl font-medium">{content ? content : "-"}</h1>
                {time && <p className="text-xs md:text-sm text-accent-secondary font-medium">{time}</p>}
            </div>
        </div>
    )
}