import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TimesheetEntry {
    id: number;
    timesheet_date: string;
    worked_at: string;
    in_time: string;
    out_time: string | null;
    total_time: string | null;
    allotted_client: string | null;
    service: string | null;
    non_allotted_services: boolean;
    office_related: boolean;
    notice_appointment: boolean;
}

const TimesheetList: React.FC = () => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };
    const [timesheetData, setTimesheetData] = useState<TimesheetEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('https://hiranandani-automation.onrender.com/api/timesheet')
            .then(response => {
                setTimesheetData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching timesheet data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Timesheet List</h2>
            <div className=' overflow-x-auto rounded-lg shadow'>
            {loading ? (
                <p>Loading...</p>
            ) : timesheetData.length === 0 ? (
                <p className="text-gray-500">No data available</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">Worked At</th>
                            <th className="border border-gray-300 p-2">In Time</th>
                            <th className="border border-gray-300 p-2">Out Time</th>
                            <th className="border border-gray-300 p-2">Total Time</th>
                            <th className="border border-gray-300 p-2">Client</th>
                            <th className="border border-gray-300 p-2">Service</th>
                            <th className="border border-gray-300 p-2">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timesheetData.map(entry => (
                            <tr key={entry.id} className="text-center">
                                <td className="border border-gray-300 p-2">{formatDate(entry.timesheet_date)}</td>
                                <td className="border border-gray-300 p-2">{entry.worked_at}</td>
                                <td className="border border-gray-300 p-2">{entry.in_time}</td>
                                <td className="border border-gray-300 p-2">{entry.out_time || '-'}</td>
                                <td className="border border-gray-300 p-2">{entry.total_time || '-'}</td>
                                <td className="border border-gray-300 p-2">{entry.allotted_client || '-'}</td>
                                <td className="border border-gray-300 p-2">{entry.service || '-'}</td>
                                <td className="border border-gray-300 p-2">
    {entry.non_allotted_services ? <span className="bg-blue-200 p-1 rounded">Non Allotted</span> : null}
    {entry.office_related ? <span className="bg-green-200 p-1 rounded ml-1">Office</span> : null}
    {entry.notice_appointment ? <span className="bg-red-200 p-1 rounded ml-1">Notice</span> : null}
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default TimesheetList;
