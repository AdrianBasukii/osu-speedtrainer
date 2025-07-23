import Link from "next/link"

export default function NotFound(){
    return(
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="font-bold text-6xl mb-4">404 - Error</h1>
            <h2 className="font-medium text-2xl mb-10">Page Not Found</h2>
            <p className="text-[#555555] mb-6">The page you tried to access does not exist...</p>
            <Link href="/" className="py-2 px-4 border-2 border-[#333333] text-[#444444] font-medium rounded-md focus:outline-none hover:cursor-pointer 
                hover:border-[#555555] transition-all">
                    Go home
            </Link>
        </div>
    )
}