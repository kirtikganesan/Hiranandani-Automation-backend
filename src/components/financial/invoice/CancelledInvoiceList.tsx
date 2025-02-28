import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Client {
  client_name: string;
}

interface BillingFirm {
  billing_firm: string;
}

interface DataItem {
  Date: string;
  Invoice_No: string;
  Client: string;
  Service_Amt: number;
  Tax_Claim: number;
  Total_Tax_Amt: number;
  CGST: number;
  SGST: number;
  IGST: number;
  Non_Tax_Claim: number;
  Total_Bill_Amt: number;
  Outstanding_Amount: number;
  Discount_Amt: number;
  Days_Since: number;
  Reason: string;
}

const CancelledInvoiceList = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    client: 'All',
    status: 'all',
    billingFirm: 'All'
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [billingFirms, setBillingFirms] = useState<BillingFirm[]>([]);
  const [data, setData] = useState<DataItem[]>([]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch unique clients
    axios.get<Client[]>('http://localhost:5000/api/unique-invoice-clients').then(response => {
      setClients([{ client_name: 'All' }, ...response.data]);
    }).catch(error => {
      console.error('Error fetching clients:', error);
    });

    // Fetch billing firms
    axios.get<BillingFirm[]>('http://localhost:5000/api/financial-billing-firms').then(response => {
      setBillingFirms([{ billing_firm: 'All' }, ...response.data]);
    }).catch(error => {
      console.error('Error fetching billing firms:', error);
    });
  }, []);

  const fetchData = () => {
    axios.get<DataItem[]>('http://localhost:5000/api/cancelled-invoices', { params: filters }).then(response => {
      setData(response.data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  const handleFilterClick = () => {
    fetchData();
  };

  const handleResetClick = () => {
    setFilters({
      startDate: '',
      endDate: '',
      client: 'All',
      status: 'all',
      billingFirm: 'All'
    });
    setData([]); // Clear the data list
  };

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
            value={filters.client}
            onChange={(e) => setFilters({...filters, client: e.target.value})}
          >
            {clients.map((client, index) => (
              <option key={index} value={client.client_name}>
                {client.client_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Billing Firm
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.billingFirm}
            onChange={(e) => setFilters({...filters, billingFirm: e.target.value})}
          >
            {billingFirms.map((firm, index) => (
              <option key={index} value={firm.billing_firm}>
                {firm.billing_firm}
              </option>
            ))}
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

      <div className="flex justify-end gap-2 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleFilterClick}
        >
          Filter
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          onClick={handleResetClick}
        >
          Reset
        </button>
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
              <th className="px-4 py-2 text-left">Discount Amt</th>
              <th className="px-4 py-2 text-left">Days Since</th>
              <th className="px-4 py-2 text-left">Reason</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2">{formatDate(item.Date)}</td>
                  <td className="px-4 py-2">{item.Invoice_No}</td>
                  <td className="px-4 py-2">{item.Client}</td>
                  <td className="px-4 py-2">{item.Service_Amt}</td>
                  <td className="px-4 py-2">{item.Tax_Claim}</td>
                  <td className="px-4 py-2">{item.Total_Tax_Amt}</td>
                  <td className="px-4 py-2">{item.CGST}</td>
                  <td className="px-4 py-2">{item.SGST}</td>
                  <td className="px-4 py-2">{item.IGST}</td>
                  <td className="px-4 py-2">{item.Non_Tax_Claim}</td>
                  <td className="px-4 py-2">{item.Total_Bill_Amt}</td>
                  <td className="px-4 py-2">{item.Outstanding_Amount}</td>
                  <td className="px-4 py-2">{item.Discount_Amt}</td>
                  <td className="px-4 py-2">{item.Days_Since}</td>
                  <td className="px-4 py-2">{item.Reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={15}>
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {data.length} entries
        </div>
      </div>
    </div>
  );
};

export default CancelledInvoiceList;
