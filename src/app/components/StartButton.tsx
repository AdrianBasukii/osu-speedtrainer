interface Props{
    gameState: string
    handleState: () => void
}

export default function StartButton({gameState, handleState} : Props){
    return(
        <div className="w-full h-48 flex items-center justify-center mx-auto">
          <button onClick={() => handleState()} className="font-semibold text-2xl hover:cursor-pointer">
            {gameState === "idle" && "Start"}
            {gameState !== "idle" && "↻"}
          </button>
        </div>
    )
}