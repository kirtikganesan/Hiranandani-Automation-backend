import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  employee_name: string;
  role: string;
  phone: string;
  email: string;
  todays_working_status: string;
  branch: string;
  reports_to: string;
}

const StaffAttendanceReport = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [branch, setBranch] = useState('Head Office');
  const [financialYear, setFinancialYear] = useState('2024-2025');
  const [month, setMonth] = useState('April');
  const [showType, setShowType] = useState('both');
  const [showTable, setShowTable] = useState(false);

  const months = [
    'January', 'Febrauary', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const financialYears = ['2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021'];

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

  const getDaysInMonth = (month: string) => {
    const monthIndex = months.indexOf(month);
    const year = parseInt(financialYear.split('-')[0]);
    const date = new Date(year, monthIndex + 1, 0); // 0 returns the last day of the previous month
    return date.getDate();
  };

  const getDayOfWeek = (day: number, month: string) => {
    const monthIndex = months.indexOf(month);
    const year = parseInt(financialYear.split('-')[0]);
    const date = new Date(year, monthIndex, day);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Staff Attendance Report</h1>

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
            <option value="select">Select</option>
            <option value="head">Head Office</option>
            <option value="varsha">Varsha Badlani's Office</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Financial Year<span className="text-red-500">*</span>
          </label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {financialYears.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Month<span className="text-red-500">*</span>
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {months.map((monthOption) => (
              <option key={monthOption}>{monthOption}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Show Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="showType"
                value="monthly"
                checked={showType === 'monthly'}
                onChange={(e) => setShowType(e.target.value)}
                className="mr-2"
              />
              Monthly
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="showType"
                value="hourly"
                checked={showType === 'hourly'}
                onChange={(e) => setShowType(e.target.value)}
                className="mr-2"
              />
              Hourly
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="showType"
                value="both"
                checked={showType === 'both'}
                onChange={(e) => setShowType(e.target.value)}
                className="mr-2"
              />
              Both
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleListClick}>
          List
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Export</button>
      </div>

      {showTable && (
        <div>
          <div className="mb-4 text-sm">
            <p>Attendance Sheet for the month of {month}, {financialYear}</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <span>A - Absent</span>
              <span>H - Half Day</span>
              <span>HHO - Half Day Holiday</span>
              <span>HO - Holiday</span>
              <span>L - Leave</span>
              <span>P - Present</span>
              <span>WO - Weekly Off</span>
            </div>
          </div>

          {(showType === 'monthly' || showType === 'both') && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-center">#</th>
                    <th className="px-4 py-3 text-left">Branch</th>
                    <th className="px-4 py-3 text-left">Staff</th>
                    <th className="px-4 py-3 text-left">Designation</th>
                    {Array.from({ length: getDaysInMonth(month) }, (_, i) => (
                      <th key={i} className="px-4 py-3 text-center">
                        {i + 1} ({getDayOfWeek(i + 1, month)})
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={employee.id} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3">{employee.branch}</td>
                      <td className="px-4 py-3">{employee.employee_name}</td>
                      <td className="px-4 py-3"></td>
                      {Array.from({ length: getDaysInMonth(month) }, (_, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          {getDayOfWeek(i + 1, month) === 'Sunday' ? 'WO' : 'A'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(showType === 'hourly' || showType === 'both') && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-center">#</th>
                    <th className="px-4 py-3 text-left">Branch</th>
                    <th className="px-4 py-3 text-left">Staff</th>
                    <th className="px-4 py-3 text-left">Designation</th>
                    {Array.from({ length: 24 }, (_, i) => (
                      <th key={i} className="px-4 py-3 text-center">
                        {i + 1} (hours)
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={employee.id} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3">{employee.branch}</td>
                      <td className="px-4 py-3">{employee.employee_name}</td>
                      <td className="px-4 py-3"></td>
                      {Array.from({ length: 24 }, (_, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          A
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffAttendanceReport;
