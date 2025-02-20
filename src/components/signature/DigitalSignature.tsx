import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, X } from 'lucide-react';
import axios from 'axios';

type Signature = {
  id: number;
  client: string;
  member_name: string;
  location: string;
  additionalInfo: string;
  date_of_received: string;
  date_of_expiry: string;
  password: string;
  received_by: string;
};

const DigitalSignature = () => {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<'all' | 'live' | 'expired'>('all');
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/api/digital-signatures', {
      params: { page, limit, status }
    })
      .then(response => {
        setSignatures(response.data);
      })
      .catch(error => {
        console.error('Error fetching digital signatures:', error);
      });
  }, [page, limit, status]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value));
    setPage(1); // Reset to the first page when limit changes
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as 'all' | 'live' | 'expired');
    setPage(1); // Reset to the first page when status changes
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Digital Signature</h2>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Add
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            DSC Returned
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm font-medium">Show:</span>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="signatureType"
                className="text-blue-600"
                value="live"
                checked={status === 'live'}
                onChange={handleStatusChange}
              />
              <span className="ml-2">Live Signatures</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="signatureType"
                className="text-blue-600"
                value="expired"
                checked={status === 'expired'}
                onChange={handleStatusChange}
              />
              <span className="ml-2">Expired Signatures</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="signatureType"
                className="text-blue-600"
                value="all"
                checked={status === 'all'}
                onChange={handleStatusChange}
              />
              <span className="ml-2">All Signatures</span>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Show</span>
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
        
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Member Name</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Additional Info</th>
                <th className="px-6 py-3 text-left">Date of Received</th>
                <th className="px-6 py-3 text-left">Date of expiry</th>
                <th className="px-6 py-3 text-left">Password</th>
                <th className="px-6 py-3 text-left">Received by</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {signatures.map((signature) => (
                <tr key={signature.id}>
                  <td className="px-6 py-4 text-sm">{signature.client}</td>
                  <td className="px-6 py-4 text-sm">{signature.member_name}</td>
                  <td className="px-6 py-4 text-sm">{signature.location}</td>
                  <td className="px-6 py-4 text-sm">{signature.additionalInfo}</td>
                  <td className="px-6 py-4 text-sm">{formatDate(signature.date_of_received)}</td>
                  <td className="px-6 py-4 text-sm">{formatDate(signature.date_of_expiry)}</td>
                  <td className="px-6 py-4 text-sm">{signature.password}</td>
                  <td className="px-6 py-4 text-sm">{signature.received_by}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Return
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        DSC Authority Letter
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignature;
