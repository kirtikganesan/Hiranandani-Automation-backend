import React, { useState } from 'react';

const ClientwiseWorkPosition = () => {
  const [type, setType] = useState('client-wise');
  const [branch, setBranch] = useState('head-office');
  const [serviceType, setServiceType] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientwise, setClientwise] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">Clientwise Work Position Report</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Type<span className="text-error">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value="client-wise"
                  checked={type === 'client-wise'}
                  onChange={(e) => setType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Client-wise</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value="group-wise"
                  checked={type === 'group-wise'}
                  onChange={(e) => setType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Group-wise</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Branch<span className="text-error">*</span>
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="head-office">Head Office</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Service Type<span className="text-error">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="serviceType"
                  value="all"
                  checked={serviceType === 'all'}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>All</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="serviceType"
                  value="pending"
                  checked={serviceType === 'pending'}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Pending</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              From Date<span className="text-error">*</span>
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              To Date<span className="text-error">*</span>
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Clientwise
            </label>
            <select
              value={clientwise}
              onChange={(e) => setClientwise(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="">Select client</option>
              <option value="client1">Aakash Talreja (Aakash Chanderlal Talreja)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-error text-white rounded-md hover:bg-error-dark">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            List
          </button>
          <button className="px-4 py-2 bg-success text-white rounded-md hover:bg-success-dark">
            Export
          </button>
        </div>

        <div className="text-sm text-error">
          Note: By default, Client-Wise Work Position Report displays the report for all the clients belonging to the branch selected.
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name of the Client (Group)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name of the Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Triggered Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Completed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Time (Days:Hours:Minutes)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Billed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={12} className="px-6 py-4 text-center text-gray-500">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientwiseWorkPosition;