import React, { useState } from 'react';

const SacCodeSummaryReport = () => {
  const [financialYear, setFinancialYear] = useState('2024-2025');
  const [billingProfile, setBillingProfile] = useState('HIRANANDANI & ASSOCIATES');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">SAC Code Summary Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Billing Profile<span className="text-red-500">*</span>
          </label>
          <select
            value={billingProfile}
            onChange={(e) => setBillingProfile(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>HIRANANDANI & ASSOCIATES</option>
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
              <th className="px-4 py-3 text-left">SAC Code</th>
              <th className="px-4 py-3 text-right">Taxable Amount</th>
              <th className="px-4 py-3 text-right">CGST</th>
              <th className="px-4 py-3 text-right">SGST</th>
              <th className="px-4 py-3 text-right">IGST</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3">998216</td>
              <td className="px-4 py-3 text-right">9,000</td>
              <td className="px-4 py-3 text-right">810</td>
              <td className="px-4 py-3 text-right">810</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">10,620</td>
            </tr>
            <tr className="border-b border-gray-200 font-bold">
              <td className="px-4 py-3">Grand Total</td>
              <td className="px-4 py-3 text-right">473,000</td>
              <td className="px-4 py-3 text-right">42,570</td>
              <td className="px-4 py-3 text-right">42,570</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">558,140</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SacCodeSummaryReport;