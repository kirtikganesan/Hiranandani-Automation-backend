import React, { useState, useEffect } from 'react';

// Define a TypeScript interface for the client data
interface Client {
  client_name: string;
  contact?: string;
  email?: string;
}

const TelephoneList: React.FC = () => {
  const [branch, setBranch] = useState<string>('Head Office');
  const [clientName, setClientName] = useState<string>('');
  const [clients, setClients] = useState<Client[]>([]);
  const [clientNames, setClientNames] = useState<string[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);

  useEffect(() => {
    // Fetch client names when the component mounts
    const fetchClientNames = async () => {
      try {
        const response = await fetch('https://hiranandani-automation.onrender.com/api/client-details');
        const data: { client_name: string }[] = await response.json();
        setClientNames(data.map(client => client.client_name));
      } catch (error) {
        console.error('Error fetching client names:', error);
      }
    };

    fetchClientNames();
  }, []);

  const fetchClientData = async () => {
    try {
      let url = `https://hiranandani-automation.onrender.com/api/client-report?branch=${encodeURIComponent(branch)}`;
      if (clientName && clientName !== 'All') {
        url += `&name=${encodeURIComponent(clientName)}`;
      }
      console.log('Fetching data from URL:', url); // Log the URL for debugging
      const response = await fetch(url);
      const data: Client[] = await response.json();
      console.log('Fetched data:', data); // Log the fetched data for debugging
      setClients(data);
      setShowTable(true);
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };
  

  const handleListClick = () => {
    fetchClientData();
  };

  const handleResetClick = () => {
    setBranch('Head Office');
    setClientName('');
    setClients([]);
    setShowTable(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">Telephone List</h2>
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
              <option value="Head Office">Head Office</option>
              <option value="Varsha Badlani's Office">Varsha Badlani's Office</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <select
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="All">All</option>
              {clientNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleListClick}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            List
          </button>
          <button
            onClick={handleResetClick}
            className="px-4 py-2 bg-error text-white rounded-md hover:bg-error-dark"
          >
            Reset
          </button>

        </div>
      </div>

      {showTable && (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3">Name of Client (Group)</th>
                <th className="px-6 py-3">Mobile Number</th>
                <th className="px-6 py-3">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {clients.length > 0 ? (
                clients.map((client, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TelephoneList;
