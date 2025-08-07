interface Props{
    children: React.ReactNode
    className?: string
}

export default function GridContainer({children, className} : Props){
    return(
        <div className={`w-full grid md:gap-8 min-h-32 ${className}`}>
            {children}
        </div>
    )
}