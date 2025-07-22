import SignInButton from "./SignInButton"
import LoggedInButton from "./LoggedInButton"
import { auth } from "@/lib/auth"


export default async function UserButton(){
    const session = await auth()

    return(
        <>
            {
            session ? 
            <LoggedInButton>
                {session.user?.name}
            </LoggedInButton> 
            :
            <SignInButton>
                Sign In
            </SignInButton>
            }
        </>
    )
}

