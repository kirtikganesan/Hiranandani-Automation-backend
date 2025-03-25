import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UdinReport = () => {
  const [branch, setBranch] = useState('Head Office');
  const [fromDate, setFromDate] = useState('2025-02-01');
  const [toDate, setToDate] = useState('2025-02-17');
  const [partner, setPartner] = useState('LAL HIRANANDANI');
  const [employee, setEmployee] = useState('All');
  const [employees, setEmployees] = useState<{ id: number, employee_name: string }[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [udinData, setUdinData] = useState<any[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees([{ id: 0, employee_name: 'All' }, ...response.data]);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleListClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/udin-report', {
        params: { fromDate, toDate },
      });

      const filteredData = response.data
        .filter((row: any) => employee === 'All' || row.Allotted_To === employee)
        .map((row: any) => {
          const serviceCompletionDate = row.Service_Completion_Date ? formatDate(row.Service_Completion_Date) : '';
          const udinDate = row.UDIN_Date ? formatDate(row.UDIN_Date) : '';

          return {
            ...row,
            Service_Completion_Date: serviceCompletionDate,
            UDIN_Date: udinDate,
          };
        });

      setUdinData(filteredData);
      setShowTable(true);
    } catch (error) {
      console.error('Error fetching UDIN report data:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleResetClick = () => {
    setBranch('Head Office');
    setFromDate('2025-02-01');
    setToDate('2025-02-17');
    setPartner('LAL HIRANANDANI');
    setEmployee('All');
    setShowTable(false);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">UDIN Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
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
            <option>Varsha Badlani's Office</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            From Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            To Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Partner
          </label>
          <select
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>LAL HIRANANDANI</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Employee
          </label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.employee_name}>
                {emp.employee_name}
              </option>
            ))}
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
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3 text-left">Client Code</th>
                <th className="px-4 py-3 text-left">Client Name</th>
                <th className="px-4 py-3 text-left">Service Name</th>
                <th className="px-4 py-3 text-left">Allotted to</th>
                <th className="px-4 py-3 text-left">Service completion date</th>
                <th className="px-4 py-3 text-left">UDIN Date</th>
                <th className="px-4 py-3 text-left">UDIN Partner</th>
                <th className="px-4 py-3 text-left">UDIN No</th>
              </tr>
            </thead>
            <tbody>
              {udinData.length > 0 ? (
                udinData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">{row.Client_Code}</td>
                    <td className="px-4 py-3">{row.Client_Name}</td>
                    <td className="px-4 py-3">{row.Service_Name}</td>
                    <td className="px-4 py-3">{row.Allotted_To}</td>
                    <td className="px-4 py-3">{row.Service_Completion_Date}</td>
                    <td className="px-4 py-3">{row.UDIN_Date || ''}</td>
                    <td className="px-4 py-3">{row.UDIN_Partner}</td>
                    <td className="px-4 py-3">{row.UDIN_No}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showTable && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            Showing 0 to {udinData.length} of {udinData.length} entries
          </div>
          <div className="flex gap-2">
            <button disabled className="px-4 py-2 text-gray-400">Previous</button>
            <button disabled className="px-4 py-2 text-gray-400">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UdinReport;
