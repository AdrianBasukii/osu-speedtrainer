interface Props{
    title: string
    content: string | number | undefined
    time?: string
    className?: string
}

export default function Statistic({title, content, time, className} : Props){
    return(
        <div className={`w-full h-full flex items-center justify-center`}>
            <div className={`flex flex-col gap-3 ${className}`}>
                <p className="text-[#444444] font-medium">{title}</p>
                <h1 className="text-3xl font-medium">{content ? content : "-"}</h1>
                <p className="text-[#333333] font-medium">{time ? time : ""}</p>
            </div>
        </div>
    )
}