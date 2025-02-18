import React from 'react';

const ClientLedgerReport: React.FC = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Client Ledger</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
            Client Name<span className="text-red-500">*</span>
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>Aarti Bhor (Aarti Manohar Bhor)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            From Date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="01/02/2025"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            To Date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="17/02/2025"
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
              <th className="px-4 py-3 text-left">Sr. No.</th>
              <th className="px-4 py-3 text-left">Billing Firm</th>
              <th className="px-4 py-3 text-left">Date of Invoice/Receipt/TDS</th>
              <th className="px-4 py-3 text-left">Particular (Invoice Number / Receipt Number)</th>
              <th className="px-4 py-3 text-right">Invoice Amount</th>
              <th className="px-4 py-3 text-right">Advance Amount</th>
              <th className="px-4 py-3 text-right">Receipt Amount</th>
              <th className="px-4 py-3 text-right">TDS</th>
              <th className="px-4 py-3 text-right">Discount</th>
              <th className="px-4 py-3 text-right">Balance</th>
              <th className="px-4 py-3 text-right">Days Since Outstanding</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td colSpan={11} className="px-4 py-3">Opening Balance</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientLedgerReport;