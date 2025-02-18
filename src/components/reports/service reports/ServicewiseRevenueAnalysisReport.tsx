import React, { useState } from 'react';

const ServicewiseRevenueAnalysisReport = () => {
  const [branch, setBranch] = useState('Head Office');
  const [service, setService] = useState('Accounting');
  const [financialYear, setFinancialYear] = useState('2024-2025');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Service Wise Revenue Analysis Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            Service<span className="text-red-500">*</span>
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Accounting</option>
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
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Service Name</th>
              <th className="px-4 py-3 text-left">Period</th>
              <th className="px-4 py-3 text-right">Hours Spent (Approved)</th>
              <th className="px-4 py-3 text-right">Hours Spent (Unapproved)</th>
              <th className="px-4 py-3 text-right">Claims (Approved)</th>
              <th className="px-4 py-3 text-right">Claims (Unapproved)</th>
              <th className="px-4 py-3 text-right">Cost (Approved)</th>
              <th className="px-4 py-3 text-right">Cost (Unapproved)</th>
              <th className="px-4 py-3 text-right">Fees Received (Excluding Tax)</th>
              <th className="px-4 py-3 text-right">Reimbursement of expenses claimed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
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

export default ServicewiseRevenueAnalysisReport;