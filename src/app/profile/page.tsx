import ProfileContainer from "../components/Profile/ProfileContainer"
import GridContainer from "../components/Profile/GridContainer"
import UserProfile from "../components/Profile/UserProfile"
import Statistic from "../components/Profile/Statistic"
import RecentContainer from "../components/Profile/RecentContainer"

export default function Profile(){
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
                <ProfileContainer className="grid grid-cols-none gap-6 md:gap-0 grid-rows-3 md:grid-rows-none md:grid-cols-3">
                    <Statistic title="Total Tests" content={847} className="text-center md:text-left"/>
                    <Statistic title="Time Trained" content={"9h 26m"} className="text-center md:text-left"/>
                    <Statistic title="Avg Consistency" content={"92%"} className="text-center md:text-left"/>
                </ProfileContainer>
            </GridContainer>

            {/* Top Scores */}
            <GridContainer>
                <ProfileContainer title={"Personal Best"} className="py-12 grid grid-cols-2 gap-6 md:gap-0 grid-rows-2 md:grid-rows-none md:grid-cols-4">
                    <Statistic title="5 seconds" content={"250 BPM"} time={"1 week ago"} className="text-center"/>
                    <Statistic title="10 seconds" content={"234 BPM"} time={"1 week ago"} className="text-center"/>
                    <Statistic title="15 seconds" content={"228 BPM"} time={"1 week ago"} className="text-center"/>
                    <Statistic title="20 seconds" content={"200 BPM"} time={"1 week ago"} className="text-center"/>
                </ProfileContainer>
            </GridContainer>

            {/* Recents */}
            <GridContainer>
                <ProfileContainer title={"Recent Activity"} className="py-6">
                    <RecentContainer/>
                </ProfileContainer>
            </GridContainer>
        </div>
    )
}