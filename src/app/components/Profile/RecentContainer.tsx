"use client"
import { recentActivity } from "@/app/types";
import { formatDistanceToNow } from "date-fns";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function RecentContainer({recentActivity} : {recentActivity: recentActivity[]}) {

    const [selectedActivity, setSelected] = useState<recentActivity[]>(recentActivity.slice(0,5))
    const [shown, setShown] = useState<boolean>(false)

    function handleShow(){
        if(!shown){
            setShown(!shown)
            setSelected(recentActivity)
        } else{
            setShown(!shown)
            setSelected(recentActivity.slice(0,5))
        }
    }

    return (
        <div>
            <table className="w-full table-fixed border-separate border-spacing-y-3">
                <thead className="sticky top-0">
                    <tr className="text-left h-12">
                        <th className="bg-bg-secondary border-t-2 border-b-2 border-l-2 rounded-l-xl border-accent-secondary px-4">Consistency</th>
                        <th className="bg-bg-secondary border-t-2 border-b-2 border-accent-secondary">Mode</th>
                        <th className="hidden md:table-cell bg-bg-secondary border-t-2 border-b-2 border-accent-secondary">Duration</th>
                        <th className="hidden md:table-cell bg-bg-secondary border-t-2 border-b-2 border-accent-secondary">Clicks</th>
                        <th className="bg-bg-secondary border-t-2 border-b-2 border-r-2 md:border-r-0 border-accent-secondary rounded-r-xl md:rounded-none">BPM</th>
                        <th className="hidden md:table-cell bg-bg-secondary border-t-2 border-b-2 border-r-2 rounded-r-xl border-accent-secondary px-4">Created</th>
                    </tr>
                </thead>
                <AnimatePresence>
                {recentActivity.length>0 ?
                    selectedActivity.map((data, key) => (
                    <tbody key={key}>
                        
                        <motion.tr 
                            className="text-left bg-bg-tertiary w-full h-12 mb-4 font-medium"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2}}
                            exit={{ opacity: 0, y: -20}}
                        >
                            <td className="rounded-l-xl px-4">{data.consistency}%</td>
                            <td>{data.mode}</td>
                            <td className="hidden md:table-cell" >{data.duration} seconds</td>
                            <td className="hidden md:table-cell" >{data.clicks} clicks</td>
                            <td className="rounded-r-xl md:rounded-none">{data.bpm} BPM</td>
                            <td className="hidden md:table-cell rounded-r-xl px-4 text-sm">{formatDistanceToNow(data.setDate)} ago</td>
                        </motion.tr>
                    </tbody>
                    )) : 
                    <tbody>
                        <tr>
                        <td className="font-medium text-xl text-accent-secondary text-center h-24" colSpan={6}>
                            No Recent Activity
                        </td>
                        </tr>
                    </tbody>
                    } 
                </AnimatePresence>
                
            </table>
            {recentActivity.length>5 &&
            <div className="w-full py-3 flex items-center justify-center">
                <button onClick={() => handleShow()} className="flex items-center justify-center gap-3 text-sm text-accent-secondary border-2 border-bg-tertiary px-4 py-1 rounded-full hover:cursor-pointer">
                    {!shown && "Show More"}
                    {shown && "Show Less"}
                    <div className={`transition-all ${shown ? 'rotate-180' : ''}`}>
                        <KeyboardArrowDownIcon/>
                    </div>
                </button>
            </div>
            }
        </div>
    );
}

