export default function Navbar(){
    return(
        <div className="w-full px-6 py-8 flex items-center justify-between">
            <h1 className="font-semibold text-3xl select-none">SpeedTrainer</h1>
            <button className="px-4 py-1 border-2 border-[#333333] hover:border-[#e5e5e5] rounded-md text-[#444444] hover:text-[#e5e5e5] hover:cursor-pointer transition-all">Sign In</button>
        </div>
    )
}