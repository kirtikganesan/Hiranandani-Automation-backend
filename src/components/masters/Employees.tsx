import { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
  id: number;
  employee_name: string;
  role: string;
  phone: string;
  email: string;
  todays_working_status: string;
  branch: string;
  reports_to: string;
  status: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showActive, setShowActive] = useState<boolean>(true); // Toggle state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employee-details")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("Failed to load data.");
        setLoading(false);
      });
  };

  const handleDeactivate = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
    
  };

  const confirmDeactivate = () => {
    if (selectedEmployee) {
      axios
        .put(`http://localhost:5000/api/employee-details/${selectedEmployee.id}/deactivate`, {
          status: "Inactive",
        })
        .then(() => {
          fetchEmployees(); // Refresh data
          setModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating status:", error);
        });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Filter employees based on Active/Inactive selection
  const filteredEmployees = employees.filter((emp) =>
    showActive ? emp.status === "Active" : emp.status === "Inactive"
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Employees Management</h1>

      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 font-semibold rounded-md transition-all ${
            showActive ? "bg-green-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setShowActive(true)}
        >
          Active Employees
        </button>
        <button
          className={`ml-4 px-4 py-2 font-semibold rounded-md transition-all ${
            !showActive ? "bg-red-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setShowActive(false)}
        >
          Inactive Employees
        </button>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        {filteredEmployees.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold mt-4">No data available</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Employee Name</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Today's Working Status</th>
                <th className="px-4 py-2 border">Branch</th>
                <th className="px-4 py-2 border">Reports To</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index} className="text-center hover:bg-gray-100">
                  <td className="px-4 py-2 border">{employee.employee_name}</td>
                  <td className="px-4 py-2 border">{employee.role}</td>
                  <td className="px-4 py-2 border">{employee.phone}</td>
                  <td className="px-4 py-2 border">{employee.email}</td>
                  <td className="px-4 py-2 border">{employee.todays_working_status}</td>
                  <td className="px-4 py-2 border">{employee.branch}</td>
                  <td className="px-4 py-2 border">{employee.reports_to}</td>
                  <td className={`px-4 py-2 border ${employee.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {employee.status}
                  </td>
                  <td className="px-4 py-2 border">
                    {employee.status === "Active" ? (
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDeactivate(employee)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button className="px-2 py-1 bg-green-500 text-white rounded">Activate</button>
                    )}
                    <button className="px-2 py-1 bg-blue-500 text-white rounded ml-2">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to deactivate?</h2>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                onClick={confirmDeactivate}
              >
                Yes, Deactivate
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
