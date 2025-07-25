import { ObjectId } from "mongoose"

type statData = {
    bpmValue: number
    setAt: Date
}

type bestTimeData = {
    '5s': statData
    '10s': statData
    '15s': statData
    '20s': statData
}

type bestClickData = {
    '50': statData
    '100': statData
    '150': statData
    '200': statData
}

export type bestKeyData = {
    'Time': bestTimeData
    'Clicks': bestClickData
}

export type personalBestType = {
    [key in `1key` | `2key`]: bestKeyData
}

export interface Results {
    BPMList: number[]
    timeList: number[]
    peakBPM: number
    avgBPM: number
    totalClicks: number
    totalTime: number
    consistency: number
    mode: string
    measurement: string
}

export type recentActivity = {
    userID: ObjectId
    setDate: Date
    mode: string
    duration: number
    clicks: number
    bpm: number
    consistency: number
}