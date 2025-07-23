import { BarLoader } from "react-spinners"

export default function Loading() {
  return <LoadingDisplay/>
}

function LoadingDisplay(){
    return (
      <div className="w-full h-full flex items-center justify-center">
        <BarLoader
          height={8}
          width={128}
          color="#e5e5e5"
          cssOverride={{
            borderRadius: '20px'
          }}
        />
      </div>
    )
}