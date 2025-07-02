"use client";
import Configs from "./components/Configs";
import { useState } from "react";

export default function Home() {

  // INITIAL CONFIGURATIONS
  const [configs, setConfigs] = useState({
    keyNum: 1,
    keyOne: "Z",
    keyTwo: "X",
    selectedMeasurement: "Clicks",
    time: 5,
    clicks: 50,
  })

  function handleConfigs(key: string | number, value: string | number) {
    setConfigs(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  // MAIN PAGE
  return (
    <div className="h-full w-full">
      <div className="w-full py-2 flex items-center justify-center gap-6">
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
      </div>
      
    </div>
  );
}

