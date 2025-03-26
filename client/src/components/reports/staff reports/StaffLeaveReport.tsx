import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  employee_name: string;
}

const StaffLeaveReport = () => {
  const [filters, setFilters] = useState({
    branch: 'Head Office',
    reportingHead: 'LAL HIRANANDANI',
    employee: 'all',
    fromDate: '2025-02-01',
    toDate: '2025-02-17',
    leaveType: 'daily'
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showTable, setShowTable] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    // Fetch employees from the API when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/employees`);
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

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Staff Leave Report</h1>

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
            Reporting Head
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
            From Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.fromDate}
            onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.toDate}
            onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leave Type<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.leaveType === 'daily'}
                onChange={() => setFilters({ ...filters, leaveType: 'daily' })}
              />
              <span className="ml-2">Daily</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={filters.leaveType === 'monthly'}
                onChange={() => setFilters({ ...filters, leaveType: 'monthly' })}
              />
              <span className="ml-2">Monthly</span>
            </label>
          </div>
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
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Reporting Head</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Date of Joining</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Pending for Approval</th>
                <th className="px-4 py-2 text-left">Cancelled</th>
                <th className="px-4 py-2 text-left">Approved</th>
                <th className="px-4 py-2 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan={10}>
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

export default StaffLeaveReport;
