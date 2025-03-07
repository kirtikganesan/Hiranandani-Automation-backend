import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceList = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    client: 'All',
    status: 'all',
    billingFirm: ''
  });

  const [clients, setClients] = useState([]);
  const [billingFirms, setBillingFirms] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch unique clients
    axios.get('http://localhost:5000/api/unique-invoice-clients').then(response => {
      setClients([{ client_name: 'All' }, ...response.data]);
    }).catch(error => {
      console.error('Error fetching clients:', error);
    });

    // Fetch billing firms
    axios.get('http://localhost:5000/api/financial-billing-firms').then(response => {
      setBillingFirms(response.data);
    }).catch(error => {
      console.error('Error fetching billing firms:', error);
    });
  }, []);

  const fetchInvoices = () => {
    axios.get('http://localhost:5000/api/invoices', { params: filters }).then(response => {
      const updatedInvoices = response.data.map(invoice => {
        const today = new Date();
        const invoiceDate = new Date(invoice.Date);
        const daysOverdue = Math.floor((today - invoiceDate) / (1000 * 60 * 60 * 24));
        return { ...invoice, Days_Overdue: daysOverdue };
      });
      setInvoices(updatedInvoices);
    }).catch(error => {
      console.error('Error fetching invoices:', error);
    });
  };

  const handleFilterClick = () => {
    fetchInvoices();
  };

  const handleResetClick = () => {
    setFilters({
      startDate: '',
      endDate: '',
      client: 'All',
      status: 'all',
      billingFirm: ''
    });
    setInvoices([]); // Clear the invoices list
  };

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
            <option value="">Select</option>
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
            </tr>
          </thead>
          <tbody>
            {invoices.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{formatDate(item.Date)}</td>
                <td className="px-4 py-2">{item.Invoice_No}</td>
                <td className="px-4 py-2">{item.Client}</td>
                <td className="px-4 py-2">{item.Gross_Amount}</td>
                <td className="px-4 py-2">{item.Discount_Amount}</td>
                <td className="px-4 py-2">{item.Service_Amount}</td>
                <td className="px-4 py-2">{item.Taxable_Claim_Amount}</td>
                <td className="px-4 py-2">{item.Total_Taxable_Amount}</td>
                <td className="px-4 py-2">{item.CGST}</td>
                <td className="px-4 py-2">{item.SGST}</td>
                <td className="px-4 py-2">{item.IGST}</td>
                <td className="px-4 py-2">{item.Non_Taxable_Amount}</td>
                <td className="px-4 py-2">{item.Total_Bill_Amount}</td>
                <td className="px-4 py-2">{item.Outstanding_Amount}</td>
                <td className="px-4 py-2">{item.Settled_Amount}</td>
                <td className="px-4 py-2">{item.Days_Overdue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
