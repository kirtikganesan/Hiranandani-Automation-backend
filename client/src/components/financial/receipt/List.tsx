import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Receipt {
  receipt_no: string;
  date: string;
  type: string;
  client_name: string;
  amount: number;
  tds: number;
  discount: number;
  mode: string;
  mode_details: string;
  billing_firm: string;
}

const List = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    clients: '',
    billingFirm: ''
  });

  const [clients, setClients] = useState<string[]>([]);
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [receiptList, setReceiptList] = useState<Receipt[]>([]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch unique clients
    axios.get('https://hiranandani-automation.onrender.com/api/unique-receipt-clients')
      .then(response => {
        if (Array.isArray(response.data)) {
          setClients(response.data.map((client: { client_name: string }) => client.client_name));
        } else {
          console.error("Unexpected data format for clients:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching unique clients:", error);
      });

    // Fetch billing firms
    axios.get('https://hiranandani-automation.onrender.com/api/financial-billing-firms')
      .then(response => {
        if (Array.isArray(response.data)) {
          setBillingFirms(response.data.map((firm: { billing_firm: string }) => firm.billing_firm));
        } else {
          console.error("Unexpected data format for billing firms:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching billing firms:", error);
      });
  }, []);

  const fetchReceiptList = () => {
    const { startDate, endDate, clients, billingFirm } = filters;
    let query = 'https://hiranandani-automation.onrender.com/api/receipt-list?';
  
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (clients) params.append('clients', clients);
    if (billingFirm) params.append('billingFirm', billingFirm);
  
    query += params.toString();
  
    axios.get(query)
      .then(response => {
        const receiptList = response.data.map((item: Receipt) => ({
          ...item,
          amount: typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount,
          tds: typeof item.tds === 'string' ? parseFloat(item.tds) : item.tds,
          discount: typeof item.discount === 'string' ? parseFloat(item.discount) : item.discount
        }));
  
        // Log to check the types
        console.log(receiptList);
  
        setReceiptList(receiptList);
      })
      .catch(error => {
        console.error("Error fetching receipt list:", error);
      });
  };

  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      clients: '',
      billingFirm: ''
    });
  };
  
  
  

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Receipt List</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
              <option key={index} value={client}>{client}</option>
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
              <option key={index} value={firm}>{firm}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={fetchReceiptList}
        >
          List
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={handleReset}>
          Reset
        </button>
        
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Receipt No</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Client Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">TDS</th>
              <th className="px-4 py-2 text-left">Discount</th>
              <th className="px-4 py-2 text-left">Mode</th>
              <th className="px-4 py-2 text-left">Mode Details</th>
              <th className="px-4 py-2 text-left">Billing Firm</th>
            </tr>
          </thead>
          <tbody>
            {receiptList.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{item.receipt_no}</td>
                <td className="px-4 py-2">{formatDate(item.date)}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">{item.client_name}</td>
                <td className="px-4 py-2">{item.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{item.tds.toFixed(2)}</td>
                <td className="px-4 py-2">{item.discount.toFixed(2)}</td>
                <td className="px-4 py-2">{item.mode}</td>
                <td className="px-4 py-2">{item.mode_details}</td>
                <td className="px-4 py-2">{item.billing_firm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
