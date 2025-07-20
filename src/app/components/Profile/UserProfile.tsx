import UserLogo from "./UserLogo"

export default function UserProfile(){
    return(
        <div className="w-full h-full flex flex-wrap md:gap-3 justify-center items-center">
            <UserLogo/>
            <div className="lg:h-full flex flex-col justify-center items-center lg:items-start gap-3">
                <h1 className="text-3xl font-medium" >Qrome</h1>
                <h1 className="text-sm text-[#444444] font-medium">Joined 04 Mar 2025</h1>
            </div>
        </div>
    )
}