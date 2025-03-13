import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Client = {
  client_name: string;
};

type ReconciliationData = {
  Client: string;
  TAN: string | null;
  Date: string;
  Number: string;
  Billing_Firm: string;
  Taxable_Amount: number;
  TDS_Amount_bf: number;
  FY_from_which_bf: string;
  TDS_deducted_Current_year: number;
  TDS_Claim_Current_year: number;
  TDS_cf: number;
  TDS_appearing_in_26AS: 'yes' | 'no';
};

const TDSReconciliation = () => {
  const [selectedClient, setSelectedClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [reconciliationData, setReconciliationData] = useState<ReconciliationData[]>([]);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch distinct client list from the backend
    axios.get('https://hiranandani-automation.onrender.com/api/unique-clients-in-reconciliation')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleListClick = () => {
    // Fetch reconciliation data from the backend based on selected filters
    axios.get('https://hiranandani-automation.onrender.com/api/tds-reconciliation', {
      params: {
        clientName: selectedClient,
        startDate,
        endDate
      }
    })
      .then(response => {
        console.log('Fetched data:', response.data); // Log the fetched data
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
              Client
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="">Select client</option>
              {clients.map((client, index) => (
                <option key={index} value={client.client_name}>
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

      <div className="overflow-x-auto rounded-lg shadow">
        {reconciliationData.length > 0 ? (
          <table className="w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">TAN</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Number</th>
                <th className="px-6 py-3">Billing Firm</th>
                <th className="px-6 py-3 ">Taxable Amount</th>
                <th className="px-6 py-3 ">TDS Amount b/f</th>
                <th className="px-6 py-3">F. Y. from which b/f</th>
                <th className="px-6 py-3 ">TDS deducted in Current</th>
                <th className="px-6 py-3 ">TDS Claim Current year</th>
                <th className="px-6 py-3 ">TDS c/f</th>
                <th className="px-6 py-3 ">TDS appearing in 26AS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reconciliationData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm">{data.Client}</td>
                  <td className="px-6 py-4 text-sm">{data.TAN}</td>
                  <td className="px-6 py-4 text-sm">{formatDate(data.Date)}</td>
                  <td className="px-6 py-4 text-sm">{data.Number}</td>
                  <td className="px-6 py-4 text-sm">{data.Billing_Firm}</td>
                  <td className="px-6 py-4 text-right text-sm">{data.Taxable_Amount}</td>
                  <td className="px-6 py-4 text-right text-sm">{data.TDS_Amount_bf}</td>
                  <td className="px-6 py-4 text-sm">{data.FY_from_which_bf}</td>
                  <td className="px-6 py-4 text-right text-sm">{data.TDS_deducted_Current_year}</td>
                  <td className="px-6 py-4 text-right text-sm">{data.TDS_Claim_Current_year}</td>
                  <td className="px-6 py-4 text-right text-sm">{data.TDS_cf}</td>
                  <td className="px-6 py-4 text-center text-sm">{data.TDS_appearing_in_26AS}</td>
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
