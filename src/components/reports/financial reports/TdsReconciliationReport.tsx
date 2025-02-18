import React, { useState } from 'react';

const TdsReconciliationReport = () => {
  const [billingFirm, setBillingFirm] = useState('HIRANANDANI & ASSOCIATES');
  const [financialYear, setFinancialYear] = useState('2024-2025');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">TDS Reconciliation Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Billing Firm
          </label>
          <select
            value={billingFirm}
            onChange={(e) => setBillingFirm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>HIRANANDANI & ASSOCIATES</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Financial Year
          </label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>2024-2025</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Filter</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">Export</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">TAN</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Number</th>
              <th className="px-4 py-3 text-left">Billing Firm</th>
              <th className="px-4 py-3 text-right">Taxable Amount</th>
              <th className="px-4 py-3 text-right">TDS Amount b/f</th>
              <th className="px-4 py-3 text-left">F. Y. from which b/f</th>
              <th className="px-4 py-3 text-right">TDS deducted in Current</th>
              <th className="px-4 py-3 text-right">TDS Claim Current year</th>
              <th className="px-4 py-3 text-right">TDS c/f</th>
              <th className="px-4 py-3 text-center">TDS appearing in 26AS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3">ACCURA WINES PVT LTD</td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">24/01/2025</td>
              <td className="px-4 py-3">A/24-25/64</td>
              <td className="px-4 py-3">HIRANANDANI & ASSOCIATES</td>
              <td className="px-4 py-3 text-right">6,000.00</td>
              <td className="px-4 py-3 text-right">-</td>
              <td className="px-4 py-3">-</td>
              <td className="px-4 py-3 text-right">600.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">600.00</td>
              <td className="px-4 py-3 text-center">No</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TdsReconciliationReport;