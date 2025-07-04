"use client"

function Configs({children} : {children: React.ReactNode}){
    return(
        <div className="bg-[#181818] rounded-xl p-4 flex gap-8">
            {children}
        </div>
    )
}

function ConfigContainer({title, children} : {title: string, children: React.ReactNode}){
    return(
        <div className="flex flex-col gap-2">
            <h1 className="text-[#444444] font-medium cursor-default">{title}</h1>
            {children}
        </div>
    )
}

interface InputConfigProps{
    title: "Key 1" | "Key 2"
    keyVal: string
    status: boolean
    setConfig?: (a: string | number, b: string | number) => void
}

function InputConfig({title, keyVal, status, setConfig} : InputConfigProps){
    const titleTranslation = {
        "Key 1": "keyOne",
        "Key 2": "keyTwo"
    };

    function handleUpdate(val: string){
        if(setConfig){
            setConfig(titleTranslation[title], val.slice(1).toUpperCase())
        }
    }

    return(
        <ConfigContainer title={title}>
            <input 
            className="bg-[#222222] rounded-md w-14 h-14 font-semibold text-xl text-center focus:outline-0 focus:border-2 
                        border-[#444444] focus:animation-pulse caret-transparent hover:cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
            type="text" 
            value={keyVal} 
            onChange={(e) => handleUpdate(e.target.value)}
            disabled={status}/>
        </ConfigContainer>
    )
}

interface OptionsConfigProps{
    title: "Time" | "Clicks" | "Measurement" | "Keys"
    selectedMeasurement?: string
    selected: number | string
    options: Array<number | string>
    setConfig?: (a: string | number, b: string | number) => void
}


function OptionsConfig({title, options, selected, selectedMeasurement, setConfig} : OptionsConfigProps){
    let disabledVal = false
    if(selectedMeasurement){
        disabledVal = selectedMeasurement !== title
    }

    const titleTranslation = {
        Time: "time",
        Clicks: "clicks",
        Measurement: "selectedMeasurement",
        Keys: "keyNum",
    };

    return(
        <ConfigContainer title={title}>
            <div className={`flex gap-2 p-2 bg-[#222222] rounded-md ${disabledVal ? "opacity-25 cursor-not-allowed" : ""}`}>
                {options.map((option, index) => (
                    <button 
                    className={`px-2 min-w-10 h-10 rounded-md text-[#656565] font-medium
                                ${!disabledVal ? "hover:bg-[#191919] cursor-pointer" : "cursor-not-allowed"}
                                ${option === selected ? "bg-[#181818] text-[#e5e5e5]" : ""}`
                    } 
                    key={index}
                    onClick={setConfig ? () => setConfig(titleTranslation[title], option) : ()=>{}}
                    disabled={disabledVal}>
                        {option}
                    </button>
                ))}
            </div>
        </ConfigContainer>
    )
}

Configs.InputConfig = InputConfig
Configs.OptionsConfig = OptionsConfig

export default Configs