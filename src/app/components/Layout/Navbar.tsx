import Link from 'next/link';
import UserButton from './UserButton';

export default function Navbar(){
    return(
        <div className="w-full px-6 py-8 flex items-center justify-between">
            <Link href="/">
                <button className="font-semibold text-3xl select-none hover:cursor-pointer">SpeedTrainer</button>
            </Link>
            <UserButton/>
        </div>
    )
}