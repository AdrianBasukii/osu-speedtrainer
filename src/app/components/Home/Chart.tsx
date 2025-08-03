"use client"
import { LineChart } from '@mui/x-charts/LineChart';
import { chartsTooltipClasses } from '@mui/x-charts';

export default function Chart({BPMList, timeList} : {BPMList: number[], timeList: number[]}){
    return(
        <LineChart
            xAxis={[{ 
                data: timeList, 
                tickMinStep: 1,
                disableTicks: true,
                label: "Time",
                labelStyle: { fill: 'var(--color-accent-primary)', fontSize: 16, fontWeight: 700 }
            }]}

            yAxis={[{ 
                label: "BPM",
                disableTicks: true,
                labelStyle: { fill: 'var(--color-accent-primary)', fontSize: 16, fontWeight: 700 }
            }]}

            series={[
                {
                data: BPMList,
                color: 'var(--color-text-primary)',
                showMark: false,
                },
            ]}

            slotProps={{
                tooltip: {
                sx: {
                    [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.paper}`]: {
                        bgcolor: 'var(--color-bg-tertiary)',
                        borderColor: 'var(--color-accent-primary)',
                        color: 'var(--color-text-primary)'
                    },
                    [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.cell}`]: {
                        bgcolor: 'var(--color-bg-tertiary)',
                        color: 'var(--color-text-primary)'
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
                stroke: 'var(--color-accent-primary)', 
                },
                '& .MuiChartsGrid-line': {
                stroke: 'var(--color-accent-primary)', // grid lines
                },
                '& .MuiChartsAxis-root .MuiChartsAxis-tickLabel': {
                fill: 'var(--color-accent-secondary)', 
                },
            }}
        />
    )
}