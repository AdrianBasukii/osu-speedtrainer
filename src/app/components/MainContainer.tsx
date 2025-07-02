import Navbar from "./Navbar"

export default function MainContainer({children} : {children: React.ReactNode}){
    return(
        <div className="max-w-7xl m-auto h-screen flex flex-col">
            <Navbar/>
            <div className="grow p-6">
                {children}
            </div>
            
        </div>
    )
}