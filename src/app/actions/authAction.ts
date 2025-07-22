"use server"
import { redirect } from "next/navigation"
import { signIn, signOut } from "@/lib/auth"

export async function handleSignIn(formData: FormData){
    const provider = formData.get("provider") as string
    await signIn(provider)
}

export async function handleSignOut(){
    await signOut({redirectTo: '/'})
}