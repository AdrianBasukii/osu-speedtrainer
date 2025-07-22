// TO BE CHANGED

export default function Loading() {
  return <LoadingDisplay/>
}

function LoadingDisplay(){
    return (
      <div className="absolute top-0 left-0 z-100 w-screen h-screen bg-black/50 text-white justify-center items-center flex text-3xl font-medium">
        LOADING!...
      </div>
    )
}