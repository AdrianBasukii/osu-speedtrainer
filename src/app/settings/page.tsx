import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"

export default async function Settings(){
    const session = await auth()
    
    if(!session){
        notFound()
    }

    return(
        <div>
            seting masi kosong
        </div>
    )
}