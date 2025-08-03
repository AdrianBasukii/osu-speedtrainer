export default function KeyButton({text, buttonPressClass} : {text: string, buttonPressClass: string}){
    return(
        <div className={`flex items-center justify-center w-32 h-32 bg-bg-secondary border-3 border-bg-tertiary rounded-xl text-4xl font-bold ${buttonPressClass}`}>
            {text}
        </div>
    )
}