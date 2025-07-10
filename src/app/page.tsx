"use client";
import Configs from "./components/Configs";
import AnimatedContainer from "./components/AnimatedContainer";
import KeyButton from "./components/KeyButton";
import MeasurementDisplay from "./components/MeasurementDisplay";
import ResultDisplay from "./components/ResultDisplay";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  
    ///////////////////////////////////////////////
   // INITIAL CONFIGURATIONS /////////////////////
  ///////////////////////////////////////////////

  const [configs, setConfigs] = useState({
    keyNum: 2,
    keyOne: "Z",
    keyTwo: "X",
    selectedMeasurement: "Time",
    time: 5,
    clicks: 50,
  })

  function handleConfigs(key: string | number, value: string | number) {
    setConfigs(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  function ConfigPanel(){
    return(
      <>
        <Configs>
            <Configs.OptionsConfig title="Keys" setConfig={handleConfigs} options={[1, 2]} selected={configs.keyNum}/>
            <Configs.InputConfig title="Key 1" setConfig={handleConfigs} keyVal={configs.keyOne} status={false}/>
            <Configs.InputConfig title="Key 2" setConfig={handleConfigs} keyVal={configs.keyTwo} status={configs.keyNum === 1}/>
        </Configs>
        <Configs>
            <Configs.OptionsConfig title="Measurement" setConfig={handleConfigs} options={["Time", "Clicks"]} selected={configs.selectedMeasurement}/>
            <Configs.OptionsConfig title="Time" setConfig={handleConfigs} options={[5,10,15,20]} selected={configs.time} selectedMeasurement={configs.selectedMeasurement}/>
            <Configs.OptionsConfig title="Clicks" setConfig={handleConfigs} options={[50,100,150,200]} selected={configs.clicks} selectedMeasurement={configs.selectedMeasurement}/>
        </Configs>
      </> 
    )
  }

    ///////////////////////////////////////////////
   // GAME STATE /////////////////////////////////
  ///////////////////////////////////////////////

  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'running' | 'finished'>("idle")

  function handleState(){
    if(gameState === "idle"){
      setGameState("waiting")
    }
    else{
      handleReset()
      setGameState("idle")
    }
  }

    ///////////////////////////////////////////////
   // RUNNING THE TEST ///////////////////////////
  ///////////////////////////////////////////////

  // Button tap animation & counting
  const [buttonColor1, setButtonColor1] = useState<string>("")
  const [buttonColor2, setButtonColor2] = useState<string>("")

  const [count, setCount] = useState<number>(0)
  const countRef = useRef<number>(count);

  // Key updates

  const keyRef = useRef({
    keyOne: configs.keyOne,
    keyTwo: configs.keyTwo,
    keyNum: configs.keyNum
  })

  useEffect(() =>{
    keyRef.current = {
    keyOne: configs.keyOne,
    keyTwo: configs.keyTwo,
    keyNum: configs.keyNum,
  }
  }, [configs.keyOne, configs.keyTwo, configs.keyNum])

  // Keypress detector

  function handleKeyDown(e: KeyboardEvent) {
    
    if (e.repeat) {
      return; 
    }
    if (e.key.toLowerCase() === keyRef.current.keyOne.toLowerCase() && gameStateRef.current === "running" || gameStateRef.current === "waiting") {
      setButtonColor1("border-white");
      setCount(prev => {
        const newCount = prev + 1;
        countRef.current = newCount; 
        if(newCount === 1) setGameState("running")
        return newCount;
      });
    }

    if (e.key.toLowerCase() === keyRef.current.keyTwo.toLowerCase() && keyRef.current.keyNum > 1 && gameStateRef.current === "running" || gameStateRef.current === "waiting") {
      setButtonColor2("border-white");
      setCount(prev => {
        const newCount = prev + 1;
        countRef.current = newCount; 
        if(newCount === 1) setGameState("running")
        return newCount;
      });
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key.toLowerCase() === keyRef.current.keyOne.toLowerCase() && gameStateRef.current === "running") {
      setButtonColor1("");
    }
    if (e.key.toLowerCase() === keyRef.current.keyTwo.toLowerCase() && gameStateRef.current === "running" && keyRef.current.keyNum > 1) {
      setButtonColor2("");
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Updating values

  interface Results {
    BPMList: number[],
    timeList: number[],
    peakBPM: number,
    avgBPM: number,
    totalClicks: number,
    totalTime: number
  }
  const [time, setTime] = useState<number>(0)
  const [BPMList, setBPMList] = useState<number[]>([])
  const [result, setResult] = useState<Results>({
    BPMList: [],
    timeList: [],
    peakBPM: 0,
    avgBPM: 0,
    totalClicks: 0,
    totalTime: 0
  })
  const gameStateRef = useRef(gameState)

  type BpmPerTimeType = {
    [key: number]: number;
  };
  const[bpmPerTime, setBpmPerTime] = useState<BpmPerTimeType>({})
  const bpmPerTimeRef = useRef(bpmPerTime)

  useEffect(() => {
    bpmPerTimeRef.current = bpmPerTime
  }, [bpmPerTime])

  function handleReset(){
    setCount(0)
    countRef.current = 0
    setBPMList([])
    setBpmPerTime({})
    setResult({
      BPMList: [],
      timeList: [],
      peakBPM: 0,
      avgBPM: 0,
      totalClicks: 0,
      totalTime: 0
    })
  }

  function timeMeasurement(){
    setTime(configs.time)
    handleReset()

    const interval = setInterval(() => {
      setTime(prev => {
        setBPMList(prevList => [...prevList, ((countRef.current*(60/Math.abs(prev-configs.time + 0.01)))/(2*configs.keyNum))])

        setBpmPerTime(prevbpmPerTime => ({
          ...prevbpmPerTime,
          [Math.abs(prev-configs.time)] : ((countRef.current*(60/Math.abs(prev-configs.time + 0.01)))/(2*configs.keyNum))
        }))

        if(prev <= 0){

          let tl = Object.keys(bpmPerTimeRef.current).map(Number).filter((key, index) => key >= 0.98 && key <= configs.time && Number.isInteger(parseFloat(key.toFixed(2))))
          const bl = tl.map((key, index) => bpmPerTimeRef.current[key])
          tl = tl.map((key, index) => parseFloat(key.toFixed(1)))

          setResult({
            BPMList: bl,
            timeList: tl,
            peakBPM: Math.round(Math.max(...bl)),
            avgBPM: (countRef.current*(60/configs.time))/(2*configs.keyNum),
            totalClicks: countRef.current,
            totalTime: configs.time
          })
          setGameState("finished")
          clearInterval(interval)
          return 0
        }
        if(gameStateRef.current === "idle"){
          clearInterval(interval)
          return 0
        }
        return prev - 0.1
      })
    }, 100)
  }

  function clickMeasurement(){
    setTime(0)
    handleReset()

    const interval = setInterval(() => {
      setTime(prev => {
        setBPMList(prevList => [...prevList, ((countRef.current*(60/Math.abs(prev + 0.001)))/(2*configs.keyNum))])

        setBpmPerTime(prevbpmPerTime => ({
          ...prevbpmPerTime,
          [Math.abs(prev + 0.001)] : ((countRef.current*(60/Math.abs(prev + 0.001)))/(2*configs.keyNum))
        }))

        if(countRef.current === configs.clicks){

          let tl = Object.keys(bpmPerTimeRef.current).map(Number).filter((key, index) => key >= 0.98 && Number.isInteger(parseFloat(key.toFixed(2))))
          const bl = tl.map((key, index) => bpmPerTimeRef.current[key])
          tl = tl.map((key, index) => parseFloat(key.toFixed(1)))

          setResult({
            BPMList: bl,
            timeList: tl,
            peakBPM: Math.round(Math.max(...bl)),
            avgBPM: parseFloat(((countRef.current*(60/prev))/(2*configs.keyNum)).toFixed(0)),
            totalClicks: countRef.current,
            totalTime: parseFloat(prev.toFixed(2))
          })
          setGameState("finished")
          clearInterval(interval)
          return 0
        }
        if(gameStateRef.current === "idle"){
          clearInterval(interval)
          return 0
        }
        return prev + 0.1
      })
    }, 100)
  }

  useEffect(() => {
    gameStateRef.current = gameState
    setButtonColor1("")
    setButtonColor2("")

    if(gameStateRef.current === "running" && configs.selectedMeasurement === "Time"){
      timeMeasurement()
    }

    if(gameStateRef.current === "running" && configs.selectedMeasurement === "Clicks"){
      clickMeasurement()
    }

  }, [gameState])

  // MAIN PAGE
  return (
    <div className="h-full w-full flex flex-col flex-wrap gap-6 relative">
      {/* Menu/Measurement/Result */}
      <div className="w-full min-h-32 relative">
        <AnimatedContainer gameState={"idle"} currGameState={gameState} className="absolute w-full h-full flex items-center justify-center gap-6 scale-80">
          <ConfigPanel/>
        </AnimatedContainer>
        <AnimatedContainer gameState={"waiting"} currGameState={gameState} className="absolute w-full h-full flex items-center justify-center gap-12">
          <h1 className="text-3xl font-semibold">Click to start</h1>
        </AnimatedContainer>
        <AnimatedContainer gameState={"running"} currGameState={gameState} className="absolute w-full h-full flex items-center justify-center gap-12">
          <MeasurementDisplay title={"BPM"} measurement={BPMList.length > 0 ? Math.round(BPMList[BPMList.length - 1]) : "—"}/>
          <MeasurementDisplay title={"Time"} measurement={`${time.toFixed(1)}s`}/>
          {configs.selectedMeasurement === "Clicks" && <MeasurementDisplay title={"Clicks"} measurement={count}/>}
        </AnimatedContainer>
        <AnimatedContainer gameState={"finished"} currGameState={gameState} className="w-full h-full flex items-center justify-center">
          <ResultDisplay results={result}/>
        </AnimatedContainer>
      </div>

      {/* Tap button display */}
      {gameState !== "finished" &&
        <div className="h-64 flex items-center justify-center gap-12">
          <KeyButton text={configs.keyOne} buttonPressClass={buttonColor1}/>
          {configs.keyNum === 2 && <KeyButton text={configs.keyTwo} buttonPressClass={buttonColor2}/>}
        </div>
      }

      {/* Start/restart button */}
      <div className="w-96 h-48 flex items-center justify-center absolute bottom-40 left-0 right-0 mx-auto">
        <button onClick={() => handleState()} className="font-semibold text-2xl hover:cursor-pointer">
          {gameState === "idle" && "Start"}
          {gameState !== "idle" && "↻"}
        </button>
      </div>

    </div>
  );
}

