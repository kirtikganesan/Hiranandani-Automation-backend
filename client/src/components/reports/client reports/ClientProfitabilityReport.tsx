import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Client {
  client_id: string;
  client_name: string;
}

interface Service {
  clientName: string;
  serviceName: string;
  period: string;
  employeeName: string;
  costPerHour: number;
  timeSpent: string;
  totalEmployeeCost: number;
  billableClaims: number;
  nonBillableClaims: number;
  totalCostToFirm: number;
}

const ClientProfitabilityReport = () => {
  const [branch, setBranch] = useState('head-office');
  const [client, setClient] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Fetch client options from the endpoint
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://hiranandani-automation.onrender.com/api/client-details');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    // Check date conditions and update the state
    const start = new Date(startDate);
    const end = new Date(endDate);
    const thresholdDate = new Date('2024-11-28');

    if (start < thresholdDate && end > start) {
      setShowTable(true);
      // Filter services data based on the selected client
      const filteredServices = dummyData.filter((service) => {
        if (client === 'all') return true;
        return service.clientName.includes(client);
      });
      setServices(filteredServices);
    } else {
      setShowTable(false);
      setServices([]);
    }
  }, [startDate, endDate, client]);

  const handleListClick = () => {
    // Trigger the date check logic
    const start = new Date(startDate);
    const end = new Date(endDate);
    const thresholdDate = new Date('2024-11-28');

    if (start < thresholdDate && end > start) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  };

  // Dummy data for demonstration
  const dummyData: Service[] = [
    {
      clientName: 'Praveen Hazari (Praveen Tirathdas Hazari)(PARAS NOVELTY THE PARTY SHOP)',
      serviceName: 'GST Registration (Non Corporate)|2024-2025',
      period: '2024-2025',
      employeeName: 'Sunny Gurbani',
      costPerHour: 0,
      timeSpent: '01:15',
      totalEmployeeCost: 0,
      billableClaims: 0,
      nonBillableClaims: 0,
      totalCostToFirm: 0
    },
    {
      clientName: 'Dayal Raghuwanshi (Dayal Sukhumal Raghuwanshi)',
      serviceName: 'ITR for Non Audit cases (Non Corporate)|Annually|Apr-2022-Mar-2023',
      period: 'Apr-2022-Mar-2023',
      employeeName: 'Sunny Gurbani',
      costPerHour: 0,
      timeSpent: '01:30',
      totalEmployeeCost: 0,
      billableClaims: 0,
      nonBillableClaims: 0,
      totalCostToFirm: 0
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">Client Profitability Report</h2>
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
              <option value="all">All</option>
              {clients.map((client) => (
                <option key={client.client_id} value={client.client_name}>
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

      {showTable && (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3">Client Name</th>
                <th className="px-6 py-3">Service Name | Period</th>
                <th className="px-6 py-3">Employee Name</th>
                <th className="px-6 py-3">Cost per Hour</th>
                <th className="px-6 py-3">Time Spent by Employee</th>
                <th className="px-6 py-3">Total Employee Cost</th>
                <th className="px-6 py-3">Claims / Expenses Billable</th>
                <th className="px-6 py-3">Claims / Expenses Non-billable</th>
                <th className="px-6 py-3">Total Cost to Firm (Employee Cost + Claims)</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.serviceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.employeeName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.costPerHour}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.timeSpent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.totalEmployeeCost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.billableClaims}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.nonBillableClaims}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.totalCostToFirm}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
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

export default ClientProfitabilityReport;
