import { recentActivity } from "@/app/types";
import { formatDistanceToNow } from "date-fns";

export default function RecentContainer({recentActivity} : {recentActivity: recentActivity[]}) {

    return (
        <div>
            <table className="w-full table-fixed border-separate border-spacing-y-3">
                <thead className="sticky top-0">
                    <tr className="text-left h-12">
                        <th className="bg-[#181818] border-t-2 border-b-2 border-l-2 rounded-l-xl border-[#444444] px-4">Consistency</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-[#444444]">Mode</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-[#444444]">Duration</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-[#444444]">Clicks</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-[#444444]">BPM</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-r-2 rounded-r-xl border-[#444444] px-4">Created</th>
                    </tr>
                </thead>
                {recentActivity.length>0 ?
                    recentActivity.map((data, key) => (
                    <tbody key={key}>
                        <tr className="text-left bg-[#222222] w-full h-12 mb-4 font-medium">
                            <td className="rounded-l-xl px-4">{data.consistency}%</td>
                            <td>{data.mode}</td>
                            <td>{data.duration} seconds</td>
                            <td>{data.clicks} clicks</td>
                            <td>{data.bpm} BPM</td>
                            <td className="rounded-r-xl px-4 text-sm">{formatDistanceToNow(data.setDate)} ago</td>
                        </tr>
                    </tbody>
                    )) : 
                    <tbody>
                        <tr>
                        <td className="font-medium text-xl text-[#444444] text-center h-24" colSpan={6}>
                            No Recent Activity
                        </td>
                        </tr>
                    </tbody>
                    } 

                
            </table>
        </div>
    );
}

