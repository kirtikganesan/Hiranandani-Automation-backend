import React, { useState } from 'react';

interface CancelledReceipt {
  receiptNo: string;
  date: string;
  type: string;
  clientName: string;
  amount: number;
  tds: number;
  discount: number;
  mode: string;
  modeDetails: string;
  reason: string;
}

const CancelledReceiptList = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    clients: ''
  });

  const mockData: CancelledReceipt[] = [
    {
      receiptNo: 'HA-1',
      date: '05/11/2024',
      type: 'Against Invoice',
      clientName: 'Amar Bhawani Saw Mills(Partnership Firm) (Amar Bhawani Saw Mills )',
      amount: 11800.00,
      tds: 0.00,
      discount: 0.00,
      mode: 'E-payment',
      modeDetails: 'Transaction Id:NEFT',
      reason: 'Wrong'
    }
  ];

  const companies = [
    'HIRANANDANI & ASSOCIATES',
    'Hiranandani & Co',
    'Oyster Management Consultants Private Limited',
    'RIA ENTERPRISES',
    'ANJANA ENTERPRISES'
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Cancelled Receipt List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

      <div className="flex flex-wrap gap-2 mb-6">
        {companies.map((company, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md text-sm ${
              index === 0 ? 'bg-green-500 text-white' : 'text-blue-600 hover:underline'
            }`}
          >
            {company}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Filter
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Reset
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Export
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
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Client Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">TDS</th>
              <th className="px-4 py-2 text-left">Discount</th>
              <th className="px-4 py-2 text-left">Mode</th>
              <th className="px-4 py-2 text-left">Mode Details</th>
              <th className="px-4 py-2 text-left">Reason</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2 text-blue-600 hover:underline">
                  {item.receiptNo}
                </td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">{item.clientName}</td>
                <td className="px-4 py-2">{item.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{item.tds.toFixed(2)}</td>
                <td className="px-4 py-2">{item.discount.toFixed(2)}</td>
                <td className="px-4 py-2">{item.mode}</td>
                <td className="px-4 py-2">{item.modeDetails}</td>
                <td className="px-4 py-2">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing 1 to {mockData.length} of {mockData.length} entries
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded">Previous</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CancelledReceiptList;