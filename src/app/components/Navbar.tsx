import Link from 'next/link';

export default function Navbar(){
    return(
        <div className="w-full px-6 py-8 flex items-center justify-between">
            <Link href="/">
                <button className="font-semibold text-3xl select-none hover:cursor-pointer">SpeedTrainer</button>
            </Link>
            <button className="px-4 py-1 border-2 border-[#333333] hover:border-[#e5e5e5] rounded-md text-[#444444] hover:text-[#e5e5e5] hover:cursor-pointer transition-all">Sign In</button>
        </div>
    )
}