import React, { useState } from 'react';

const StaffAttendanceReport = () => {
  const [branch, setBranch] = useState('Head Office');
  const [financialYear, setFinancialYear] = useState('2024-2025');
  const [month, setMonth] = useState('April');
  const [showType, setShowType] = useState('both');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Staff Attendance Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Branch<span className="text-red-500">*</span>
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Head Office</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Financial Year<span className="text-red-500">*</span>
          </label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>2024-2025</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Month<span className="text-red-500">*</span>
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>April</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Show Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="showType"
                value="monthly"
                checked={showType === 'monthly'}
                onChange={(e) => setShowType(e.target.value)}
                className="mr-2"
              />
              Monthly
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="showType"
                value="hourly"
                checked={showType === 'hourly'}
                onChange={(e) => setShowType(e.target.value)}
                className="mr-2"
              />
              Hourly
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="showType"
                value="both"
                checked={showType === 'both'}
                onChange={(e) => setShowType(e.target.value)}
                className="mr-2"
              />
              Both
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">List</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Export</button>
      </div>

      <div className="mb-4 text-sm">
        <p>Attendance Sheet for the month of April,2024-2025</p>
        <div className="flex flex-wrap gap-4 mt-2">
          <span>A - Absent</span>
          <span>H - Half Day</span>
          <span>HHO - Half Day Holiday</span>
          <span>HO - Holiday</span>
          <span>L - Leave</span>
          <span>P - Present</span>
          <span>WO - Weekly Off</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Staff</th>
              <th className="px-4 py-3 text-left">Designation</th>
              <th className="px-4 py-3 text-center">01 (Mon)</th>
              <th className="px-4 py-3 text-center">01 (Hours)</th>
              <th className="px-4 py-3 text-center">02 (Tue)</th>
              <th className="px-4 py-3 text-center">02 (Hours)</th>
              <th className="px-4 py-3 text-center">03 (Wed)</th>
              <th className="px-4 py-3 text-center">03 (Hours)</th>
              <th className="px-4 py-3 text-center">04 (Thu)</th>
              <th className="px-4 py-3 text-center">04 (Hours)</th>
              <th className="px-4 py-3 text-center">05 (Fri)</th>
              <th className="px-4 py-3 text-center">05 (Hours)</th>
              <th className="px-4 py-3 text-center">06 (Sat)</th>
              <th className="px-4 py-3 text-center">06 (Hours)</th>
              <th className="px-4 py-3 text-center">07 (Sun)</th>
              <th className="px-4 py-3 text-center">07 (Hours)</th>
              <th className="px-4 py-3 text-center">08 (Mon)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-center">1</td>
              <td className="px-4 py-3">Head Office</td>
              <td className="px-4 py-3">Akshay Kot</td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-center text-red-500">A</td>
              <td className="px-4 py-3 text-center">0</td>
              <td className="px-4 py-3 text-center text-red-500">A</td>
              <td className="px-4 py-3 text-center">0</td>
              <td className="px-4 py-3 text-center text-red-500">A</td>
              <td className="px-4 py-3 text-center">0</td>
              <td className="px-4 py-3 text-center text-red-500">A</td>
              <td className="px-4 py-3 text-center">0</td>
              <td className="px-4 py-3 text-center text-red-500">A</td>
              <td className="px-4 py-3 text-center">0</td>
              <td className="px-4 py-3 text-center text-red-500">A</td>
              <td className="px-4 py-3 text-center">0</td>
              <td className="px-4 py-3 text-center text-blue-500">WO</td>
              <td className="px-4 py-3 text-center">0</td>
              <td className="px-4 py-3 text-center text-red-500">A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffAttendanceReport;