import Settings from "@/app/components/Settings/Settings"

export default function AccountPage(){
    return(
        <>
            <Settings.Heading>Account</Settings.Heading>
            <Settings.Item>
                <Settings.TextContainer>
                    <Settings.ItemHeading>Change your username</Settings.ItemHeading>
                    <Settings.ItemDesc>Choose a new username that fits you.</Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button>Change</Settings.Button>
            </Settings.Item>

            <Settings.Item>
                <Settings.TextContainer>
                    <Settings.ItemHeading>Change your username</Settings.ItemHeading>
                    <Settings.ItemDesc>Choose a new username that fits you.</Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button>Change</Settings.Button>
            </Settings.Item>

            <Settings.Item className="border-b-2">
                <Settings.TextContainer>
                    <Settings.ItemHeading>Delete your account</Settings.ItemHeading>
                    <Settings.ItemDesc>Delete your account. <span className="text-red-900">You can’t undo this action!</span></Settings.ItemDesc>
                </Settings.TextContainer>
                <Settings.Button className="text-red-900">Delete</Settings.Button>
            </Settings.Item>
        </>
    )
}