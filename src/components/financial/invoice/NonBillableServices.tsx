import React, { useState } from 'react';

interface NonBillableService {
  clientName: string;
  completionDate: string;
  mainCategory: string;
  serviceName: string;
  approvedClaim: number;
  unapprovedClaim: number;
  nonBillableRemark: string;
}

const NonBillableServices = () => {
  const [filters, setFilters] = useState({
    type: 'notice',
    client: '',
    serviceMainCategory: '',
    services: '',
    startDate: '',
    endDate: ''
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Non Billable Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.type === 'service'}
                onChange={() => setFilters({...filters, type: 'service'})}
              />
              <span className="ml-2">Service</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.type === 'notice'}
                onChange={() => setFilters({...filters, type: 'notice'})}
              />
              <span className="ml-2">Notice</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.client}
            onChange={(e) => setFilters({...filters, client: e.target.value})}
          >
            <option value="">Select</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Main Category
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.serviceMainCategory}
            onChange={(e) => setFilters({...filters, serviceMainCategory: e.target.value})}
          >
            <option value="">-- Select --</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Services
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.services}
            onChange={(e) => setFilters({...filters, services: e.target.value})}
          >
            <option value="">-- Select --</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.startDate}
            onChange={(e) => setFilters({...filters, startDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.endDate}
            onChange={(e) => setFilters({...filters, endDate: e.target.value})}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Filter
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Reset
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Export
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Completed Services</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Client Name</th>
                <th className="px-4 py-2 text-left">Completion Date</th>
                <th className="px-4 py-2 text-left">Main Category</th>
                <th className="px-4 py-2 text-left">Service Name</th>
                <th className="px-4 py-2 text-left">Approved Claim</th>
                <th className="px-4 py-2 text-left">Unapproved Claim</th>
                <th className="px-4 py-2 text-left">Non Billable Remark</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan={8}>
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NonBillableServices;