import React, { useState, useEffect } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import axios from 'axios';

interface Document {
  particulars: string;
  type: string;
  mode: string;
  stored: string;
  quantity: string;
  returnable: boolean;
  file?: File;
}

interface FormData {
  date: string;
  branch: string;
  clientName: string;
}

export default function InwardDocument() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [formData, setFormData] = useState<FormData>({
    date: '',
    branch: '',
    clientName: ''
  });
  const [clients, setClients] = useState<string[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    // Fetch client names from the backend API
    axios.get(`${backendUrl}/api/clients`)
      .then(response => {
        const clientNames = response.data.map((client: any) => client.client_name);
        setClients(clientNames);
      })
      .catch(error => {
        console.error('Error fetching client names:', error);
      });
  }, []);

  const addDocument = () => {
    setDocuments([...documents, {
      particulars: '',
      type: '',
      mode: '',
      stored: '',
      quantity: '',
      returnable: false
    }]);
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, field: keyof Document, value: string | boolean | File) => {
    const newDocuments = [...documents];
    newDocuments[index] = {
      ...newDocuments[index],
      [field]: value
    };
    setDocuments(newDocuments);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (index: number, file: File) => {
    handleInputChange(index, 'file', file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('date', formData.date);
    formDataToSend.append('branch', formData.branch);
    formDataToSend.append('client_name', formData.clientName);

    documents.forEach((doc, index) => {
      formDataToSend.append(`documents[${index}][particulars]`, doc.particulars);
      formDataToSend.append(`documents[${index}][type]`, doc.type);
      formDataToSend.append(`documents[${index}][mode]`, doc.mode);
      formDataToSend.append(`documents[${index}][stored]`, doc.stored);
      formDataToSend.append(`documents[${index}][quantity]`, doc.quantity);
      formDataToSend.append(`documents[${index}][returnable]`, String(doc.returnable));
      if (doc.file) {
        formDataToSend.append('files', doc.file);
      }
    });

    try {
      const response = await axios.post(`${backendUrl}/api/documents`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error saving documents:', error);
      alert('Error saving documents');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Inward Document</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="branch" className="block text-sm font-medium mb-1">
              Branch <span className="text-red-500">*</span>
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select branch</option>
              <option value="all">All</option>
              <option value="branch1">Head Office</option>
              <option value="branch2">Varsha Badlani's Office</option>
            </select>
          </div>

          <div>
            <label htmlFor="clientName" className="block text-sm font-medium mb-1">
              Client Name <span className="text-red-500">*</span>
            </label>
            <select
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left">Particulars</th>
                <th className="p-3 text-left">Type of Document</th>
                <th className="p-3 text-left">Mode of Inward</th>
                <th className="p-3 text-left">Stored in</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Returnable</th>
                <th className="p-3 text-left">Upload Document</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">
                    <input
                      type="text"
                      placeholder="Enter particulars"
                      value={doc.particulars}
                      onChange={(e) => handleInputChange(index, 'particulars', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      placeholder="Enter type of document"
                      value={doc.type}
                      onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      value={doc.mode}
                      onChange={(e) => handleInputChange(index, 'mode', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select mode</option>
                      <option value="original">Hardcopy - Original</option>
                      <option value="photocopy">Hardcopy - Photocopy</option>
                      <option value="email">Email</option>
                      <option value="whatsapp">Whatsapp or Telegram</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <select
                      value={doc.stored}
                      onChange={(e) => handleInputChange(index, 'stored', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select storage</option>
                      <option value="office">Office (Head Office)</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={doc.quantity}
                      onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={doc.returnable}
                      onChange={(e) => handleInputChange(index, 'returnable', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="file"
                      accept=".jpeg,.pdf,.jpg,.png,.docx,.doc"
                      onChange={(e) => handleFileChange(index, e.target.files![0])}
                      className="w-full"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => removeDocument(index)}
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={addDocument}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Row
          </button>
          <div className="space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
