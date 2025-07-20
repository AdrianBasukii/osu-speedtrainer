import ProfileContainer from "../components/Profile/ProfileContainer"
import GridContainer from "../components/Profile/GridContainer"
import UserProfile from "../components/Profile/UserProfile"

export default function Profile(){
    return(
        <div className="w-full h-full">
            <ProfileContent />
        </div>
    )
}

function ProfileContent(){
    return(
        <div className="w-full h-full flex flex-col gap-6">

            {/* Statistics */}
            <GridContainer className="grid-cols-[1fr_3fr] ">
                <ProfileContainer>
                    <UserProfile/>
                </ProfileContainer>
                <ProfileContainer>
                    <div>asdasd</div>
                </ProfileContainer>
            </GridContainer>

            {/* Top Scores */}
            <GridContainer>
                <ProfileContainer title={"Personal Best"}>
                    <div>asdasd</div>
                </ProfileContainer>
            </GridContainer>

            {/* Recents */}
            <GridContainer>
                <ProfileContainer title={"Recent Activity"}>
                    <div>asdasd</div>
                </ProfileContainer>
            </GridContainer>
        </div>
    )
}