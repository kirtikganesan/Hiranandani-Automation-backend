import React, { useState } from 'react';

const ServicewiseReportOfStaffs = () => {
  const [service, setService] = useState('Accounting');
  const [financialYear, setFinancialYear] = useState('2024-2025');
  const [branch, setBranch] = useState('Head Office');
  const [fromPeriodicity, setFromPeriodicity] = useState('Apr-2024-Sept-2024');
  const [toPeriodicity, setToPeriodicity] = useState('Apr-2024-Sept-2024');
  const [clients, setClients] = useState('');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Service Wise Report of Staff</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Service<span className="text-red-500">*</span>
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Accounting</option>
          </select>
        </div>

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
            From Periodicity<span className="text-red-500">*</span>
          </label>
          <select
            value={fromPeriodicity}
            onChange={(e) => setFromPeriodicity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Apr-2024-Sept-2024</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            To Periodicity<span className="text-red-500">*</span>
          </label>
          <select
            value={toPeriodicity}
            onChange={(e) => setToPeriodicity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Apr-2024-Sept-2024</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Clients<span className="text-red-500">*</span>
          </label>
          <select
            value={clients}
            onChange={(e) => setClients(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">Export</button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select className="px-2 py-1 border border-gray-300 rounded-md">
            <option>10</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Search:</label>
          <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Name of Client</th>
              <th className="px-4 py-3 text-left">Service + Period</th>
              <th className="px-4 py-3 text-left">Task List for the Service</th>
              <th className="px-4 py-3 text-left">Name of the Staff</th>
              <th className="px-4 py-3 text-right">Estimated Hours</th>
              <th className="px-4 py-3 text-right">Actual Hours Taken</th>
              <th className="px-4 py-3 text-right">Deviation(+/-)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3">Head Office,Varsha Badlani Office</td>
              <td className="px-4 py-3">Next Level Home Reality LLP</td>
              <td className="px-4 py-3">Accounting ISix Monthly|Apr-2024-Sept-2024</td>
              <td className="px-4 py-3">Accounting</td>
              <td className="px-4 py-3">Varsha badlani</td>
              <td className="px-4 py-3 text-right">08:00</td>
              <td className="px-4 py-3 text-right">0</td>
              <td className="px-4 py-3 text-right">08:00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to 1 of 1 entries
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-blue-500">Previous</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">1</button>
          <button className="px-4 py-2 text-blue-500">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ServicewiseReportOfStaffs;