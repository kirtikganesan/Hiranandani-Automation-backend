import React, { useState } from 'react';

const GstSummaryReport = () => {
  const [startDate, setStartDate] = useState('01/02/2025');
  const [endDate, setEndDate] = useState('17/02/2025');
  const [branch, setBranch] = useState('Head Office');
  const [billingProfile, setBillingProfile] = useState('HIRANANDANI & ASSOCIATES');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">GST Summary Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Branch<span className="text-red-500">*</span>
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Head Office</option>
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
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">GSTIN</th>
              <th className="px-4 py-3 text-left">State</th>
              <th className="px-4 py-3 text-left">Place of Supply</th>
              <th className="px-4 py-3 text-left">Invoice Date</th>
              <th className="px-4 py-3 text-left">Invoice Number</th>
              <th className="px-4 py-3 text-right">Basic Value</th>
              <th className="px-4 py-3 text-right">CGST</th>
              <th className="px-4 py-3 text-right">SGST</th>
              <th className="px-4 py-3 text-right">IGST</th>
              <th className="px-4 py-3 text-right">Non Taxable</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3">LAVIS ROPA LLP</td>
              <td className="px-4 py-3">Head Office</td>
              <td className="px-4 py-3">27AAGFL953Z1ZX</td>
              <td className="px-4 py-3">Maharashtra</td>
              <td className="px-4 py-3">Maharashtra</td>
              <td className="px-4 py-3">04/02/2025</td>
              <td className="px-4 py-3">A/24-25/71</td>
              <td className="px-4 py-3 text-right">7,500.00</td>
              <td className="px-4 py-3 text-right">675.00</td>
              <td className="px-4 py-3 text-right">675.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">8,850.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td colSpan={7} className="px-4 py-3 text-right">Total</td>
              <td className="px-4 py-3 text-right">9,000.00</td>
              <td className="px-4 py-3 text-right">810.00</td>
              <td className="px-4 py-3 text-right">810.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">0.00</td>
              <td className="px-4 py-3 text-right">10,620.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default GstSummaryReport;