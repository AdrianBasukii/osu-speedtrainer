import ProfileContainer from "../components/Profile/ProfileContainer"
import GridContainer from "../components/Profile/GridContainer"
import UserProfile from "../components/Profile/UserProfile"
import Statistic from "../components/Profile/Statistic"
import RecentContainer from "../components/Profile/RecentContainer"
import PersonalBest from "../components/Profile/PersonalBest"
import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"
import User from "@/models/User"
import Records from "@/models/Records"
import Recents from "@/models/Recents"
import { personalBestType } from "../types"
import { intervalToDuration } from "date-fns"

export default function Profile(){
    
    return(
        <div className="w-full h-full">
            <ProfileContent />
        </div>
    )
}

async function ProfileContent(){
    const session = await auth()

    if(!session || !session.user){
        notFound()
    }

    const userData = await User.findOne({email: session.user.email})
    const userProfileData = await Records.findOne({userID: session.user.id})

    const personalBestData: personalBestType = {
        '1key': JSON.parse(JSON.stringify(userProfileData['1key'])),
        '2key': JSON.parse(JSON.stringify(userProfileData['2key']))
    }

    const recentActivity = await Recents.find({userID: session.user.id}).sort({setDate: -1})

    const timeTrainedData = userProfileData.statistics.TimeTrained
    let timeTrained:string = `${timeTrainedData}s`

    if(timeTrainedData > 3600){
        const { hours, minutes } = intervalToDuration({start:0, end:timeTrainedData*1000})
        timeTrained = `${hours}h ${minutes}m`
    }
    else if(timeTrainedData > 60){
        const { minutes, seconds } = intervalToDuration({start:0, end:timeTrainedData*1000})
        timeTrained = `${minutes}m ${seconds}s`
    }

    const consistency = userProfileData.statistics.TotalConsistency/userProfileData.statistics.TotalTests

    return(
        <div className="w-full h-full flex flex-col gap-8">

            {/* Statistics */}
            <GridContainer className="grid-cols-1 md:grid-cols-[4fr_9fr]">
                <ProfileContainer className="rounded-t-md md:rounded-md">
                    <UserProfile username={userData?.name} joindate={userData?.joindate}/>
                </ProfileContainer>
                <ProfileContainer className="rounded-b-md md:rounded-md">
                    <ProfileContainer.Content className="grid grid-cols-1 gap-0 md:gap-0 md:grid-cols-3 divide-y divide-accent-secondary/20 md:divide-y-0">
                        <Statistic title="Total Tests" content={userProfileData.statistics.TotalTests} className="text-center"/>
                        <Statistic title="Time Trained" content={timeTrained} className="text-center"/>
                        <Statistic title="Avg Consistency" content={`${consistency ? consistency.toFixed(2) : 0}%`} className="text-center"/>
                    </ProfileContainer.Content>
                </ProfileContainer>
            </GridContainer>

            {/* Top Scores */}
            <GridContainer>
                <ProfileContainer className="rounded-md">
                    {personalBestData && <PersonalBest personalBestData={personalBestData}/>}
                </ProfileContainer>
            </GridContainer>

            {/* Recents */}
            <GridContainer>
                <ProfileContainer className="rounded-md">
                    <ProfileContainer.Heading title={"Recent Activity"} />
                    <ProfileContainer.Content className="py-6">
                        <RecentContainer recentActivity={JSON.parse(JSON.stringify(recentActivity))}/>
                    </ProfileContainer.Content>
                </ProfileContainer>
            </GridContainer>
        </div>
    )
}