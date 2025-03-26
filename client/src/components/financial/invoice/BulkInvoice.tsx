import React, { useState } from 'react';

interface BulkInvoiceFilters {
  startDate: string;
  endDate: string;
  serviceMainCategory: string;
  services: string;
  branch: string;
  clients: string;
  billingFirm: string;
  billDate: string;
}

const BulkInvoice = () => {
  const [filters, setFilters] = useState<BulkInvoiceFilters>({
    startDate: '',
    endDate: '',
    serviceMainCategory: '',
    services: '',
    branch: '',
    clients: '',
    billingFirm: '',
    billDate: ''
  });

  const handleDateChange = (field: keyof BulkInvoiceFilters, value: string) => {
    setFilters(prev => ({...prev, [field]: value}));
  };
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Bulk Invoice</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
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
            onChange={(e) => handleDateChange('endDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Main Category<span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.serviceMainCategory}
            onChange={(e) => handleDateChange('serviceMainCategory', e.target.value)}
          >
            <option value="">-- Select --</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Services<span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.services}
            onChange={(e) => handleDateChange('services', e.target.value)}
          >
            <option value="">Select</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Branch
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.branch}
            onChange={(e) => handleDateChange('branch', e.target.value)}
          >
            <option value="">-- Select --</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clients
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.clients}
            onChange={(e) => handleDateChange('clients', e.target.value)}
          >
            <option value="">Select</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Billing Firm<span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.billingFirm}
            onChange={(e) => handleDateChange('billingFirm', e.target.value)}
          >
            <option value="">Select</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bill Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.billDate}
            onChange={(e) => handleDateChange('billDate', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Primary contact</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Secondary contact</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Generate Bill
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Cancel
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Filter
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Reset
        </button>
      </div>
    </div>
  );
};

export default BulkInvoice;