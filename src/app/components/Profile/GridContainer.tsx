interface Props{
    children: React.ReactNode
    className?: string
}

export default function ProfileContainer({children, className} : Props){
    return(
        <div className={`w-full grid gap-6 ${className}`}>
            {children}
        </div>
    )
}