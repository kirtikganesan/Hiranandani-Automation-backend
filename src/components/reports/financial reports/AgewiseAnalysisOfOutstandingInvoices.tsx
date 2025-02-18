import React from 'react';

const AgewiseAnalysisOfOutstandingInvoices: React.FC = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Agewise Analysis of Outstanding Invoices</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Branch<span className="text-red-500">*</span>
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>Head Office</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Billing Profile<span className="text-red-500">*</span>
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>HIRANANDANI & ASSOCIATES</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            As on<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="01/02/2025"
          />
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
              <th className="px-4 py-3 text-left">Invoice Date</th>
              <th className="px-4 py-3 text-left">Invoice Number</th>
              <th className="px-4 py-3 text-left">Billing Profile</th>
              <th className="px-4 py-3 text-left">Name of Client</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-right">Less than 30 days</th>
              <th className="px-4 py-3 text-right">30-60 days</th>
              <th className="px-4 py-3 text-right">61-90 days</th>
              <th className="px-4 py-3 text-right">91-180 days</th>
              <th className="px-4 py-3 text-right">More than 180 days</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3">14/05/2019</td>
              <td className="px-4 py-3">OB-Partnership Registration</td>
              <td className="px-4 py-3">HIRANANDANI & ASSOCIATES</td>
              <td className="px-4 py-3">HAND SAFE INTERNATIONAL</td>
              <td className="px-4 py-3">Head Office</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">10,796</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgewiseAnalysisOfOutstandingInvoices;