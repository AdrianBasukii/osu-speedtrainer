import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart({BPMList} : {BPMList: number[]}){
    console.log(BPMList)
    return(
        <LineChart
            xAxis={[{ data: BPMList.map((_, index) => index/1000)}]}
            series={[
                {
                data: BPMList,
                color: '#e5e5e5'
                },
            ]}
            height={250}
            sx={{
                '& .MuiChartsAxis-root .MuiChartsAxis-line': {
                stroke: '#e5e5e5', 
                },
                '& .MuiChartsAxis-root .MuiChartsAxis-tickLabel': {
                fill: '#e5e5e5', 
                },
            }}
        />
    )
}