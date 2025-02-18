import React from 'react';

const AnalysisOfUnbilledServiceReport: React.FC = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Analysis of Unbilled Service Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Branch<span className="text-red-500">*</span>
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>Head Office</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select className="px-2 py-1 border border-gray-300 rounded-md">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Name of the Client (Code)</th>
              <th className="px-4 py-3 text-left">Name of the Service (Period)</th>
              <th className="px-4 py-3 text-left">Completion Date of Service</th>
              <th className="px-4 py-3 text-right">Days Since completed</th>
              <th className="px-4 py-3 text-right">Total Hours Spent</th>
              <th className="px-4 py-3 text-right">Total Employee Cost</th>
              <th className="px-4 py-3 text-right">Approved Claims</th>
              <th className="px-4 py-3 text-right">Total Unbilled Amount</th>
              <th className="px-4 py-3 text-right">Hours Spent (Unapproved)</th>
              <th className="px-4 py-3 text-right">Claims (Unapproved)</th>
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
          <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-md">
            Previous
          </button>
          <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisOfUnbilledServiceReport;