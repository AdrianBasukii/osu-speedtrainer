"use client"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserLogo(){
    return(
        <div className="w-full md:w-auto lg:h-full flex justify-center items-center">
            <AccountCircleIcon sx={{ fontSize: 60, color:'#333333' }} />
        </div>
    )
}