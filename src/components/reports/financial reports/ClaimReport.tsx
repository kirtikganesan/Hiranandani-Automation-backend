import React, { useState } from 'react';

const ClaimReport = () => {
  const [branch, setBranch] = useState('Head Office');
  const [employee, setEmployee] = useState('');
  const [claimType, setClaimType] = useState('Office');
  const [natureOfClaim, setNatureOfClaim] = useState('Digital Signature');
  const [clientName, setClientName] = useState('');
  const [status, setStatus] = useState('Pending');
  const [startDate, setStartDate] = useState('01/02/2025');
  const [endDate, setEndDate] = useState('17/02/2025');
  const [billable, setBillable] = useState('Yes');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Claim Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            Employee
          </label>
          <select 
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Chandni Chhabra</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Claim Type
          </label>
          <select 
            value={claimType}
            onChange={(e) => setClaimType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Office</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Nature of Claim
          </label>
          <select 
            value={natureOfClaim}
            onChange={(e) => setNatureOfClaim(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Digital Signature</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Client Name
          </label>
          <select 
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Aakash Talreja</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Status
          </label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Pending</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Start Date
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
            End Date
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
            Billable
          </label>
          <select 
            value={billable}
            onChange={(e) => setBillable(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Yes</option>
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
              <th className="px-4 py-3 text-left">Claim Date</th>
              <th className="px-4 py-3 text-left">Employee Name</th>
              <th className="px-4 py-3 text-left">Client Name (Client Group)</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Nature of Claim</th>
              <th className="px-4 py-3 text-left">Particulars</th>
              <th className="px-4 py-3 text-left">Bill No</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Billable</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimReport;