import UserLogo from "./UserLogo"
import { format } from "date-fns"

interface Props{
    username: string
    joindate: Date
}

export default function UserProfile({username, joindate} : Props){
    return(
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 py-6 md:py-4">
            <UserLogo/>
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-medium text-center">{username}</h1>
                <h1 className="text-xs md:text-sm text-accent-secondary font-medium">
                    Joined {format(joindate, 'dd MMM yyyy')}
                </h1>
            </div>
        </div>
    )
}