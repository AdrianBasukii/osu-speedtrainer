"use server"
import { auth, signIn, signOut } from "@/lib/auth"
import { disconnectDB } from "@/lib/db"
import Recents from "@/models/Recents"
import Records from "@/models/Records"
import { Results } from "../types"

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

    console.log(resultData)

    await Recents.create({
        userID: session.user.id,
        setDate: Date.now(),
        mode: resultData.mode,
        duration: resultData.totalTime,
        clicks: resultData.totalClicks,
        bpm: resultData.avgBPM,
        consistency: resultData.consistency
    })

    const key = resultData.mode.replace(/\s/g, '').toLowerCase()
    const measurement = resultData.measurement.toLowerCase()
    let measurementData : string

    if(measurement === 'time'){
        measurementData = `${resultData.totalTime}s`
    } else{
        measurementData = `${Math.floor(resultData.totalClicks/10) * 10}`
    }

    const userRecord = await Records.findOne({userID: session.user.id})
    let updatedRecord = {}

    if(resultData.avgBPM > userRecord[key][measurement][measurementData].bpmValue) {
        updatedRecord = {
            bpmValue: resultData.avgBPM,
            setAt: Date.now()
        }
    }

    await Records.findOneAndUpdate(
        {userID: session.user.id},
        {
            $inc:{
                'statistics.TimeTrained': resultData.totalTime,
                'statistics.TotalTests': 1,
                'statistics.TotalConsistency': resultData.consistency
            },
            $set:{
                [`${key}.${measurement}.${measurementData}`]: updatedRecord
            } 
        },
        {new: true}
    )

    return({
        message: "Successfully uploaded data"
    })
}