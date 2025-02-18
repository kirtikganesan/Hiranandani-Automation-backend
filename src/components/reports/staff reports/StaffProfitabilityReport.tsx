import React, { useState } from 'react';

interface StaffProfitability {
  branch: string;
  employeeName: string;
  reportingHead: string;
  designation: string;
  clientName: string;
  serviceName: string;
  estimatedTime: string;
  hoursSpent: string;
  invoice: string;
  invoiceShare: string;
  cost: string;
  feesReceived: string;
  profitability: string;
}

const StaffProfitabilityReport = () => {
  const [filters, setFilters] = useState({
    employeeStatus: 'all',
    branch: 'Head Office',
    reportingHead: 'LAL HIRANANDANI',
    employee: 'Jeevika Gwalani',
    startDate: '01/02/2025',
    endDate: '17/02/2025'
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Staff Profitability Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee Status<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.employeeStatus === 'all'}
                onChange={() => setFilters({...filters, employeeStatus: 'all'})}
              />
              <span className="ml-2">All</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.employeeStatus === 'active'}
                onChange={() => setFilters({...filters, employeeStatus: 'active'})}
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.employeeStatus === 'deactive'}
                onChange={() => setFilters({...filters, employeeStatus: 'deactive'})}
              />
              <span className="ml-2">Deactive</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Branch<span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.branch}
            onChange={(e) => setFilters({...filters, branch: e.target.value})}
          >
            <option value="Head Office">Head Office</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reporting Head<span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.reportingHead}
            onChange={(e) => setFilters({...filters, reportingHead: e.target.value})}
          >
            <option value="LAL HIRANANDANI">LAL HIRANANDANI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee<span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.employee}
            onChange={(e) => setFilters({...filters, employee: e.target.value})}
          >
            <option value="Jeevika Gwalani">Jeevika Gwalani</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.startDate}
            onChange={(e) => setFilters({...filters, startDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.endDate}
            onChange={(e) => setFilters({...filters, endDate: e.target.value})}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          List
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Cancel
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Branch</th>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Reporting Head</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Client Name</th>
              <th className="px-4 py-2 text-left">Service Name</th>
              <th className="px-4 py-2 text-left">Estimated Time</th>
              <th className="px-4 py-2 text-left">Hours Spent</th>
              <th className="px-4 py-2 text-left">Invoice</th>
              <th className="px-4 py-2 text-left">Invoice Share</th>
              <th className="px-4 py-2 text-left">Cost (Salary/Stipend + Claim/Out of Pocket Expenses)</th>
              <th className="px-4 py-2 text-left">Fees Received</th>
              <th className="px-4 py-2 text-left">Profitability (Fees Received - Cost)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-center" colSpan={13}>
                No records found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffProfitabilityReport;