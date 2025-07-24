"use server"
import { auth, signIn, signOut } from "@/lib/auth"
import { disconnectDB } from "@/lib/db"
import Recents from "@/models/Recents"
import Records from "@/models/Records"
import { Results } from "../types"
import { recordStats } from "motion"

export async function handleSignIn(formData: FormData){
    const provider = formData.get("provider") as string
    await signIn(provider)
}

export async function handleSignOut(){
    disconnectDB()
    await signOut({redirectTo: '/'})
}

export async function handleSubmitActivity(resultData: Results){
    const session = await auth()
    if(!session || !session.user){
        return
    }

    await Recents.create({
        userID: session.user.id,
        setDate: Date.now(),
        mode: resultData.mode,
        duration: resultData.totalTime,
        clicks: resultData.totalClicks,
        bpm: resultData.avgBPM,
        consistency: resultData.consistency
    })

    await Records.findOneAndUpdate(
        {userID: session.user.id},
        {
            $inc:{
                'statistics.TimeTrained': resultData.totalTime,
                'statistics.TotalTests': 1,
                'statistics.TotalConsistency': resultData.consistency
            }
        },
        {new: true}
    )

    return({
        message: "Successfully uploaded data"
    })
}