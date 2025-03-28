import React, { useState, useEffect } from 'react';

interface Employee {
  id: number;
  employee_name: string;
  role: 'Staff' | 'Article' | 'Admin';
  // Include other fields as necessary
}

interface TimesheetSummary {
  branch: string;
  staffName: string;
  reportingHead: string;
  designation: string;
  hourlyRate: number;
  clientRelated: string;
  officeRelatedLunch: string;
  officeRelatedAdmin: string;
  officeRelatedTravel: string;
  officeRelatedWork: string;
  officeRelatedResearch: string;
  officeRelatedMisc: string;
  officeRelatedTraining: string;
  totalHours: string;
  percentageClient: number;
  percentageOffice: number;
}

const TimesheetSummaryReport = () => {
  const [filters, setFilters] = useState({
    branch: 'Head Office',
    fy: '2024-2025',
    role: 'Staff',
    employee: 'All',
    startDate: '2025-02-01',
    endDate: '2025-02-18'
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [timesheetData, setTimesheetData] = useState<TimesheetSummary[]>([]);
  const [showTable, setShowTable] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    fetch(`${backendUrl}/api/employee-details`)
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        setFilteredEmployees(data); // Initially set all employees as filtered
      })
      .catch(error => console.error('Error fetching employee data:', error));
  }, []);

  useEffect(() => {
    // Filter employees based on the selected role
    if (filters.role) {
      const filtered = employees.filter(emp => emp.role === filters.role);
      setFilteredEmployees(filters.role === 'All' ? employees : filtered);
    }
  }, [filters.role, employees]);

  const handleListClick = () => {
    // Logic to fetch and display timesheet data based on filters
    const mockData: TimesheetSummary[] = filters.employee === 'All'
      ? filteredEmployees.map(emp => ({
          branch: filters.branch,
          staffName: emp.employee_name,
          reportingHead: 'LAL HIRANANDANI',
          designation: emp.role,
          hourlyRate: 0,
          clientRelated: '00:00',
          officeRelatedLunch: '00:00',
          officeRelatedAdmin: '00:00',
          officeRelatedTravel: '00:00',
          officeRelatedWork: '00:00',
          officeRelatedResearch: '00:00',
          officeRelatedMisc: '00:00',
          officeRelatedTraining: '00:00',
          totalHours: '00:00',
          percentageClient: 0,
          percentageOffice: 0
        }))
      : [{
          branch: filters.branch,
          staffName: filters.employee,
          reportingHead: 'LAL HIRANANDANI',
          designation: filters.role,
          hourlyRate: 0,
          clientRelated: '00:00',
          officeRelatedLunch: '00:00',
          officeRelatedAdmin: '00:00',
          officeRelatedTravel: '00:00',
          officeRelatedWork: '00:00',
          officeRelatedResearch: '00:00',
          officeRelatedMisc: '00:00',
          officeRelatedTraining: '00:00',
          totalHours: '00:00',
          percentageClient: 0,
          percentageOffice: 0
        }];

    setTimesheetData(mockData);
    setShowTable(true);
  };

  const financialYears = [];
  for (let year = 2012; year <= 2024; year++) {
    financialYears.push(`${year}-${year + 1}`);
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Timesheet Summary Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Branch<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.branch}
            onChange={(e) => setFilters({...filters, branch: e.target.value})}
          >
            <option value="Head Office">Head Office</option>
            <option value="Varsha Badlani Office">Varsha Badlani Office</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            F.Y.<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.fy}
            onChange={(e) => setFilters({...filters, fy: e.target.value})}
          >
            {financialYears.map((fy) => (
              <option key={fy} value={fy}>
                {fy}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.role}
            onChange={(e) => setFilters({...filters, role: e.target.value, employee: 'All'})}
          >
            <option value="All">All</option>
            <option value="Staff">Staff</option>
            <option value="Article">Article</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.employee}
            onChange={(e) => setFilters({...filters, employee: e.target.value})}
          >
            <option value="All">All</option>
            {filteredEmployees.map((employee) => (
              <option key={employee.id} value={employee.employee_name}>
                {employee.employee_name}
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
            onChange={(e) => setFilters({...filters, startDate: e.target.value})}
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
            onChange={(e) => setFilters({...filters, endDate: e.target.value})}
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
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Export
        </button>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Branch</th>
                <th className="px-4 py-2 text-left">Staff Name</th>
                <th className="px-4 py-2 text-left">Reporting Head</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Hourly Rate</th>
                <th className="px-4 py-2 text-left">Client Related Hours</th>
                <th className="px-4 py-2 text-left">Office Related - Lunch</th>
                <th className="px-4 py-2 text-left">Office Related - Admin Work</th>
                <th className="px-4 py-2 text-left">Office Related - Travel</th>
                <th className="px-4 py-2 text-left">Office Related - Office Work</th>
                <th className="px-4 py-2 text-left">Office Related - Research</th>
                <th className="px-4 py-2 text-left">Office Related - Misc</th>
                <th className="px-4 py-2 text-left">Office Related - Training</th>
                <th className="px-4 py-2 text-left">Total Hours</th>
                <th className="px-4 py-2 text-left">Client Related %</th>
                <th className="px-4 py-2 text-left">Office Related %</th>
              </tr>
            </thead>
            <tbody>
              {timesheetData.map((item, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2">{item.branch}</td>
                  <td className="px-4 py-2">{item.staffName}</td>
                  <td className="px-4 py-2">{item.reportingHead}</td>
                  <td className="px-4 py-2">{item.designation}</td>
                  <td className="px-4 py-2">{item.hourlyRate}</td>
                  <td className="px-4 py-2">{item.clientRelated}</td>
                  <td className="px-4 py-2">{item.officeRelatedLunch}</td>
                  <td className="px-4 py-2">{item.officeRelatedAdmin}</td>
                  <td className="px-4 py-2">{item.officeRelatedTravel}</td>
                  <td className="px-4 py-2">{item.officeRelatedWork}</td>
                  <td className="px-4 py-2">{item.officeRelatedResearch}</td>
                  <td className="px-4 py-2">{item.officeRelatedMisc}</td>
                  <td className="px-4 py-2">{item.officeRelatedTraining}</td>
                  <td className="px-4 py-2">{item.totalHours}</td>
                  <td className="px-4 py-2">{item.percentageClient}%</td>
                  <td className="px-4 py-2">{item.percentageOffice}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimesheetSummaryReport;
