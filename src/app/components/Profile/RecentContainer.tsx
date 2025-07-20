export default function RecentContainer() {
    return (
        <div>
            <table className="w-full table-fixed border-separate border-spacing-y-3">
                <thead className="sticky top-0">
                    <tr className="text-left h-12">
                        <th className="bg-[#181818] border-t-2 border-b-2 border-l-2 rounded-l-xl border-[#444444] px-4">Date</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-[#444444]">Mode</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-[#444444]">Duration</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-[#444444]">Clicks</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-[#444444]">BPM</th>
                        <th className="bg-[#181818] border-t-2 border-b-2 border-r-2 rounded-r-xl border-[#444444] px-4">Consistency</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Rows as before */}
                    <tr className="text-left bg-[#222222] w-full h-12 mb-4">
                        <td className="rounded-l-xl px-4">Today 11:50</td>
                        <td>1 key</td>
                        <td>5s</td>
                        <td>37</td>
                        <td>230</td>
                        <td className="rounded-r-xl px-4">92%</td>
                    </tr>
                    <tr className="text-left bg-[#222222] w-full h-12 mb-4">
                        <td className="rounded-l-xl px-4">Today 11:50</td>
                        <td>1 key</td>
                        <td>5s</td>
                        <td>37</td>
                        <td>230</td>
                        <td className="rounded-r-xl px-4">92%</td>
                    </tr>
                    <tr className="text-left bg-[#222222] w-full h-12 mb-4">
                        <td className="rounded-l-xl px-4">Today 11:50</td>
                        <td>1 key</td>
                        <td>5s</td>
                        <td>37</td>
                        <td>230</td>
                        <td className="rounded-r-xl px-4">92%</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}
