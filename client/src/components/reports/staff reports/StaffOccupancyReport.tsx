import React, { useState, useEffect } from 'react';

interface StaffOccupancy {
  Name_of_the_Branch: string;
  Name_of_the_Employee: string;
  Reporting_Head: string;
  Client_Name: string;
  Work_In_Hand: string;
  Service_Status: string;
  No_of_Tasks_completed: number;
  Trigger_Date: string;
  Started_Date: string;
  Expected_Date_of_Completion: string;
  Estimated_time_of_completion: string;
  Leave_applied: string;
  Absent: string;
}

const StaffOccupancyReport = () => {
  const [filters, setFilters] = useState({
    branch: '',
    reportingHead: '',
    employee: '',
    startDate: '',
    endDate: '',
    client: ''
  });

  const [employees, setEmployees] = useState<string[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const [data, setData] = useState<StaffOccupancy[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch unique employee names from the backend
    fetch(`${backendUrl}/api/unique-occupancy-employees`)
      .then(response => response.json())
      .then(data => setEmployees(['All', ...data]));

    // Fetch unique client names from the backend
    fetch(`${backendUrl}/api/unique-occupancy-clients`)
      .then(response => response.json())
      .then(data => setClients(['All', ...data]));
  }, []);

  const handleListClick = () => {
    // Fetch filtered data from the backend based on selected filters
    let query = `${backendUrl}/api/staff-occupancy?`;
    if (filters.employee && filters.employee !== 'All') {
      query += `employee=${filters.employee}&`;
    }
    if (filters.client && filters.client !== 'All') {
      query += `client=${filters.client}&`;
    }
    fetch(query)
      .then(response => response.json())
      .then(data => setData(data));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Staff Occupancy Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Branch<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          >
            <option value="">Select Branch</option>
            <option value="Head Office">Head Office</option>
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
            <option value="">Select Reporting Head</option>
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
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee} value={employee}>
                {employee}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
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
            End Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.client}
            onChange={(e) => setFilters({ ...filters, client: e.target.value })}
          >
            <option value="">Select Client</option>
            {clients.map(client => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
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


      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name of Branch</th>
              <th className="px-4 py-2 text-left">Name of Employee</th>
              <th className="px-4 py-2 text-left">Reporting Head</th>
              <th className="px-4 py-2 text-left">Client Name</th>
              <th className="px-4 py-2 text-left">Work in Hand</th>
              <th className="px-4 py-2 text-left">Service Status</th>
              <th className="px-4 py-2 text-left">No. of Tasks completed</th>
              <th className="px-4 py-2 text-left">Triggered Date</th>
              <th className="px-4 py-2 text-left">Expected Date of Completion</th>
              <th className="px-4 py-2 text-left">Estimated time required for completion Day/Hours/Minuts</th>
              <th className="px-4 py-2 text-left">Leave pending approved</th>
              <th className="px-4 py-2 text-left">Absent</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.Name_of_the_Branch}</td>
                  <td className="px-4 py-2">{item.Name_of_the_Employee}</td>
                  <td className="px-4 py-2">{item.Reporting_Head}</td>
                  <td className="px-4 py-2">{item.Client_Name}</td>
                  <td className="px-4 py-2">{item.Work_In_Hand}</td>
                  <td className="px-4 py-2">{item.Service_Status}</td>
                  <td className="px-4 py-2">{item.No_of_Tasks_completed}</td>
                  <td className="px-4 py-2">{formatDate(item.Trigger_Date)}</td>
                  <td className="px-4 py-2">{formatDate(item.Expected_Date_of_Completion)}</td>
                  <td className="px-4 py-2">{item.Estimated_time_of_completion}</td>
                  <td className="px-4 py-2">{item.Leave_applied}</td>
                  <td className="px-4 py-2">{item.Absent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={14}>
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default StaffOccupancyReport;
