import React, { useEffect, useState } from "react";

interface Employee {
  id: number;
  employee_name: string;
  reports_to: string;
  total_services: number;
  allotted_but_not_started: number;
  past_due: number;
  probable_overdue: number;
  high_pri: number;
  medium_pri: number;
  low_pri: number;
  pending_claims: number;
  last_timesheet_date: string | null;
}

const EmployeeDashboard: React.FC = () => {
  const formatDate = (isoString: string | null) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB");
  };

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch("https://hiranandani-backend.vercel.app/api/employees")
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Employee Dashboard</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border px-4 py-3 text-left">Employee Name</th>
              <th className="border px-4 py-3 text-left font-semibold">Reports To</th>
              <th className="border px-4 py-3 text-center font-semibold">Total Services</th>
              <th className="border px-4 py-3 text-center font-semibold">Not Started</th>
              <th className="border px-4 py-3 text-center font-semibold">Past Due</th>
              <th className="border px-4 py-3 text-center font-semibold">Probable Overdue</th>
              <th className="border px-4 py-3 text-center font-semibold whitespace-nowrap">
                <div>Priority</div>
                <div className="flex justify-center space-x-4 mt-1 text-xs">
                  <span>High</span>
                  <span>Med</span>
                  <span>Low</span>
                </div>
              </th>
              <th className="border px-4 py-3 text-center font-semibold">Pending Claims</th>
              <th className="border px-4 py-3 text-center font-semibold">Last Timesheet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100"> 
            {employees.map((employee) => (
              <tr 
                key={employee.id} 
                className="border hover:bg-gray-50 transition-colors"
              >
                <td className="border px-4 py-3 text-left font-bold text-blue-600">
                  {employee.employee_name}
                </td>
                <td className="border px-4 py-3 text-left">
                  {employee.reports_to}
                </td>
                <td className="border px-4 py-3 text-center">
                  {employee.total_services}
                </td>
                <td className="border px-4 py-3 text-center">
                  {employee.allotted_but_not_started}
                </td>
                <td className="border px-4 py-3 text-center">
                  {employee.past_due}
                </td>
                <td className="border px-4 py-3 text-center">
                  {employee.probable_overdue}
                </td>
                <td className="border px-4 py-3">
                  <div className="flex justify-between">
                    <div>{employee.high_pri}</div>
                    <div>{employee.medium_pri}</div>
                    <div>{employee.low_pri}</div>
                  </div>
                </td>
                <td className="border px-4 py-3 text-center">
                  {employee.pending_claims}
                </td>
                <td className="border px-4 py-3 text-center">
                  {formatDate(employee.last_timesheet_date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;