"use server"
import { auth } from "@/lib/auth"
import User from "@/models/User"
import Records from "@/models/Records"

export async function handleUpdateName(currentState: any, formData: FormData){
    const session = await auth()
    const newName = formData.get("name") as string

    if(!newName || newName === ""){
        return {
            success: false,
            message: 'Name is required!',
        }
    }

    if(session && session.user && newName !== session.user.name){
        await User.findOneAndUpdate(
            {_id: session.user.id},
            {
                name: newName
            }
        )

        session.user.name = newName
        return {
            success: true,
            message: 'Username updated successfully!',
        }
    } else{
        return {
            success: false,
            message: 'Name cannot be the same!',
        }
    }
}

export async function handleResetPB({ formData } : {formData: FormData}){

}

export async function handleDeleteAccount({ formData } : {formData: FormData}){

}