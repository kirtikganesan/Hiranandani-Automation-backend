import React, { useState, useEffect } from 'react';

const ClientwiseWorkPosition = () => {
  const [branch, setBranch] = useState('head-office');
  const [serviceType, setServiceType] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientwise, setClientwise] = useState('');
  const [clients, setClients] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    // Fetch client options from the backend
    fetch(`${backendUrl}/api/clients`)
      .then(response => response.json())
      .then(data => {
        setClients(data.map((item: { client_name: string }) => item.client_name));
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleListClick = () => {
    setShowTable(true);
    // Here you can add logic to fetch data and populate the table
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">Clientwise Work Position Report</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Branch<span className="text-error">*</span>
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="head-office">Head Office</option>
              <option value="varsha-office">Varsha Badlani's Office</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Service Type<span className="text-error">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="serviceType"
                  value="all"
                  checked={serviceType === 'all'}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>All</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="serviceType"
                  value="pending"
                  checked={serviceType === 'pending'}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Pending</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              From Date<span className="text-error">*</span>
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              To Date<span className="text-error">*</span>
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Clientwise
            </label>
            <select
              value={clientwise}
              onChange={(e) => setClientwise(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="">Select client</option>
              {clients.map((client, index) => (
                <option key={index} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
        <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            onClick={handleListClick}
          >
            List
          </button>
          <button className="px-4 py-2 bg-error text-white rounded-md hover:bg-error-dark">
            Cancel
          </button>
          
      
        </div>

        <div className="text-sm text-error">
          Note: By default, Client-Wise Work Position Report displays the report for all the clients belonging to the branch selected.
        </div>
      </div>

      {showTable && (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name of the Client (Group)</th>
                <th className="px-6 py-3 text-left">Branch</th>
                <th className="px-6 py-3 text-left">Name of the Service</th>
                <th className="px-6 py-3 text-left">Triggered Date</th>
                <th className="px-6 py-3 text-left">Completion Date</th>
                <th className="px-6 py-3 text-left">Due Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">% Completed</th>
                <th className="px-6 py-3 text-left">Staff</th>
                <th className="px-6 py-3 text-left">Estimated Time (Days:Hours:Minutes)</th>
                <th className="px-6 py-3 text-left">Hours Spent</th>
                <th className="px-6 py-3 text-left">Amount Billed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={12} className="px-6 py-4 text-center text-gray-500">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientwiseWorkPosition;
