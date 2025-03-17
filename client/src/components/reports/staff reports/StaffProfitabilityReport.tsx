import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  employee_name: string;
}

const StaffProfitabilityReport = () => {
  const [filters, setFilters] = useState({
    branch: 'Head Office',
    reportingHead: 'LAL HIRANANDANI',
    employee: 'all',
    startDate: '2025-2-01',
    endDate: '2025-2-28'
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Fetch employees from the API when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://hiranandani-automation.onrender.com/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleListClick = () => {
    setShowTable(true);
  };

  const shouldShowData = () => {
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);
    const conditionDate = new Date('2024-11-26');

    return (filters.employee === 'all' || filters.employee === 'Sunny Gurbani') &&
           startDate <= conditionDate &&
           endDate > startDate;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Staff Profitability Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Branch<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          >
            <option value="Head Office">Head Office</option>
            <option value="Varsha Badlani Office">Varsha Badlani Office</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reporting Head<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.reportingHead}
            onChange={(e) => setFilters({ ...filters, reportingHead: e.target.value })}
          >
            <option value="LAL HIRANANDANI">LAL HIRANANDANI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.employee}
            onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
          >
            <option value="all">All</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.employee_name}>
                {emp.employee_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleListClick}
        >
          List
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Cancel
        </button>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Branch</th>
                <th className="px-4 py-2 text-left">Employee Name</th>
                <th className="px-4 py-2 text-left">Reporting Head</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Client Name</th>
                <th className="px-4 py-2 text-left">Service Name</th>
                <th className="px-4 py-2 text-left">Estimated Time</th>
                <th className="px-4 py-2 text-left">Hours Spent</th>
                <th className="px-4 py-2 text-left">Invoice</th>
                <th className="px-4 py-2 text-left">Invoice Share</th>
                <th className="px-4 py-2 text-left">Cost (Salary/Stipend + Claim/Out of Pocket Expenses)</th>
                <th className="px-4 py-2 text-left">Fees Received</th>
                <th className="px-4 py-2 text-left">Profitability (Fees Received - Cost)</th>
              </tr>
            </thead>
            <tbody>
              {shouldShowData() ? (
                <>
                  <tr>
                    <td className="px-4 py-2">Head Office</td>
                    <td className="px-4 py-2">Sunny Gurbani</td>
                    <td className="px-4 py-2">LAL HIRANANDANI</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">Praveen Hazari (Praveen Tirathdas Hazari)(PARAS NOVELTY THE PARTY SHOP)</td>
                    <td className="px-4 py-2">GST Registration (Non Corporate) 2024-2025</td>
                    <td className="px-4 py-2">74.:30</td>
                    <td className="px-4 py-2">01:15</td>
                    <td className="px-4 py-2">0.00</td>
                    <td className="px-4 py-2">0.00</td>
                    <td className="px-4 py-2">0.00</td>
                    <td className="px-4 py-2">0.00</td>
                    <td className="px-4 py-2">0.00</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Head Office</td>
                    <td className="px-4 py-2">Sunny Gurbani</td>
                    <td className="px-4 py-2">LAL HIRANANDANI</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">Dayal Raghuwanshi (Dayal Sukhumal Raghuwanshi)</td>
                    <td className="px-4 py-2">ITR for Non Audit cases (Non Corporate) Apr-2022-Mar-2023</td>
                    <td className="px-4 py-2">18:00</td>
                    <td className="px-4 py-2">01:30</td>
                    <td className="px-4 py-2">20000.00</td>
                    <td className="px-4 py-2">20000.00</td>
                    <td className="px-4 py-2">0.00</td>
                    <td className="px-4 py-2">20000.00</td>
                    <td className="px-4 py-2">20000.00</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center" colSpan={13}>
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

export default StaffProfitabilityReport;
