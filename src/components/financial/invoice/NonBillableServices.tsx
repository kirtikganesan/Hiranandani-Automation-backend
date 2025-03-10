import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define an interface for the backend response
interface BackendResponse {
  id: number;
  client_name: string;
  completion_date: string;
  main_category: string;
  service_name: string;
  approved_claim: number;
  unapproved_claim: number;
  non_billable_remark: string;
}

// Define an interface for the frontend data structure
interface NonBillableService {
  clientName: string;
  completionDate: string;
  mainCategory: string;
  serviceName: string;
  approvedClaim: number;
  unapprovedClaim: number;
  nonBillableRemark: string;
}

const NonBillableServices = () => {
  const [filters, setFilters] = useState({
    type: 'notice',
    client: '',
    serviceMainCategory: '',
    services: '',
    startDate: '',
    endDate: ''
  });

  const [clients, setClients] = useState<string[]>([]);
  const [mainCategories, setMainCategories] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<NonBillableService[]>([]);

  useEffect(() => {
    const fetchUniqueValues = async () => {
      try {
        const [clientsResponse, mainCategoriesResponse, servicesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/unique-non-billable-clients'),
          axios.get('http://localhost:5000/api/unique-non-billable-main-categories'),
          axios.get('http://localhost:5000/api/unique-non-billable-services')
        ]);

        setClients(clientsResponse.data);
        setMainCategories(mainCategoriesResponse.data);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error('Error fetching unique values:', error);
      }
    };

    fetchUniqueValues();
  }, []);

  const handleFilter = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/non-billable-services', {
        params: filters
      });
      console.log('Fetched Data:', response.data); // Log the fetched data

      // Map the backend response to the frontend structure
      const mappedData = response.data.map((item: BackendResponse) => ({
        clientName: item.client_name,
        completionDate: item.completion_date.split('T')[0], // Format the date
        mainCategory: item.main_category,
        serviceName: item.service_name,
        approvedClaim: item.approved_claim,
        unapprovedClaim: item.unapproved_claim,
        nonBillableRemark: item.non_billable_remark
      }));

      setFilteredData(mappedData);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  const handleReset = () => {
    setFilters({
      type: 'notice',
      client: '',
      serviceMainCategory: '',
      services: '',
      startDate: '',
      endDate: ''
    });
    setFilteredData([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Non Billable Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
        

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.client}
            onChange={(e) => setFilters({...filters, client: e.target.value})}
          >
            <option value="">Select</option>
            {clients.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Main Category
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.serviceMainCategory}
            onChange={(e) => setFilters({...filters, serviceMainCategory: e.target.value})}
          >
            <option value="">-- Select --</option>
            {mainCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Services
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.services}
            onChange={(e) => setFilters({...filters, services: e.target.value})}
          >
            <option value="">-- Select --</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

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
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleFilter}
        >
          Filter
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          onClick={handleReset}
        >
          Reset
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Export
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Completed Services</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Client Name</th>
                <th className="px-4 py-2 text-left">Completion Date</th>
                <th className="px-4 py-2 text-left">Main Category</th>
                <th className="px-4 py-2 text-left">Service Name</th>
                <th className="px-4 py-2 text-left">Approved Claim</th>
                <th className="px-4 py-2 text-left">Unapproved Claim</th>
                <th className="px-4 py-2 text-left">Non Billable Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((service, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{service.clientName}</td>
                    <td className="px-4 py-2">{service.completionDate}</td>
                    <td className="px-4 py-2">{service.mainCategory}</td>
                    <td className="px-4 py-2">{service.serviceName}</td>
                    <td className="px-4 py-2">{service.approvedClaim}</td>
                    <td className="px-4 py-2">{service.unapprovedClaim}</td>
                    <td className="px-4 py-2">{service.nonBillableRemark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center" colSpan={7}>
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NonBillableServices;
