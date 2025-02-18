import React, { useState } from 'react';

const StaffwiseBillingReport = () => {
  const [employeeStatus, setEmployeeStatus] = useState('all');
  const [branch, setBranch] = useState('Head Office');
  const [employee, setEmployee] = useState('Jeevika Gwalani');
  const [startDate, setStartDate] = useState('01/02/2025');
  const [endDate, setEndDate] = useState('17/02/2025');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Staff-wise Billing Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Employee Status<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="employeeStatus"
                value="all"
                checked={employeeStatus === 'all'}
                onChange={(e) => setEmployeeStatus(e.target.value)}
                className="mr-2"
              />
              All
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="employeeStatus"
                value="active"
                checked={employeeStatus === 'active'}
                onChange={(e) => setEmployeeStatus(e.target.value)}
                className="mr-2"
              />
              Active
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="employeeStatus"
                value="deactive"
                checked={employeeStatus === 'deactive'}
                onChange={(e) => setEmployeeStatus(e.target.value)}
                className="mr-2"
              />
              Deactive
            </label>
          </div>
        </div>

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
            Employee<span className="text-red-500">*</span>
          </label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Jeevika Gwalani</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">Export</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Name of the Branch</th>
              <th className="px-4 py-3 text-left">Name of the Employee</th>
              <th className="px-4 py-3 text-left">Designation</th>
              <th className="px-4 py-3 text-right">Number of days worked</th>
              <th className="px-4 py-3 text-right">Leaves</th>
              <th className="px-4 py-3 text-right">Weekly Offs / Holidays</th>
              <th className="px-4 py-3 text-right">Regular Hours</th>
              <th className="px-4 py-3 text-right">Overtime Hours</th>
              <th className="px-4 py-3 text-right">Total Hours</th>
              <th className="px-4 py-3 text-right">Cost Per Hour</th>
              <th className="px-4 py-3 text-right">Cost</th>
              <th className="px-4 py-3 text-right">Invoice amount</th>
              <th className="px-4 py-3 text-right">Invoice Share</th>
              <th className="px-4 py-3 text-right">Profit</th>
              <th className="px-4 py-3 text-right">Profit % to Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3">Head Office</td>
              <td className="px-4 py-3">Jeevika Gwalani</td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">3</td>
              <td className="px-4 py-3 text-right"></td>
              <td className="px-4 py-3 text-right"></td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">0%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to 1 of 1 entries
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-blue-500">Previous</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">1</button>
          <button className="px-4 py-2 text-blue-500">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StaffwiseBillingReport;