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
import { personalBestType } from "../types"

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

    return(
        <div className="w-full h-full flex flex-col gap-8">

            {/* Statistics */}
            <GridContainer className="grid-cols-2 md:grid-cols-[4fr_9fr]">
                <ProfileContainer>
                    <UserProfile username={userData?.name} joindate={userData?.joindate}/>
                </ProfileContainer>
                <ProfileContainer>
                    <ProfileContainer.Content className="grid grid-cols-none gap-6 md:gap-0 grid-rows-3 md:grid-rows-none md:grid-cols-3">
                        <Statistic title="Total Tests" content={userProfileData.statistics.TotalTests} className="text-center md:text-left"/>
                        <Statistic title="Time Trained" content={userProfileData.statistics.TimeTrained} className="text-center md:text-left"/>
                        <Statistic title="Avg Consistency" content={userProfileData.statistics.TotalTests} className="text-center md:text-left"/>
                    </ProfileContainer.Content>
                </ProfileContainer>
            </GridContainer>

            {/* Top Scores */}
            <GridContainer>
                <ProfileContainer>
                    {personalBestData && <PersonalBest personalBestData={personalBestData}/>}
                </ProfileContainer>
            </GridContainer>

            {/* Recents */}
            <GridContainer>
                <ProfileContainer>
                    <ProfileContainer.Heading title={"Recent Activity"} />
                    <ProfileContainer.Content className="py-6">
                        <RecentContainer/>
                    </ProfileContainer.Content>
                </ProfileContainer>
            </GridContainer>
        </div>
    )
}