import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AdvanceReceipt {
  receiptNo: string;
  date: string;
  clientName: string;
  grossAdvanceAmount: number;
  tds: number;
  amount: number;
  adjustedTDS: number;
  adjustedAmount: number;
  balanceAmount: number;
  mode: string;
}

interface Client {
  client_name: string;
}

interface BillingFirm {
  billing_firm: string;
}

const AdvanceList = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    clients: '',
    billingFirm: ''
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [billingFirms, setBillingFirms] = useState<BillingFirm[]>([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Fetch clients
    axios.get('http://localhost:5000/api/clients')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });

    // Fetch billing firms
    axios.get('http://localhost:5000/api/financial-billing-firms')
      .then(response => {
        setBillingFirms(response.data);
      })
      .catch(error => {
        console.error('Error fetching billing firms:', error);
      });
  }, []);

  const handleFilter = () => {
    setShowTable(true);
  };

  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      clients: '',
      billingFirm: ''
    });
    setShowTable(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Advance Receipt List</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

      <div className="flex justify-end gap-2 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleFilter}
        >
          Filter
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {showTable && (
        <>
          

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Receipt No</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Client Name</th>
                  <th className="px-4 py-2 text-left">Gross Advance Amount</th>
                  <th className="px-4 py-2 text-left">TDS</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Adjusted TDS</th>
                  <th className="px-4 py-2 text-left">Adjusted Amount</th>
                  <th className="px-4 py-2 text-left">Balance Amount</th>
                  <th className="px-4 py-2 text-left">Mode</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-center" colSpan={11}>
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          
        </>
      )}
    </div>
  );
};

export default AdvanceList;
