interface Props{
    children?: React.ReactNode
    className?: string
    title?: string
}

function ProfileContainer({children} : Props){
    return(
        <div className="w-full h-full bg-[#181818] rounded-md py-4 px-6 flex flex-col">
            {children}
        </div>
    )
}

function ProfileHeading({children, title} : Props){
    return(
        <div className="grid grid-cols-2">
            <div>
                {title && <h1 className="w-full font-medium text-3xl text-[#444444]">{title}</h1>}
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

interface SelectProps{
    options: string[]
    onChange: (value: string) => void
}

function ProfileSelect({options, onChange} : SelectProps){
    return (
    <select 
    onChange={(e) => onChange(e.target.value)}
    className="min-w-24 px-2 border-2 border-[#333333] text-[#444444] rounded-md focus:outline-none hover:cursor-pointer">
        {options.map((option, key) => (
            <option 
            key={key} 
            value={option}
            className="bg-[#181818]">
                {option}
            </option>
        )
        )}
    </select>
)

}


ProfileContainer.Heading = ProfileHeading
ProfileContainer.Content = ProfileContent
ProfileContainer.Select = ProfileSelect
export default ProfileContainer