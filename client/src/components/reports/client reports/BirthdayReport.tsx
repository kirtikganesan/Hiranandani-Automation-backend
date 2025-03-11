import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BirthdayReportData {
  Name_of_Client?: string;
  Date_of_Birth?: string;
  Phone_Number?: string;
  Email?: string;
  employee_name?: string;
  date_of_birth?: string;
  phone?: string;
  email?: string;
  role?: string;
  branch?: string;
  status?: string;
  todays_working_status?: string;
  designation?: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const BirthdayReport: React.FC = () => {
  const [displayFor, setDisplayFor] = useState('clients');
  const [branch, setBranch] = useState('head-office');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<BirthdayReportData[]>([]);

  const fetchFilteredData = async () => {
    try {
      const response = await axios.post<BirthdayReportData[]>('http://localhost:5000/api/birthday-report', {
        displayFor,
        branch,
        startDate,
        endDate,
        searchTerm
      });
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [displayFor, branch, startDate, endDate, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">Birthday List</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Display For
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="displayFor"
                  value="clients"
                  checked={displayFor === 'clients'}
                  onChange={(e) => setDisplayFor(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Clients</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="displayFor"
                  value="employees"
                  checked={displayFor === 'employees'}
                  onChange={(e) => setDisplayFor(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Employees</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="head-office">Head Office</option>
              <option value="varsha-badlani-office">Varsha Badlani's Office</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
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
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-64"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={fetchFilteredData}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              List
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-success hover:bg-success-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              {displayFor === 'clients' ? (
                <>
                  <th className="px-6 py-3 text-left">
                    Name of Client (Company / Group)
                  </th>
                  <th className="px-6 py-3 text-left">
                    Date of Birth
                  </th>
                  <th className="px-6 py-3 text-left">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left">
                    Email
                  </th>
                </>
              ) : (
                <>
                  <th className="px-6 py-3 text-left">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left">
                    Date of Birth
                  </th>
                  <th className="px-6 py-3 text-left">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left">
                    Email
                  </th>
                  
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index}>
                {displayFor === 'clients' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">{item.Name_of_Client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">{item.Date_of_Birth ? formatDate(item.Date_of_Birth) : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">{item.Phone_Number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">{item.Email}</td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">{item.employee_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">{item.date_of_birth ? formatDate(item.date_of_birth) : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">{item.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">{item.email}</td>
                    
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BirthdayReport;
