import React, { useState, useEffect } from 'react';
import InvoiceDetails from './InvoiceDetails'; // Import the new component

interface CompletedService {
  Client_Code: string;
  Client_Name: string;
  Main_Category: string;
  Service_Name: string;
  Basic_Amount: number;
  Approved_Claim: number;
  Unapproved_Claim: number;
}

const SingleInvoice = () => {
  const [filters, setFilters] = useState({
    client: '',
    serviceMainCategory: '',
    services: ''
  });

  const [uniqueClients, setUniqueClients] = useState<string[]>([]);
  const [uniqueMainCategories, setUniqueMainCategories] = useState<string[]>([]);
  const [uniqueServices, setUniqueServices] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<CompletedService[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [entriesToShow, setEntriesToShow] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showInvoice, setShowInvoice] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    fetch(`${backendUrl}/api/unique-options`)
      .then(response => response.json())
      .then(data => {
        setUniqueClients(data.clients);
        setUniqueMainCategories(data.mainCategories);
        setUniqueServices(data.services);
      })
      .catch(error => console.error('Error fetching unique options:', error));
  }, []);

  const handleFilterClick = () => {
    fetch(`${backendUrl}/api/filtered-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filters)
    })
      .then(response => response.json())
      .then(data => {
        setFilteredData(data);
        setCurrentPage(1);
      })
      .catch(error => console.error('Error fetching filtered data:', error));
  };

  const handleResetClick = () => {
    setFilters({
      client: '',
      serviceMainCategory: '',
      services: ''
    });
    setFilteredData([]);
    setCurrentPage(1);
  };

  const handleNextClick = () => {
    if ((currentPage) * entriesToShow < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedRows(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  const handleRaiseBillClick = () => {
    const selectedClients = Array.from(selectedRows).map(index => filteredData[index].Client_Name);
    const uniqueSelectedClients = [...new Set(selectedClients)];

    if (uniqueSelectedClients.length === 0) {
      setErrorMessage('Select at least 1 client.');
    } else if (uniqueSelectedClients.length > 1) {
      setErrorMessage('Select only one client.');
    } else {
      setShowInvoice(true);
      setErrorMessage('');
    }
  };

  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Single Invoice</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
            {uniqueClients.map((client, index) => (
              <option key={index} value={client}>
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
            {uniqueMainCategories.map((category, index) => (
              <option key={index} value={category}>
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
            {uniqueServices.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleFilterClick}
        >
          Filter
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span>Show</span>
        <select
          className="border border-gray-300 rounded-md p-1"
          value={entriesToShow}
          onChange={(e) => setEntriesToShow(Number(e.target.value))}
        >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span>entries</span>
      </div>

      {filteredData.length > 0 ? (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Select</th>
                <th className="px-4 py-2 text-left">Client Code</th>
                <th className="px-4 py-2 text-left">Client Name</th>
                <th className="px-4 py-2 text-left">Main Category</th>
                <th className="px-4 py-2 text-left">Service Name</th>
                <th className="px-4 py-2 text-left">Basic Amount</th>
                <th className="px-4 py-2 text-left">Approved Claim</th>
                <th className="px-4 py-2 text-left">Unapproved Claim</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(startIndex + index)}
                      onChange={() => handleCheckboxChange(startIndex + index)}
                    />
                  </td>
                  <td className="px-4 py-2">{item.Client_Code}</td>
                  <td className="px-4 py-2">{item.Client_Name}</td>
                  <td className="px-4 py-2">{item.Main_Category}</td>
                  <td className="px-4 py-2">{item.Service_Name}</td>
                  <td className="px-4 py-2">{item.Basic_Amount}</td>
                  <td className="px-4 py-2">{item.Approved_Claim}</td>
                  <td className="px-4 py-2">{item.Unapproved_Claim}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={handlePreviousClick}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={handleNextClick}
              disabled={endIndex >= filteredData.length}
            >
              Next
            </button>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleRaiseBillClick}
            >
              Raise Bill
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => alert('Non-Billable clicked')}
            >
              Non-Billable
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      ) : (
        <p className="text-center text-gray-500">No records found</p>
      )}

      {showInvoice && <InvoiceDetails data={currentData.filter((_, i) => selectedRows.has(startIndex + i))} setShowInvoice={setShowInvoice} />}
    </div>
  );
};

export default SingleInvoice;
