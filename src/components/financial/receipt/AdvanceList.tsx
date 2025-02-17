import React, { useState } from 'react';

interface AdvanceReceipt {
  receiptNo: string;
  date: string;
  clientName: string;
  grossAdvanceAmount: number;
  tds: number;
  amount: number;
  adjustedTDS: number;
  adjustedAmount: number;
  balanceAmount: number;
  mode: string;
}

const AdvanceList = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    clients: ''
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Advance Receipt List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            Clients
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.clients}
            onChange={(e) => setFilters({...filters, clients: e.target.value})}
          >
            <option value="">Select</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Filter
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Reset
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span>Show</span>
        <select className="border border-gray-300 rounded-md p-1">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span>entries</span>
        <div className="ml-auto">
          <label className="text-sm text-gray-600 mr-2">Search:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Receipt No</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Client Name</th>
              <th className="px-4 py-2 text-left">Gross Advance Amount</th>
              <th className="px-4 py-2 text-left">TDS</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Adjusted TDS</th>
              <th className="px-4 py-2 text-left">Adjusted Amount</th>
              <th className="px-4 py-2 text-left">Balance Amount</th>
              <th className="px-4 py-2 text-left">Mode</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-center" colSpan={11}>
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

export default AdvanceList;