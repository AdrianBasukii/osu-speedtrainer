import Chart from "./Chart"
import MeasurementDisplay from "./MeasurementDisplay"

interface Results {
    BPMList: number[],
    peakBPM: number,
    avgBPM: number,
    totalClicks: number,
    totalTime: number
}

export default function ResultDisplay({ results } : {results : Results}) {
    console.log(results.BPMList)
    return(
        <div className="w-full flex flex-col gap-12">
            <Chart BPMList={results.BPMList}/>
            <div className="w-full flex justify-between">
                <MeasurementDisplay title="Peak BPM" measurement={results.peakBPM}/>
                <MeasurementDisplay title="Average BPM" measurement={results.avgBPM}/>
                <MeasurementDisplay title="Total Clicks" measurement={results.totalClicks}/>
                <MeasurementDisplay title="Total Time" measurement={`${results.totalTime}s`}/>
            </div>
        </div>
    )
}