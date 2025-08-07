interface Props{
    children?: React.ReactNode
    className?: string
    title?: string
}

function ProfileContainer({children, className} : Props){
    return(
        <div className={`w-full h-full bg-bg-secondary py-4 px-6 flex flex-col ${className}`}>
            {children}
        </div>
    )
}

function ProfileHeading({children, title} : Props){
    return(
        <div className="grid grid-cols-2">
            <div>
                {title && <h1 className="w-full font-medium text-3xl text-accent-secondary">{title}</h1>}
            </div>
            <div className="w-full flex justify-end gap-3">
                {children}
            </div>
        </div>
    )
}

function ProfileContent({children, className} : Props){
    return(
        <div className="w-full h-full">
            <div className={`w-full h-full ${className}`}>
                {children}
            </div>
        </div>
    )
}


ProfileContainer.Heading = ProfileHeading
ProfileContainer.Content = ProfileContent

export default ProfileContainer