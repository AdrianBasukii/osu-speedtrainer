"use client"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import ProfileContainer from "./ProfileContainer"
import Statistic from "./Statistic"
import ProfileDropdown from "./ProfileDropdown"
import { personalBestType, bestKeyData } from "@/app/types"

export default function PersonalBest({personalBestData}:{personalBestData: personalBestType}){

    const [measurement, setMeasurement] = useState<string>("Time")
    const [keyNumber, setKeyNumber] = useState<string>("1 Key")

    const normalizedKey: keyof personalBestType = keyNumber.replace(/\s/g, '').toLowerCase() as keyof personalBestType
    const normalizedMeasurement : keyof bestKeyData = measurement.toLowerCase() as keyof bestKeyData

    const selectedData = personalBestData?.[normalizedKey]?.[normalizedMeasurement] || {}

    function handleMeasurement(value: string){
        if(value)
        setMeasurement(value)
    }

    function handleKeyNumber(value: string){
        setKeyNumber(value)
    }

    return(
        <>
            <ProfileContainer.Heading title={"Personal Best"}>
                <ProfileDropdown value={measurement} onClick={handleMeasurement} options={["Time", "Clicks"]}/>
                <ProfileDropdown value={keyNumber} onClick={handleKeyNumber} options={["1 Key", "2 Key"]}/>
            </ProfileContainer.Heading>

            <ProfileContainer.Content className="py-12 grid grid-cols-2 gap-6 md:gap-0 grid-rows-2 md:grid-rows-none md:grid-cols-4">
                {
                    Object.entries(selectedData).map((data, key) => (
                        <Statistic 
                        className="text-center"
                        key={key} 
                        title={measurement === "Time" ? 
                            `${data[0].replace('s', '')} seconds` :
                            `${data[0]} clicks` }
                        
                        content={data[1].bpmValue ? `${data[1].bpmValue} BPM` : "-"}
                        time={data[1].setAt ? `${formatDistanceToNow(data[1].setAt)} ago` : ""}
                        />
                    )
                    )
                }
            </ProfileContainer.Content>
        </>
    )
}