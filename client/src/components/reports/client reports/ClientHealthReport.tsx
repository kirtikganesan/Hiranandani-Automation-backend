import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Client {
  client_id: string;
  client_name: string;
}

const ClientHealthReport = () => {
  const [branch, setBranch] = useState('head-office');
  const [client, setClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [showTable, setShowTable] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    // Fetch client options from the endpoint
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/client-details`);
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleListClick = () => {
    setShowTable(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">Client Health Report</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="head-office">Head Office</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.client_id} value={client.client_id}>
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
          <button
            type="button"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-success hover:bg-success-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success"
          >
            Export
          </button>
        </div>

        <div className="flex space-x-4 pt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-sm">Completed within Due Date</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-sm">Completed Late</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-sm">Cancelled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-sm">WIP</span>
          </div>
        </div>
      </div>

      {showTable && (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Name of the Service</th>
                <th className="px-6 py-3">Period</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">Completion Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Estimated Time</th>
                <th className="px-6 py-3">Time Spent</th>
                <th className="px-6 py-3">Billed Amount</th>
                <th className="px-6 py-3">Receipt Amount</th>
                <th className="px-6 py-3">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={11} className="px-6 py-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientHealthReport;
