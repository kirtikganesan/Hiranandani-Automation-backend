import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  employee_name: string;
}

const StaffwiseBillingReport = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [branch, setBranch] = useState('Head Office');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [startDate, setStartDate] = useState('2025-02-01');
  const [endDate, setEndDate] = useState('2025-02-17');
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Fetch employees from the API when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
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

  const handleCancelClick = () => {
    setSelectedEmployee('all');
    setStartDate('2025-02-01');
    setEndDate('2025-02-17');
    setShowTable(false);
  };

  const getSundaysBetweenDates = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let sundays = 0;
    for (let date = new Date(start); date <= endDate; date.setDate(date.getDate() + 1)) {
      if (date.getDay() === 0) { // Sunday
        sundays++;
      }
    }
    return sundays;
  };

  const sundaysCount = getSundaysBetweenDates(startDate, endDate);

  const filteredEmployees = selectedEmployee === 'all'
    ? employees
    : employees.filter(emp => emp.employee_name === selectedEmployee);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Staff-wise Billing Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
            <option>Varsha Badlani Office</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Employee<span className="text-red-500">*</span>
          </label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.employee_name}>
                {emp.employee_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleListClick}>
          List
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3 text-left">Name of the Branch</th>
                <th className="px-4 py-3 text-left">Name of the Employee</th>
                <th className="px-4 py-3 text-left">Designation</th>
                <th className="px-4 py-3 text-right">No. of days worked</th>
                <th className="px-4 py-3 text-right">Leaves</th>
                <th className="px-4 py-3 text-right">Weekly Offs / Holidays</th>
                <th className="px-4 py-3 text-right">Regular Hours</th>
                <th className="px-4 py-3 text-right">Overtime Hours</th>
                <th className="px-4 py-3 text-right">Total Hours</th>
                <th className="px-4 py-3 text-right">Cost Per Hour</th>
                <th className="px-4 py-3 text-right">Cost</th>
                <th className="px-4 py-3 text-right">Invoice amount</th>
                <th className="px-4 py-3 text-right">Invoice Share</th>
                <th className="px-4 py-3 text-right">Profit</th>
                <th className="px-4 py-3 text-right">Profit % to Cost</th>
              </tr>
            </thead>
            <tbody>
              {branch === 'Varsha Badlani Office' ? (
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3" colSpan={14}>No data available</td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-200">
                    <td className="px-4 py-3">{branch}</td>
                    <td className="px-4 py-3">{employee.employee_name}</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-right">0</td>
                    <td className="px-4 py-3 text-right">0</td>
                    <td className="px-4 py-3 text-right">{sundaysCount}</td>
                    <td className="px-4 py-3 text-right"></td>
                    <td className="px-4 py-3 text-right"></td>
                    <td className="px-4 py-3 text-right">0</td>
                    <td className="px-4 py-3 text-right">0.00</td>
                    <td className="px-4 py-3 text-right">0.00</td>
                    <td className="px-4 py-3 text-right">0.00</td>
                    <td className="px-4 py-3 text-right">0.00</td>
                    <td className="px-4 py-3 text-right">0.00</td>
                    <td className="px-4 py-3 text-right">0%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to {filteredEmployees.length} of {employees.length} entries
        </div>
      </div>
    </div>
  );
};

export default StaffwiseBillingReport;
