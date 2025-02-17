import React, { useState } from 'react';

interface CompletedService {
  clientCode: string;
  clientName: string;
  mainCategory: string;
  serviceName: string;
  basicAmount: number;
  approvedClaim: number;
  unapprovedClaim: number;
}

const SingleInvoice = () => {
  const [filters, setFilters] = useState({
    groupWise: false,
    client: '',
    serviceMainCategory: '',
    services: ''
  });

  const mockData: CompletedService[] = [
    {
      clientCode: 'TCQ Enterprises',
      clientName: 'Ganesh Harne (TCQ Enterprises)',
      mainCategory: 'Accounting and Book Keeping (Non Corporate)',
      serviceName: 'Accounting|Monthly|Nov-2024',
      basicAmount: 0,
      approvedClaim: 0,
      unapprovedClaim: 0
    },
    {
      clientCode: 'Shraddha Corporation',
      clientName: 'Shraddha Corporation',
      mainCategory: 'Accounting -Monthly',
      serviceName: 'Accounting |Annually|Apr-2023-Mar-2024',
      basicAmount: 6000,
      approvedClaim: 0,
      unapprovedClaim: 0
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Single Invoice</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="flex items-center gap-4 text-sm font-medium text-gray-700">
            Group wise
            <div className="space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={filters.groupWise}
                  onChange={() => setFilters({...filters, groupWise: true})}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={!filters.groupWise}
                  onChange={() => setFilters({...filters, groupWise: false})}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </label>
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
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Filter
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Reset
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span>Show</span>
        <select className="border border-gray-300 rounded-md p-1">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span>entries</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left"></th>
              <th className="px-4 py-2 text-left">Client Code</th>
              <th className="px-4 py-2 text-left">Client Name</th>
              <th className="px-4 py-2 text-left">Main Category</th>
              <th className="px-4 py-2 text-left">Service Name</th>
              <th className="px-4 py-2 text-left">Basic Amount</th>
              <th className="px-4 py-2 text-left">Approved Claim</th>
              <th className="px-4 py-2 text-left">Unapproved Claim</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="px-4 py-2">{item.clientCode}</td>
                <td className="px-4 py-2">{item.clientName}</td>
                <td className="px-4 py-2">{item.mainCategory}</td>
                <td className="px-4 py-2">{item.serviceName}</td>
                <td className="px-4 py-2">{item.basicAmount}</td>
                <td className="px-4 py-2">{item.approvedClaim}</td>
                <td className="px-4 py-2">{item.unapprovedClaim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleInvoice;