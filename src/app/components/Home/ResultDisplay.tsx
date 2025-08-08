import Chart from "./Chart"
import MeasurementDisplay from "./MeasurementDisplay"
import { Results } from "@/app/types";
import { handleSubmitActivity } from "@/app/actions/authAction";
import { useEffect } from "react";

export default function ResultDisplay({ results } : {results : Results}) {

    const handleSubmit = () => {
        handleSubmitActivity(results)
    }

    useEffect(handleSubmit, [])

    return(
        <div className="w-full flex flex-col gap-12">
            <Chart BPMList={results.BPMList} timeList={results.timeList}/>
            <div className="w-full flex-wrap flex justify-center gap-4 md:gap-0 md:justify-between">
                <MeasurementDisplay title="Peak BPM" measurement={results.peakBPM}/>
                <MeasurementDisplay title="Average BPM" measurement={results.avgBPM}/>
                <MeasurementDisplay title="Consistency" measurement={`${results.consistency}%`}/>
                <MeasurementDisplay title="Total Clicks" measurement={results.totalClicks}/>
                <MeasurementDisplay title="Total Time" measurement={`${results.totalTime}s`}/>
            </div>
        </div>
    )
}