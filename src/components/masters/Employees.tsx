import { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
  employeeId: number;
  employee_name: string;
  role: string;
  phone: string;
  email: string;
  todays_working_status: string;
  branch: string;
  reports_to: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editFormData, setEditFormData] = useState<Employee | null>(null);

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

  // DELETE EMPLOYEE
  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEmployee) {
      axios
        .delete(`http://localhost:5000/api/employee-details/${selectedEmployee.employeeId}`)
        .then(() => {
          setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.employeeId !== selectedEmployee.employeeId));
          setModalOpen(false);
          setSelectedEmployee(null);
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  // EDIT EMPLOYEE
  const handleEdit = (employee: Employee) => {
    setEditFormData(employee);
    setEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    }
  };

  const submitEdit = () => {
    if (editFormData) {
      axios
        .put(`http://localhost:5000/api/employee-details/${editFormData.employeeId}`, editFormData)
        .then(() => {
          setEmployees((prevEmployees) =>
            prevEmployees.map((emp) => (emp.employeeId === editFormData.employeeId ? editFormData : emp))
          );
          setEditModalOpen(false);
          setEditFormData(null);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Employees</h1>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        {employees.length === 0 ? (
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
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="text-center hover:bg-gray-100">
                  <td className="px-4 py-2 border">{employee.employee_name}</td>
                  <td className="px-4 py-2 border">{employee.role}</td>
                  <td className="px-4 py-2 border">{employee.phone}</td>
                  <td className="px-4 py-2 border">{employee.email}</td>
                  <td className="px-4 py-2 border">{employee.todays_working_status}</td>
                  <td className="px-4 py-2 border">{employee.branch}</td>
                  <td className="px-4 py-2 border">{employee.reports_to}</td>
                  <td className="px-4 py-2 border">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2" onClick={() => handleEdit(employee)}>
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(employee)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* DELETE Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete?</h2>
            <div className="flex justify-center">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-2" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT Employee Modal */}
      {editModalOpen && editFormData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Employee</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(editFormData).map((key) => (
                key !== "id" && (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1">{key.replace("_", " ")}</label>
                    <input type="text" name={key} value={editFormData[key as keyof Employee]} onChange={handleEditChange} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                )
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md mr-2" onClick={submitEdit}>
                Submit
              </button>
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => setEditModalOpen(false)}>
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
