"use server"
import { signIn, signOut } from "@/lib/auth"
import { disconnectDB } from "@/lib/db"

export async function handleSignIn(formData: FormData){
    const provider = formData.get("provider") as string
    await signIn(provider)
}

export async function handleSignOut(){
    disconnectDB()
    await signOut({redirectTo: '/'})
}