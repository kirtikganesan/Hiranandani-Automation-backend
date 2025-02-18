import React, { useState } from 'react';

const ServicewiseWorkPositionReport = () => {
  const [service, setService] = useState('Accounting');
  const [financialYear, setFinancialYear] = useState('2024-2025');
  const [period, setPeriod] = useState('Apr-2024-Sept-2024');
  const [branch, setBranch] = useState('Head Office');
  const [type, setType] = useState('client-wise');
  const [client, setClient] = useState('Pahilaj Talreja (Sho...');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Service Wise Work Position Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            F. Y.<span className="text-red-500">*</span>
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
            Period<span className="text-red-500">*</span>
          </label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Apr-2024-Sept-2024</option>
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
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Type<span className="text-red-500">*</span></label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="client-wise"
                checked={type === 'client-wise'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Client-wise
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="group-wise"
                checked={type === 'group-wise'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Group-wise
            </label>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Client</label>
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Pahilaj Talreja (Shoe Sagar)</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">Export</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Completed within Due Date</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm">Completed Late</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm">WIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-sm">Not Applicable / Not Started</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-700"></div>
          <span className="text-sm">Cancelled</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Name of Client</th>
              <th className="px-4 py-3 text-left">Apr-2024-Sept-2024</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3">Pahilaj Talreja (Shoe Sagar) (Shoe Sagar)</td>
              <td className="px-4 py-3">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              </td>
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

export default ServicewiseWorkPositionReport;