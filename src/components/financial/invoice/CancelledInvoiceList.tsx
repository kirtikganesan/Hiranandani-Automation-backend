import React, { useState } from 'react';

interface CancelledInvoice {
  date: string;
  invoiceNo: string;
  client: string;
  serviceAmt: number;
  taxClaimAmt: number;
  totalTaxAmt: number;
  cgst: number;
  sgst: number;
  igst: number;
  nonTaxClaimAmt: number;
  billAmount: number;
  outstandingAmt: number;
  discAmt: number;
  daysSince: number;
  reason: string;
}

const CancelledInvoiceList = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    clients: '',
    status: 'all'
  });

  const companies = [
    'HIRANANDANI & ASSOCIATES',
    'Hiranandani & Co',
    'Oyster Management Consultants Private Limited',
    'RIA ENTERPRISES',
    'LAL HIRANANDANI HUF',
    'ANJANA ENTERPRISES'
  ];

  const mockData: CancelledInvoice[] = [
    {
      date: '23/12/2024',
      invoiceNo: 'A/24-25/39',
      client: 'Pritham Liquor Private Limited (Pritham)',
      serviceAmt: 5000,
      taxClaimAmt: 0,
      totalTaxAmt: 5000,
      cgst: 450,
      sgst: 450,
      igst: 0,
      nonTaxClaimAmt: 0,
      billAmount: 5900,
      outstandingAmt: 5900,
      discAmt: 0,
      daysSince: 56,
      reason: 'wrongly made'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Cancelled Invoice List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clients
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.clients}
            onChange={(e) => setFilters({...filters, clients: e.target.value})}
          >
            <option value="">Select</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="status"
            className="form-radio"
            checked={filters.status === 'all'}
            onChange={() => setFilters({...filters, status: 'all'})}
          />
          <span className="ml-2">All</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="status"
            className="form-radio"
            checked={filters.status === 'outstanding'}
            onChange={() => setFilters({...filters, status: 'outstanding'})}
          />
          <span className="ml-2">Outstanding</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="status"
            className="form-radio"
            checked={filters.status === 'settled'}
            onChange={() => setFilters({...filters, status: 'settled'})}
          />
          <span className="ml-2">Settled</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {companies.map((company, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md text-sm ${
              index === 0 ? 'bg-green-500 text-white' : 'text-blue-600 hover:underline'
            }`}
          >
            {company}
          </button>
        ))}
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
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Invoice No</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Service Amt</th>
              <th className="px-4 py-2 text-left">Tax Claim Amt</th>
              <th className="px-4 py-2 text-left">Total Tax Amt</th>
              <th className="px-4 py-2 text-left">CGST</th>
              <th className="px-4 py-2 text-left">SGST</th>
              <th className="px-4 py-2 text-left">IGST</th>
              <th className="px-4 py-2 text-left">Non Tax Claim Amt</th>
              <th className="px-4 py-2 text-left">Bill Amount</th>
              <th className="px-4 py-2 text-left">Outstanding Amt</th>
              <th className="px-4 py-2 text-left">Disc. Amt</th>
              <th className="px-4 py-2 text-left">Days Since</th>
              <th className="px-4 py-2 text-left">Reason</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.invoiceNo}</td>
                <td className="px-4 py-2">{item.client}</td>
                <td className="px-4 py-2">{item.serviceAmt}</td>
                <td className="px-4 py-2">{item.taxClaimAmt}</td>
                <td className="px-4 py-2">{item.totalTaxAmt}</td>
                <td className="px-4 py-2">{item.cgst}</td>
                <td className="px-4 py-2">{item.sgst}</td>
                <td className="px-4 py-2">{item.igst}</td>
                <td className="px-4 py-2">{item.nonTaxClaimAmt}</td>
                <td className="px-4 py-2">{item.billAmount}</td>
                <td className="px-4 py-2">{item.outstandingAmt}</td>
                <td className="px-4 py-2">{item.discAmt}</td>
                <td className="px-4 py-2">{item.daysSince}</td>
                <td className="px-4 py-2">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing 1 to {mockData.length} of {mockData.length} entries
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded">Previous</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CancelledInvoiceList;