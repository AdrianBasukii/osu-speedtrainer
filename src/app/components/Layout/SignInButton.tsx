"use client"
import { useState } from "react"
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import { handleSignIn } from "@/app/actions/authAction";

export default function SignInButton({children}:{children: React.ReactNode}){
    const [popupShown, setPopupShown] = useState<boolean>(false)
    
    function handlePopup(){
        setPopupShown(!popupShown)
    }

    return (
        <>
            {popupShown && <SignupPopup onClick={handlePopup}/>}
            <button 
                onClick={handlePopup}
                className="px-4 py-1 border-2 border-[#333333] hover:border-[#555555] rounded-md text-[#444444] 
                 hover:cursor-pointer transition-all">
                    {children}
            </button>
        </>
    )
}

function SignupPopup({onClick} : {onClick: () => void}){

    return(
        <div className="w-full h-full absolute top-0 left-0 z-20 bg-black/50 flex items-center justify-center">
            <div className="w-full max-w-sm bg-[#111111] border-3 border-[#222222] p-6 rounded-lg flex flex-col gap-4">
                <div className="w-full text-[#444444] flex justify-between items-center mb-4">
                    <p className="text-left font-medium"><LoginIcon/> Login</p>
                    <button onClick={onClick} className="hover:cursor-pointer"> <CloseIcon/> </button>
                </div>
                <form action={handleSignIn}>
                    <input type="hidden" name="provider" value="google"/>
                    <button 
                    type="submit"
                    className="w-full text-[#e5e5e5] bg-[#222222] rounded-md flex justify-center gap-4 p-4 hover:cursor-pointer">
                        <GoogleIcon/>
                        Sign in with Google
                    </button>
                </form>
                
            </div>
        </div>
    )
}