"use client"
import { toast } from "react-toastify"


type toastType = 'success' | 'error' | 'warning'

export function toastFunc(toastType: toastType, message: string, id?: string, duration?: number){
    if(toastType === "success"){
        toast.success(message, {
            toastId: id,
            position: "bottom-right",
            autoClose: duration || 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }
    
    if(toastType === "error"){
        toast.error(message, {
            toastId: id,
            position: "bottom-right",
            autoClose: duration || 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    if(toastType === "warning"){
        toast.warning(message, {
            toastId: id,
            position: "bottom-right",
            autoClose: duration || 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    
}