import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Client = {
  id: number;
  client_name: string;
};

type ReconciliationData = {
  id: number;
  client_name: string;
  reconciliation_type: 'invoice' | 'receipt';
  start_date: string;
  end_date: string;
};

const TDSReconciliation = () => {
  const [reconciliationType, setReconciliationType] = useState<'invoice' | 'receipt'>('invoice');
  const [selectedClient, setSelectedClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [reconciliationData, setReconciliationData] = useState<ReconciliationData[]>([]);

  useEffect(() => {
    // Fetch client list from the backend
    axios.get('http://localhost:5000/api/clients')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleListClick = () => {
    // Fetch reconciliation data from the backend
    axios.get('http://localhost:5000/api/reconciliation', {
      params: {
        clientName: selectedClient,
        startDate,
        endDate,
        reconciliationType
      }
    })
      .then(response => {
        setReconciliationData(response.data);
      })
      .catch(error => {
        console.error('Error fetching reconciliation data:', error);
      });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">TDS Reconciliation</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Reconciliation based on
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="reconciliationType"
                  value="invoice"
                  checked={reconciliationType === 'invoice'}
                  onChange={(e) => setReconciliationType(e.target.value as 'invoice')}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Invoice</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="reconciliationType"
                  value="receipt"
                  checked={reconciliationType === 'receipt'}
                  onChange={(e) => setReconciliationType(e.target.value as 'receipt')}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Receipt</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Client
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.client_name}>
                  {client.client_name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleListClick}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            List
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {reconciliationData.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reconciliation Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reconciliationData.map((data) => (
                <tr key={data.id}>
                  <td className="px-6 py-4 text-sm">{data.client_name}</td>
                  <td className="px-6 py-4 text-sm">{data.reconciliation_type}</td>
                  <td className="px-6 py-4 text-sm">{data.start_date}</td>
                  <td className="px-6 py-4 text-sm">{data.end_date}</td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No data found in the server
          </div>
        )}
      </div>
    </div>
  );
};

export default TDSReconciliation;
