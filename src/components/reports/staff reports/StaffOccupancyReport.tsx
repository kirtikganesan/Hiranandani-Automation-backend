import React, { useState } from 'react';

interface StaffOccupancy {
  branchName: string;
  employeeName: string;
  designation: string;
  reportingHead: string;
  clientName: string;
  workInHand: string;
  serviceStatus: string;
  tasksCompleted: number;
  triggeredDate: string;
  startedDate: string;
  expectedCompletion: string;
  estimatedTime: string;
  leavePending: string;
  absent: string;
}

const StaffOccupancyReport = () => {
  const [filters, setFilters] = useState({
    branch: 'Head Office',
    reportingHead: 'LAL HIRANANDANI',
    showType: 'all',
    employee: 'Jeevika Gwalani',
    reportType: 'historic',
    startDate: '01/02/2025',
    endDate: '17/02/2025',
    client: 'Lal Hiranandani'
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Staff Occupancy Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
            Reporting Head
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
            Show Type<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.showType === 'all'}
                onChange={() => setFilters({...filters, showType: 'all'})}
              />
              <span className="ml-2">All</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.showType === 'active'}
                onChange={() => setFilters({...filters, showType: 'active'})}
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.showType === 'deactive'}
                onChange={() => setFilters({...filters, showType: 'deactive'})}
              />
              <span className="ml-2">Deactive</span>
            </label>
          </div>
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

        <div className="md:col-span-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Report
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.reportType === 'today'}
                onChange={() => setFilters({...filters, reportType: 'today'})}
              />
              <span className="ml-2">Today</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.reportType === 'historic'}
                onChange={() => setFilters({...filters, reportType: 'historic'})}
              />
              <span className="ml-2">Historic</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.reportType === 'future'}
                onChange={() => setFilters({...filters, reportType: 'future'})}
              />
              <span className="ml-2">Future</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
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
            End Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.endDate}
            onChange={(e) => setFilters({...filters, endDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.client}
            onChange={(e) => setFilters({...filters, client: e.target.value})}
          >
            <option value="Lal Hiranandani">Lal Hiranandani</option>
          </select>
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

      <div className="mb-4 flex items-center gap-2">
        <span>Show</span>
        <select className="border border-gray-300 rounded-md p-1">
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
        <span>entries</span>
        <div className="ml-auto">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md p-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name of Branch</th>
              <th className="px-4 py-2 text-left">Name of Employee</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Reporting Head</th>
              <th className="px-4 py-2 text-left">Client Name</th>
              <th className="px-4 py-2 text-left">Work in Hand</th>
              <th className="px-4 py-2 text-left">Service Status</th>
              <th className="px-4 py-2 text-left">No. of Tasks completed</th>
              <th className="px-4 py-2 text-left">Triggered Date</th>
              <th className="px-4 py-2 text-left">Started Date</th>
              <th className="px-4 py-2 text-left">Expected Date of Completion</th>
              <th className="px-4 py-2 text-left">Estimated time required for completion Day/Hours/Minuts</th>
              <th className="px-4 py-2 text-left">Leave pending approved</th>
              <th className="px-4 py-2 text-left">Absent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-center" colSpan={14}>
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing 0 to 0 of 0 entries
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded">Previous</button>
          <button className="px-3 py-1 border border-gray-300 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StaffOccupancyReport;