import { useState } from 'react';
import { Upload, X, Plus } from "lucide-react";

export default function InwardDocument() {
  const [documents, setDocuments] = useState<Array<{
    particulars: string;
    type: string;
    mode: string;
    stored: string;
    quantity: string;
    returnable: boolean;
    file?: File;
  }>>([]);

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

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Inward Document</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input type="date" id="date" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label htmlFor="branch" className="block text-sm font-medium mb-1">
            Branch <span className="text-red-500">*</span>
          </label>
          <select id="branch" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select branch</option>
            <option value="all">All</option>
            <option value="branch1">Branch 1</option>
            <option value="branch2">Branch 2</option>
          </select>
        </div>

        <div>
          <label htmlFor="clientName" className="block text-sm font-medium mb-1">
            Client Name <span className="text-red-500">*</span>
          </label>
          <select id="clientName" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select client</option>
            <option value="client1">Client 1</option>
            <option value="client2">Client 2</option>
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
                  <input type="text" placeholder="Enter particulars" className="w-full px-3 py-2 border rounded-md" />
                </td>
                <td className="p-3">
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="">Select type</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                  </select>
                </td>
                <td className="p-3">
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="">Select mode</option>
                    <option value="mode1">Mode 1</option>
                    <option value="mode2">Mode 2</option>
                  </select>
                </td>
                <td className="p-3">
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="">Select storage</option>
                    <option value="storage1">Storage 1</option>
                    <option value="storage2">Storage 2</option>
                  </select>
                </td>
                <td className="p-3">
                  <input type="number" placeholder="Quantity" className="w-full px-3 py-2 border rounded-md" />
                </td>
                <td className="p-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="p-3">
                  <input type="file" accept=".jpeg,.pdf,.jpg,.png,.docx,.doc" className="w-full" />
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
          onClick={addDocument}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Row
        </button>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}