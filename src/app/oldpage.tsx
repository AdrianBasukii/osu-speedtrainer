"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [color, setColor] = useState("");
  const [color2, setColor2] = useState("");
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [result, setResult] = useState(0);
  const [bpmList, setBpmList] = useState<number[]>([]);
  const bpmListRef = useRef(bpmList);
  const startRef = useRef(start);
  const countRef = useRef(count);

  const time = 3
  const divider = 4

  useEffect(() => {
    bpmListRef.current = bpmList;
  }, [bpmList]);

  useEffect(() => {
    startRef.current = start;
  }, [start]);

  useEffect(() => {
    if(count===1){
      setTimeout(stopTimer, time*1000);
      bpmPerSec()
    }

    countRef.current = count;
  }, [count]);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key.toLowerCase() === "x" && startRef.current) {
      setColor("text-black bg-white");
      setCount((prev) => {
        const newCount = prev + 1;
        countRef.current = newCount; // keep ref in sync
        return newCount;
      });
    }

    if (e.key.toLowerCase() === "c" && startRef.current) {
      setColor2("text-black bg-white");
      setCount((prev) => {
        const newCount = prev + 1;
        countRef.current = newCount; // keep ref in sync
        return newCount;
      });
    }
  }

  function delay(time: number) {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.key.toLowerCase() === "x" && startRef.current) {
      setColor("");
    }
    if (e.key.toLowerCase() === "c" && startRef.current) {
      setColor2("");
    }
  }

  async function bpmPerSec(){
    for (let i = 0; i < time; i++) {
      await delay(1000)
      setBpmList([...bpmListRef.current, Math.floor((countRef.current*(60/(i+1)))/divider)])
      console.log(bpmList)
    }
  }

  function stopTimer() {
    setResult((countRef.current*(60/time))/divider); // use the latest value via ref
    let newArr: number[] = bpmListRef.current
    newArr[time-1] = (countRef.current*(60/time))/divider
    setBpmList(newArr)
    setColor("");
    setColor2("");
    setCount(0);
    setStart(false);
  }

  function startTimer() {
    if (startRef.current) return;
    setStart(true);
    setCount(0);
    setBpmList([])
    countRef.current = 0; // reset ref too
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="bg-black text-white font-medium flex flex-col items-center justify-center gap-2 w-screen h-screen">
      {startRef.current && <div className="mt-6">Started</div>}
      {countRef.current > 0 && <div className="mt-6">Wait 3s</div>}
      <button
        className={`w-12 h-12 border border-white rounded-md focus:outline-none select-none ${color}`}
      >
        X
      </button>
      <button
        className={`w-12 h-12 border border-white rounded-md focus:outline-none select-none ${color2}`}
      >
        C
      </button>

      <button onClick={startTimer} className="mt-6 bg-white text-black px-2 py-1 rounded-md hover:cursor-pointer">
        Start Timer
      </button>
      {count !== 0 && <div className="mt-6">{count}</div>}
      {result !== 0 && <div className="mt-6">{result}</div>}
      {bpmList.length > 0 ? (
        <div className="mt-6">
          {bpmList.slice(0, time).map((bpm, index) => (
            <div key={index}>{index+1}s :{bpm} bpm</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

