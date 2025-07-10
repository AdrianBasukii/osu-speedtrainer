"use client"
import { LineChart } from '@mui/x-charts/LineChart';
import { chartsTooltipClasses } from '@mui/x-charts';

export default function Chart({BPMList, timeList} : {BPMList: number[], timeList: number[]}){
    console.log(BPMList, timeList)
    return(
        <LineChart
            xAxis={[{ 
                data: timeList, 
                tickMinStep: 1,
                disableTicks: true,
                label: "Time",
                labelStyle: { fill: '#333333', fontSize: 16, fontWeight: 700 }
            }]}

            yAxis={[{ 
                label: "BPM",
                disableTicks: true,
                labelStyle: { fill: '#333333', fontSize: 16, fontWeight: 700 }
            }]}

            series={[
                {
                data: BPMList,
                color: '#e5e5e5',
                showMark: false,
                },
            ]}

            slotProps={{
                tooltip: {
                sx: {
                    [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.paper}`]: {
                        bgcolor: '#222222',
                        borderColor: '#333333',
                        color: '#e5e5e5'
                    },
                    [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.cell}`]: {
                        bgcolor: '#222222',
                        color: '#e5e5e5'
                    },
                },
                },
            }}

            grid={{ vertical: true, horizontal: true }}

            height={250}

            axisHighlight={{
                x: 'band'
            }}
            
            sx={{
                '& .MuiChartsAxis-root .MuiChartsAxis-line': {
                stroke: '#333333', 
                },
                '& .MuiChartsGrid-line': {
                stroke: '#333333', // grid lines
                },
                '& .MuiChartsAxis-root .MuiChartsAxis-tickLabel': {
                fill: '#444444', 
                },
            }}
        />
    )
}