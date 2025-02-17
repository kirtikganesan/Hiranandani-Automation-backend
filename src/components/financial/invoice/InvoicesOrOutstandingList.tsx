import React, { useState } from 'react';

interface InvoiceItem {
  date: string;
  invoiceNo: string;
  client: string;
  grossAmount: number;
  discAmount: number;
  serviceAmount: number;
  taxClaimAmt: number;
  totalTaxAmt: number;
  cgst: number;
  sgst: number;
  igst: number;
  nonTaxClaimAmt: number;
  totalBillAmount: number;
  outstandingAmount: number;
  settledAmount: number;
  daysOverdue: number;
  remark: string;
}

const InvoiceList = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    clients: '',
    status: 'all' // all, outstanding, settled
  });

  const mockData: InvoiceItem[] = [
    {
      date: '08/02/2025',
      invoiceNo: 'A/24-25/72',
      client: 'Anjali Khemchandani',
      grossAmount: 1500,
      discAmount: 0,
      serviceAmount: 1500,
      taxClaimAmt: 0,
      totalTaxAmt: 1500,
      cgst: 135,
      sgst: 135,
      igst: 0,
      nonTaxClaimAmt: 0,
      totalBillAmount: 1770,
      outstandingAmount: 1770,
      settledAmount: 0,
      daysOverdue: 9,
      remark: ''
    }
  ];

  const companies = [
    'HIRANANDANI & ASSOCIATES',
    'Hiranandani & Co',
    'Oyster Management Consultants Private Limited',
    'RIA ENTERPRISES',
    'LAL HIRANANDANI HUF',
    'ANJANA ENTERPRISES'
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Invoices/Outstanding List</h1>
      
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
            className="form-radio"
            checked={filters.status === 'all'}
            onChange={() => setFilters({...filters, status: 'all'})}
          />
          <span className="ml-2">All</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            checked={filters.status === 'outstanding'}
            onChange={() => setFilters({...filters, status: 'outstanding'})}
          />
          <span className="ml-2">Outstanding</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
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
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Export With Details
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Invoice No</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Gross Amount</th>
              <th className="px-4 py-2 text-left">Disc. Amt.</th>
              <th className="px-4 py-2 text-left">Service Amount</th>
              <th className="px-4 py-2 text-left">Tax Claim Amt.</th>
              <th className="px-4 py-2 text-left">Total Tax Amt.</th>
              <th className="px-4 py-2 text-left">CGST</th>
              <th className="px-4 py-2 text-left">SGST</th>
              <th className="px-4 py-2 text-left">IGST</th>
              <th className="px-4 py-2 text-left">Non Tax Claim Amt</th>
              <th className="px-4 py-2 text-left">Total Bill Amount</th>
              <th className="px-4 py-2 text-left">Outstanding Amount</th>
              <th className="px-4 py-2 text-left">Settled Amount</th>
              <th className="px-4 py-2 text-left">Days O/s</th>
              <th className="px-4 py-2 text-left">Remark</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.invoiceNo}</td>
                <td className="px-4 py-2">{item.client}</td>
                <td className="px-4 py-2">{item.grossAmount}</td>
                <td className="px-4 py-2">{item.discAmount}</td>
                <td className="px-4 py-2">{item.serviceAmount}</td>
                <td className="px-4 py-2">{item.taxClaimAmt}</td>
                <td className="px-4 py-2">{item.totalTaxAmt}</td>
                <td className="px-4 py-2">{item.cgst}</td>
                <td className="px-4 py-2">{item.sgst}</td>
                <td className="px-4 py-2">{item.igst}</td>
                <td className="px-4 py-2">{item.nonTaxClaimAmt}</td>
                <td className="px-4 py-2">{item.totalBillAmount}</td>
                <td className="px-4 py-2">{item.outstandingAmount}</td>
                <td className="px-4 py-2">{item.settledAmount}</td>
                <td className="px-4 py-2">{item.daysOverdue}</td>
                <td className="px-4 py-2">{item.remark}</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Actions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;