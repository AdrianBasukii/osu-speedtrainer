"use client"
import { toast } from "react-toastify"

interface ConfigsData{
    keyNum: number
    keyOne: string
    keyTwo: string
    selectedMeasurement: string
    time: number
    clicks: number
}

function Configs({children} : {children: React.ReactNode}){
    return(
        <div className="bg-[#181818] rounded-xl p-4 flex flex-wrap justify-center items-center gap-8">
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
    configData: ConfigsData
    setConfig?: (a: string | number, b: string | number) => void
}

function InputConfig({title, keyVal, status, setConfig, configData} : InputConfigProps){
    const titleTranslation = {
        "Key 1": "keyOne",
        "Key 2": "keyTwo"
    };

    function handleUpdate(val: string){

        const keyVal = val.slice(1).toUpperCase()

        if((title === "Key 1" && configData.keyTwo === keyVal) || (title === "Key 2" && configData.keyOne === keyVal)){
            toast.error('Key 1 and 2 cannot be the same!', {
                toastId: 'key warning',
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }

        if(setConfig){
            setConfig(titleTranslation[title], keyVal)
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

interface ConfigPanelProps{
    setConfig?: (a: string | number, b: string | number) => void
    configsData: ConfigsData
}

function ConfigPanel({setConfig, configsData} : ConfigPanelProps){
    return(
        <>
        <Configs>
            <Configs.OptionsConfig title="Keys" setConfig={setConfig} options={[1, 2]} selected={configsData.keyNum}/>
            <Configs.InputConfig title="Key 1" configData={configsData} setConfig={setConfig} keyVal={configsData.keyOne} status={false}/>
            <Configs.InputConfig title="Key 2" configData={configsData} setConfig={setConfig} keyVal={configsData.keyTwo} status={configsData.keyNum === 1}/>
        </Configs>
        <Configs>
            <Configs.OptionsConfig title="Measurement" setConfig={setConfig} options={["Time", "Clicks"]} selected={configsData.selectedMeasurement}/>
            <Configs.OptionsConfig title="Time" setConfig={setConfig} options={[5,10,15,20]} selected={configsData.time} selectedMeasurement={configsData.selectedMeasurement}/>
            <Configs.OptionsConfig title="Clicks" setConfig={setConfig} options={[50,100,150,200]} selected={configsData.clicks} selectedMeasurement={configsData.selectedMeasurement}/>
        </Configs>
        </> 
    )
}

export default ConfigPanel