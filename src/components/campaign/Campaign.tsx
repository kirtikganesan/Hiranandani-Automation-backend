import React, { useState } from 'react';

const Campaign = () => {
  const [branch, setBranch] = useState('head-office');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [campaignType, setCampaignType] = useState('email');
  const [showTable, setShowTable] = useState(false);

  const handleListClick = () => {
    // Here you can add logic to fetch data from the server and update the state
    setShowTable(true);
  };

  const handleCancelClick = () => {
    setBranch('head-office');
    setStartDate('');
    setEndDate('');
    setCampaignType('email');
    setShowTable(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center mt-4">
        <h2 className="text-3xl font-bold text-navy">Campaign Report</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
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
              <option value="head-office">Varsha Badlani's Office</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Campaign Type<span className="text-error">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="campaignType"
                  value="email"
                  checked={campaignType === 'email'}
                  onChange={(e) => setCampaignType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="campaignType"
                  value="sms"
                  checked={campaignType === 'sms'}
                  onChange={(e) => setCampaignType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>SMS</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date<span className="text-error">*</span>
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
              End Date<span className="text-error">*</span>
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
            onClick={handleListClick}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            List
          </button>
          <button
            onClick={handleCancelClick}
            className="px-4 py-2 bg-error text-white rounded-md hover:bg-error-dark"
          >
            Cancel
          </button>
        </div>
      </div>

      {showTable && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Campaign Name</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Sent On</th>
                <th className="px-6 py-3 text-left">Total Recipients</th>
                <th className="px-6 py-3 text-left">Successful</th>
                <th className="px-6 py-3 text-left">Failed</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Campaign;
