import React, { useState } from 'react';

// Define a TypeScript interface for the DSC data
interface Dsc {
  client: string;
  member_name: string;
  date_of_expiry: string;
  phone?: string;
  email?: string;
}

const DscExpiryReport: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [dscData, setDscData] = useState<Dsc[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  const fetchDscData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dsc-expiry?startDate=${startDate}&endDate=${endDate}`);
      const data: Dsc[] = await response.json();
      setDscData(data);
      setShowTable(true);
    } catch (error) {
      console.error('Error fetching DSC data:', error);
    }
  };

  const handleListClick = () => {
    fetchDscData();
  };

  const handleResetClick = () => {
    setStartDate('');
    setEndDate('');
    setDscData([]);
    setShowTable(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">DSC Expiry Report</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
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
            onClick={handleResetClick}
            className="px-4 py-2 bg-error text-white rounded-md hover:bg-error-dark"
          >
            Reset
          </button>

        </div>
      </div>

      {showTable && (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3">Name of Client (Group)</th>
                <th className="px-6 py-3">Name of the Person</th>
                <th className="px-6 py-3">DSC Valid Up To</th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {dscData.length > 0 ? (
                dscData.map((dsc, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dsc.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dsc.member_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(dsc.date_of_expiry)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
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

export default DscExpiryReport;
