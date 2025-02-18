import React, { useState } from 'react';

const UdinReport = () => {
  const [branch, setBranch] = useState('Head Office');
  const [fromDate, setFromDate] = useState('01/02/2025');
  const [toDate, setToDate] = useState('17/02/2025');
  const [partner, setPartner] = useState('LAL HIRANANDANI');
  const [employee, setEmployee] = useState('Chandni Chhabria, Hite...');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">UDIN Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
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
            From Date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            To Date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Partner
          </label>
          <select
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>LAL HIRANANDANI</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Employee
          </label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Chandni Chhabria, Hite...</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">Export</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Reset</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Client Code</th>
              <th className="px-4 py-3 text-left">Client Name</th>
              <th className="px-4 py-3 text-left">Service Name</th>
              <th className="px-4 py-3 text-left">Allotted to</th>
              <th className="px-4 py-3 text-left">Service completion date</th>
              <th className="px-4 py-3 text-left">UDIN Date</th>
              <th className="px-4 py-3 text-left">UDIN Partner</th>
              <th className="px-4 py-3 text-left">UDIN No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing 0 to 0 of 0 entries
        </div>
        <div className="flex gap-2">
          <button disabled className="px-4 py-2 text-gray-400">Previous</button>
          <button disabled className="px-4 py-2 text-gray-400">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UdinReport;