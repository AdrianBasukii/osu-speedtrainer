"use server"
import { auth, signOut } from "@/lib/auth"
import { disconnectDB } from "@/lib/db"
import User from "@/models/User"
import Records from "@/models/Records"

type prevState = {
  success: boolean
  message: string
} | null

export async function handleUpdateName(_prevState: prevState, formData: FormData){
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

const defaultBpm = {
    bpmValue: 0,
    setAt: undefined
}
const defaultTime = {
    '5s': defaultBpm,
    '10s': defaultBpm,
    '15s': defaultBpm,
    '20s': defaultBpm
}
const defaultClicks = {
    '50': defaultBpm,
    '100': defaultBpm,
    '150': defaultBpm,
    '200': defaultBpm
}
const defaultValues = {
    time: defaultTime,
    clicks: defaultClicks
}

export async function handleResetPB(_prevState: prevState, formData: FormData){
    const session = await auth()
    const confirmation = formData.get("confirm") as string

    if(confirmation === "" || confirmation !== "confirm"){
        return {
            success: false,
            message: (confirmation === "") ? "Please type Confirm in the input box!" : "Please recheck your spelling!"
        }
    }

    if(session && session.user){
        await Records.findOneAndUpdate(
            {userID: session.user.id},
            {
                $set:{
                    '1key': defaultValues,
                    '2key': defaultValues
                }
            }
        )

        return {
            success: true,
            message: 'Personal bests reset successfully!',
        }
    }

    return {
        success: false,
        message: 'User not logged in!',
    }
}

export async function handleDeleteAccount(_prevState: prevState, formData: FormData){
    const session = await auth()
    const email = formData.get("yourEmail") as string

    if(!session || !session.user){
        return{
            success: false,
            message: "User not logged in"
        }
    }

    if(email === "" || email !== session.user.email){
        return{
            success: false,
            message: "Emails do not match!"
        }
    } else{
        await User.findByIdAndDelete(session.user.id)
        await Records.findOneAndDelete({userID: session.user.id})
        disconnectDB()
        await signOut({redirectTo: '/'})
        return{
            success: true,
            message: "Account Deleted!"
        }
    }
}