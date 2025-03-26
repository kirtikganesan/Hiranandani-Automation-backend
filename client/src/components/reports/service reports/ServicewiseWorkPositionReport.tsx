import React, { useState } from 'react';

const ServicewiseWorkPositionReport = () => {
  const [service, setService] = useState('Accounting');
  const [financialYear, setFinancialYear] = useState<"2024-2025" | "2023-2024">('2024-2025');
  const [branch, setBranch] = useState('Head Office');
  const [showTable, setShowTable] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  const clients = {
    "2024-2025": [
      "Pahilaj Talreja (Shoe Sagar) (Shoe Sagar)",
      "Next Level Home Reality LLP (Next Level home reality LLP)",
      "Shraddha Corporation (Shraddha Corporation)",
      "Singh Corporation (Singh Corporation)",
      "Singh Nirman Corporation (Singh Nirman Corporation)"
    ],
    "2023-2024": [
      "Shraddha Corporation (Shraddha Corporation)",
      "Singh Corporation (Singh Corporation)",
      "Singh Nirman Corporation (Singh Nirman Corporation)"
    ]
  };

  const handleListClick = () => {
    setShowTable(true);
  };

  const getStatusSymbol = (client: string) => {
    if (financialYear === '2024-2025' && client === 'Next Level Home Reality LLP (Next Level home reality LLP)' || financialYear=='2023-2024') {
      return 'bg-red-600'; // Completed Late
    }
    return 'bg-gray-500'; // Not Applicable
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Service Wise Work Position Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Service<span className="text-red-500">*</span>
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Accounting</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            F. Y.<span className="text-red-500">*</span>
          </label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value as "2024-2025" | "2023-2024")}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Branch<span className="text-red-500">*</span>
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Head Office</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleListClick}
        >
          List
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">
          Cancel
        </button>
      </div>

      {showTable && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Completed within Due Date</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-sm">Completed Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">WIP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm">Not Applicable / Not Started</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-900"></div>
              <span className="text-sm">Cancelled</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-3 text-left">Name of Client</th>
                  <th className="px-4 py-3 text-left">{financialYear}</th>
                </tr>
              </thead>
              <tbody>
                {clients[financialYear].map((client, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-3">{client}</td>
                    <td className="px-4 py-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusSymbol(client)}`}></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-700">
              Showing 1 to {clients[financialYear].length} of {clients[financialYear].length} entries
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServicewiseWorkPositionReport;
