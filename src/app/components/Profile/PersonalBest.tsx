"use client"
import { useState } from "react"
import ProfileContainer from "./ProfileContainer"
import Statistic from "./Statistic"
import ProfileDropdown from "./ProfileDropdown"

export default function PersonalBest(){

    const [measurement, setMeasurement] = useState<string>("Time")
    const [keyNumber, setKeyNumber] = useState<string>("1 Key")

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
                <Statistic title="5 seconds" content={undefined} time={undefined} className="text-center"/>
                <Statistic title="10 seconds" content={"234 BPM"} time={"1 week ago"} className="text-center"/>
                <Statistic title="15 seconds" content={"228 BPM"} time={"1 week ago"} className="text-center"/>
                <Statistic title="20 seconds" content={"200 BPM"} time={"1 week ago"} className="text-center"/>
            </ProfileContainer.Content>
        </>
    )
}