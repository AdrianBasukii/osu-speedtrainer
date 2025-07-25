import Category from "@/app/components/Settings/Category"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TuneIcon from '@mui/icons-material/Tune';

export default function Default(){
    return(
        <>
            <Category href="/settings/account">
                <PermIdentityIcon/>
                Account Settings
            </Category>
            <Category href="/settings/preferences">
                <TuneIcon/>
                Preferences
            </Category>
        </>
    )
}