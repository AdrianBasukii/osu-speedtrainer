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
          color="var(--color-text-primary)"
          cssOverride={{
            borderRadius: '20px'
          }}
        />
      </div>
    )
}