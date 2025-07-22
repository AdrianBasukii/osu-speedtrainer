import ProfileContainer from "../components/Profile/ProfileContainer"
import GridContainer from "../components/Profile/GridContainer"
import UserProfile from "../components/Profile/UserProfile"
import Statistic from "../components/Profile/Statistic"
import RecentContainer from "../components/Profile/RecentContainer"
import PersonalBest from "../components/Profile/PersonalBest"
import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"

export default async function Profile(){
    const session = await auth()

    if(!session){
        notFound()
    }
    
    return(
        <div className="w-full h-full">
            <ProfileContent />
        </div>
    )
}

function ProfileContent(){
    return(
        <div className="w-full h-full flex flex-col gap-8">

            {/* Statistics */}
            <GridContainer className="grid-cols-2 md:grid-cols-[4fr_9fr]">
                <ProfileContainer>
                    <UserProfile/>
                </ProfileContainer>
                <ProfileContainer>
                    <ProfileContainer.Content className="grid grid-cols-none gap-6 md:gap-0 grid-rows-3 md:grid-rows-none md:grid-cols-3">
                        <Statistic title="Total Tests" content={847} className="text-center md:text-left"/>
                        <Statistic title="Time Trained" content={"9h 26m"} className="text-center md:text-left"/>
                        <Statistic title="Avg Consistency" content={"92%"} className="text-center md:text-left"/>
                    </ProfileContainer.Content>
                </ProfileContainer>
            </GridContainer>

            {/* Top Scores */}
            <GridContainer>
                <ProfileContainer>
                    <PersonalBest/>
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