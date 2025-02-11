import React, { useEffect, useState } from "react";

interface Employee {
  id: number;
  employee_name: string;
  reports_to: string;
  total_services: number;
  allotted_but_not_started: number;
  past_due: number;
  probable_overdue: number;
  high_priority: number;
  medium_priority: number;
  low_priority: number;
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
    fetch("http://localhost:5000/api/employees")
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-4">Employee Dashboard</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Employee Name</th>
            <th className="border p-2">Reports To</th>
            <th className="border p-2">Total Services</th>
            <th className="border p-2">Allotted But Not Started</th>
            <th className="border p-2">Past Due</th>
            <th className="border p-2">Probable Overdue</th>
            <th className="border p-2">High</th>
            <th className="border p-2">Medium</th>
            <th className="border p-2">Low</th>
            <th className="border p-2">Pending Claims</th>
            <th className="border p-2">Last Timesheet Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="text-center text-sm">
              <td className="border p-2">{employee.employee_name}</td>
              <td className="border p-2">{employee.reports_to}</td>
              <td className="border p-2">{employee.total_services}</td>
              <td className="border p-2">{employee.allotted_but_not_started}</td>
              <td className="border p-2">{employee.past_due}</td>
              <td className="border p-2">{employee.probable_overdue}</td>
              <td className="border p-2">{employee.high_priority}</td>
              <td className="border p-2">{employee.medium_priority}</td>
              <td className="border p-2">{employee.low_priority}</td>
              <td className="border p-2">{employee.pending_claims}</td>
              <td className="border p-2">{formatDate(employee.last_timesheet_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
