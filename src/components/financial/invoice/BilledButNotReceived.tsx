import React, { useState } from 'react';

const BilledNotReceived = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    clients: ''
  });

  const companies = [
    'HIRANANDANI & ASSOCIATES',
    'Hiranandani & Co',
    'Oyster Management Consultants Private Limited',
    'RIA ENTERPRISES',
    'LAL HIRANANDANI HUF',
    'ANJANA ENTERPRISES'
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Billed but not received</h1>
      
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
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
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
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left"></th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Invoice No</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Service Amount</th>
              <th className="px-4 py-2 text-left">Tax. Claim Amt.</th>
              <th className="px-4 py-2 text-left">Total Tax. Amt.</th>
              <th className="px-4 py-2 text-left">CGST</th>
              <th className="px-4 py-2 text-left">SGST</th>
              <th className="px-4 py-2 text-left">IGST</th>
              <th className="px-4 py-2 text-left">Non Tax. Claim Amt.</th>
              <th className="px-4 py-2 text-left">Total Bill Amount</th>
              <th className="px-4 py-2 text-left">Outstanding Amount</th>
              <th className="px-4 py-2 text-left">Discount Amount</th>
              <th className="px-4 py-2 text-left">Days O/s</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-center" colSpan={16}>
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

      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Send Email to All
        </button>
      </div>
    </div>
  );
};

export default BilledNotReceived;