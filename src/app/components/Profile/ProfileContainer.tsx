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
        <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4">
            <div className="sm:col-span-6 lg:col-span-8 xl:col-span-9">
                {title && (
                    <h1 className="w-full font-medium text-2xl sm:text-3xl text-accent-secondary break-words">
                        {title}
                    </h1>
                )}
            </div>
            <div className="sm:col-span-6 lg:col-span-4 xl:col-span-3 flex justify-start sm:justify-end gap-2 sm:gap-3 flex-wrap">
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