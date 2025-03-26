import React, { useState, useEffect } from 'react';

// Define a TypeScript interface for the client data
interface Client {
  client_name: string;
  full_name?: string;
  total?: number;
  unallotted?: number;
  pastdue?: number;
  probable_overdue?: number;
  high?: number;
  medium?: number;
  low?: number;
  documents?: number;
  billed_outstanding?: number;
  unbilled?: number;
  client_group?: string;
  branch: string;
  email?: string;
  services_prev_year?: string;
  services_curr_year?: string;
  phone?: string;
  constitution?: string;
  client_code?: string;
  parent_company?: string;
  erstwhile_name?: string;
  client_cin?: string;
  client_pan?: string;
  client_tan?: string;
  client_gstin?: string;
  industry?: string;
  business_nature?: string;
  date_of_incorporation?: string;
  branches?: string;
  address_line_1?: string;
  address_line_2?: string;
  area?: string;
  city?: string;
  state?: string;
  district?: string;
  pincode?: string;
  contact?: string;
  number_of_plants?: number;
  accountant_name?: string;
  accountant_number?: string;
  accountant_email?: string;
  file_no?: string;
  file_type?: string;
  file_location?: string;
  member_name?: string;
}

const ClientListReport: React.FC = () => {
  const [branch, setBranch] = useState<string>('Head Office');
  const [name, setName] = useState<string>('');
  const [clients, setClients] = useState<Client[]>([]);
  const [clientNames, setClientNames] = useState<string[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    // Fetch client names when the component mounts
    const fetchClientNames = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/client-details`);
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
      let url = `${backendUrl}/api/client-report?branch=${branch}`;
      if (name && name !== 'All') {
        url += `&name=${name}`;
      }
      const response = await fetch(url);
      const data: Client[] = await response.json();
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
    setName('');
    setClients([]);
    setShowTable(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy my-5 text-center">Client List Report</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
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
              Name
            </label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="All">All</option>
              {clientNames.map((clientName, index) => (
                <option key={index} value={clientName}>
                  {clientName}
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
                <th className="px-6 py-3">Client Name (Name of Group)</th>
                <th className="px-6 py-3">Constitution</th>
                <th className="px-6 py-3">Client Code</th>
                <th className="px-6 py-3">Parent Company</th>
                <th className="px-6 py-3">Erstwhile Name</th>
                <th className="px-6 py-3">Client CIN</th>
                <th className="px-6 py-3">Client PAN</th>
                <th className="px-6 py-3">Client TAN</th>
                <th className="px-6 py-3">Client GSTIN</th>
                <th className="px-6 py-3">Industry</th>
                <th className="px-6 py-3">Business Nature</th>
                <th className="px-6 py-3">Date of Birth/Incorporation</th>
                <th className="px-6 py-3">Branch</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.constitution}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.parent_company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.erstwhile_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_cin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_pan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_tan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.client_gstin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.industry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.business_nature}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.date_of_incorporation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.branch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientListReport;
