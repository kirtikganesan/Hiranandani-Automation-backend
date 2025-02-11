import React, { useState } from 'react';
import { Search, Plus, Download, X } from 'lucide-react';

const DigitalSignature = () => {
  const [signatures] = useState([
    {
      id: 1,
      client: 'Amar P Basantani (Goa Dry Fruites) (Goa Dry Fruits)',
      memberName: 'Amar Basantani',
      location: 'Office',
      additionalInfo: '',
      dateReceived: '11/01/2024',
      dateExpiry: '11/01/2026',
      password: 'abcd@1234',
      receivedBy: 'LAL HIRANANDANI'
    },
    {
      id: 2,
      client: 'Anil Basantani (Anil Amarlal Basantani)-Deactive',
      memberName: 'Anil Basantani',
      location: 'Office',
      additionalInfo: '',
      dateReceived: '08/01/2024',
      dateExpiry: '08/01/2026',
      password: 'abcd@1234',
      receivedBy: 'LAL HIRANANDANI'
    }
  ]);

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
              <input type="radio" name="signatureType" className="text-blue-600" defaultChecked />
              <span className="ml-2">Live Signatures</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="signatureType" className="text-blue-600" />
              <span className="ml-2">Expired Signatures</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="signatureType" className="text-blue-600" />
              <span className="ml-2">All Signatures</span>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Show</span>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Filter
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Additional Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date of Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date of expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Received by</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {signatures.map((signature) => (
                <tr key={signature.id}>
                  <td className="px-6 py-4 text-sm">{signature.client}</td>
                  <td className="px-6 py-4 text-sm">{signature.memberName}</td>
                  <td className="px-6 py-4 text-sm">{signature.location}</td>
                  <td className="px-6 py-4 text-sm">{signature.additionalInfo}</td>
                  <td className="px-6 py-4 text-sm">{signature.dateReceived}</td>
                  <td className="px-6 py-4 text-sm">{signature.dateExpiry}</td>
                  <td className="px-6 py-4 text-sm">{signature.password}</td>
                  <td className="px-6 py-4 text-sm">{signature.receivedBy}</td>
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
      </div>
    </div>
  );
};

export default DigitalSignature;