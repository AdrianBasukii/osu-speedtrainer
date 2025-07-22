import UserLogo from "./UserLogo"
import { format } from "date-fns"

interface Props{
    username: string
    joindate: Date
}

export default function UserProfile({username, joindate} : Props){
    return(
        <div className="w-full h-full flex flex-wrap md:gap-3 justify-center items-center">
            <UserLogo/>
            <div className="lg:h-full flex flex-col justify-center items-center lg:items-start gap-3">
                <h1 className="text-3xl font-medium" >{username}</h1>
                <h1 className="text-sm text-[#444444] font-medium">Joined {format(joindate, 'dd MMM yyyy')}</h1>
            </div>
        </div>
    )
}