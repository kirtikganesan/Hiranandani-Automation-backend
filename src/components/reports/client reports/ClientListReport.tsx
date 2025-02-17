import React, { useState } from 'react';

const ClientListReport = () => {
  const [display, setDisplay] = useState('clientwise');
  const [branch, setBranch] = useState('head-office');
  const [select, setSelect] = useState('');
  const [name, setName] = useState('');
  const [entries, setEntries] = useState('25');

  const dummyData = [
    {
      name: 'Aakash Talreja (Aakash Chanderlal Talreja)',
      constitution: 'Individual',
      clientCode: 'Aakash Chanderlal Talreja',
      pan: 'AXHPT5770E',
      dob: '14/10/1996',
      branch: 'Head Office'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">Client List Report</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Display<span className="text-error">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="display"
                  value="clientwise"
                  checked={display === 'clientwise'}
                  onChange={(e) => setDisplay(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Clientwise</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="display"
                  value="groupwise"
                  checked={display === 'groupwise'}
                  onChange={(e) => setDisplay(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Groupwise</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Branch<span className="text-error">*</span>
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
              Select
            </label>
            <select
              value={select}
              onChange={(e) => setSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="">Name</option>
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
              <option value="">Aakash Talreja (Aakash Chanderlal Talreja)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            List
          </button>
          <button className="px-4 py-2 bg-error text-white rounded-md hover:bg-error-dark">
            Cancel
          </button>
          <button className="px-4 py-2 bg-success text-white rounded-md hover:bg-success-dark">
            Export to Excel
          </button>
          <button className="px-4 py-2 bg-success text-white rounded-md hover:bg-success-dark">
            Address Labels
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select
            value={entries}
            onChange={(e) => setEntries(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Search:</span>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name (Name of Group)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Constitution</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Erstwhile Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client CIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client PAN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client TAN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client GSTIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Nature</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth/Incorporation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyData.map((client, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.constitution}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.clientCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.pan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.dob}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientListReport;