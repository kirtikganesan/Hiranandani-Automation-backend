import React, { useState } from 'react';

 const ClientOutstandingReport: React.FC = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">All Client Outstanding Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Billing Firm<span className="text-red-500">*</span>
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>HIRANANDANI & ASSOCIATES</option>
          </select>
        </div>
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
            Outstanding as on<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="01/02/2025"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Display</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="display" className="mr-2" defaultChecked />
              Clientwise
            </label>
            <label className="flex items-center">
              <input type="radio" name="display" className="mr-2" />
              Groupwise
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Reset</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">Export</button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Search:</label>
          <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Client Code</th>
              <th className="px-4 py-3 text-left">Client Name</th>
              <th className="px-4 py-3 text-left">HIRANANDANI & ASSOCIATES</th>
              <th className="px-4 py-3 text-right">Outstanding Amt</th>
              <th className="px-4 py-3 text-right">Unadjust Advance Amount</th>
              <th className="px-4 py-3 text-right">Total Outstanding Amt</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3">ACC001</td>
              <td className="px-4 py-3">ACCURA WINES PVT LTD</td>
              <td className="px-4 py-3">HIRANANDANI & ASSOCIATES</td>
              <td className="px-4 py-3 text-right">7,080</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">7,080</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientOutstandingReport;