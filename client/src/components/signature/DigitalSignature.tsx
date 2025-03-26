import React, { useState, useEffect } from 'react';
import { Plus, X, Trash } from 'lucide-react';
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

type Client = {
  id: number;
  client_name: string;
};

const DigitalSignature = () => {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<'all' | 'live' | 'expired'>('all');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names

  const [formData, setFormData] = useState({
    client: '',
    member_name: '',
    location: 'Office',
    date_of_received: new Date().toISOString().split('T')[0],
    date_of_expiry: '',
    password: '',
    confirmPassword: '',
    received_by: 'LAL HIRANANDANI',
  });
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch data from the backend
    axios.get(`${backendUrl}/api/digital-signatures`, {
      params: { page, limit, status }
    })
      .then(response => {
        setSignatures(response.data);
      })
      .catch(error => {
        console.error('Error fetching digital signatures:', error);
      });

    // Fetch client details
    axios.get(`${backendUrl}/api/client-details`)
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'client') {
      const selectedClient = clients.find(client => client.client_name === value);
      if (selectedClient) {
        const memberName = selectedClient.client_name.split('(')[0].trim();
        setFormData(prevData => ({
          ...prevData,
          member_name: memberName,
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    axios.post(`${backendUrl}/api/digital-signatures`, formData)
      .then(response => {
        setSignatures([...signatures, response.data]);
        setIsFormVisible(false);
        setIsSuccessModalVisible(true);
        setFormData({
          client: '',
          member_name: '',
          location: 'Office',
          date_of_received: new Date().toISOString().split('T')[0],
          date_of_expiry: '',
          password: '',
          confirmPassword: '',
          received_by: 'LAL HIRANANDANI',
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          setError('Selected client\'s digital signature already exists');
        } else {
          console.error('Error adding digital signature:', error);
        }
      });
  };

  const handleDelete = (id: number) => {
    axios.delete(`${backendUrl}/api/digital-signatures/${id}`)
      .then(() => {
        setSignatures(signatures.filter(signature => signature.id !== id));
        setDeleteId(null);
      })
      .catch(error => {
        console.error('Error deleting digital signature:', error);
      });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Digital Signature</h2>
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex"
            onClick={() => setIsFormVisible(true)}
          >
            <Plus className="mr-2" /> Add
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
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setDeleteId(signature.id)}
                    >
                      <Trash className="mr-2" /> Delete
                    </button>
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

      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-full overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add New Digital Signature</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Client Name</label>
                <select
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.client_name}>
                      {client.client_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Member Name</label>
                <input
                  type="text"
                  name="member_name"
                  value={formData.member_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="Office">Office</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Date of Received</label>
                <input
                  type="date"
                  name="date_of_received"
                  value={formData.date_of_received}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Date of Expiry</label>
                <input
                  type="date"
                  name="date_of_expiry"
                  value={formData.date_of_expiry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2">
                  Submit
                </button>
                <button type="button" onClick={() => setIsFormVisible(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSuccessModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Digital Signature Added Successfully</h3>
            <button onClick={() => setIsSuccessModalVisible(false)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              OK
            </button>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Are you sure you want to delete?</h3>
            <div className="flex justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 mr-2">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId!)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalSignature;
