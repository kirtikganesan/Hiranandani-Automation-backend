import React, { useEffect, useState } from "react";
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
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editFormData, setEditFormData] = useState<Employee | null>(null);
  const [newEmployeeFormData, setNewEmployeeFormData] = useState<Employee>({
    id: 0,
    employee_name: '',
    role: '',
    phone: '',
    email: '',
    todays_working_status: '',
    branch: '',
    reports_to: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employees")
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
        .delete(`http://localhost:5000/api/employees/${selectedEmployee.id}`)
        .then(() => {
          setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== selectedEmployee.id));
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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    }
  };

  const submitEdit = () => {
    if (editFormData) {
      axios
        .put(`http://localhost:5000/api/employees/${editFormData.id}`, editFormData)
        .then(() => {
          setEmployees((prevEmployees) =>
            prevEmployees.map((emp) => (emp.id === editFormData.id ? editFormData : emp))
          );
          setEditModalOpen(false);
          setEditFormData(null);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    }
  };

  // ADD EMPLOYEE
  const handleAddEmployee = () => {
    setEditModalOpen(true);
    setEditFormData(null);
    setNewEmployeeFormData({
      id: 0,
      employee_name: '',
      role: '',
      phone: '',
      email: '',
      todays_working_status: '',
      branch: '',
      reports_to: '',
    });
  };

  const handleNewEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewEmployeeFormData({ ...newEmployeeFormData, [e.target.name]: e.target.value });
  };

  const submitNewEmployee = () => {
    axios
      .post("http://localhost:5000/api/employees", newEmployeeFormData)
      .then((response) => {
        setEmployees([...employees, { ...newEmployeeFormData, id: response.data.id }]);
        setEditModalOpen(false);
        setNewEmployeeFormData({
          id: 0,
          employee_name: '',
          role: '',
          phone: '',
          email: '',
          todays_working_status: '',
          branch: '',
          reports_to: '',
        });
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Employees</h1>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md mb-4"
        onClick={handleAddEmployee}
      >
        Add Employee
      </button>

      {/* Employee Table */}
      <div className="overflow-x-auto rounded-lg border">
        {employees.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold mt-4">No data available</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-800 text-white text-sm">
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
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border font-bold text-blue-600">{employee.employee_name}</td>
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

      {/* DELETE CONFIRMATION MODAL */}
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

      {/* EDIT EMPLOYEE MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">{editFormData ? 'Edit Employee' : 'Add Employee'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Employee Name</label>
                <input
                  type="text"
                  name="employee_name"
                  value={(editFormData || newEmployeeFormData).employee_name}
                  onChange={editFormData ? handleEditChange : handleNewEmployeeChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={(editFormData || newEmployeeFormData).role}
                  onChange={editFormData ? handleEditChange : handleNewEmployeeChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Role</option>
                  <option value="Staff">Staff</option>
                  <option value="Article">Article</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={(editFormData || newEmployeeFormData).phone}
                  onChange={editFormData ? handleEditChange : handleNewEmployeeChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={(editFormData || newEmployeeFormData).email}
                  onChange={editFormData ? handleEditChange : handleNewEmployeeChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Today's Working Status</label>
                <select
                  name="todays_working_status"
                  value={(editFormData || newEmployeeFormData).todays_working_status}
                  onChange={editFormData ? handleEditChange : handleNewEmployeeChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="In office">In office</option>
                  <option value="From home">From home</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Branch</label>
                <select
                  name="branch"
                  value={(editFormData || newEmployeeFormData).branch}
                  onChange={editFormData ? handleEditChange : handleNewEmployeeChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Branch</option>
                  <option value="Head Office">Head Office</option>
                  <option value="Varsha Badlani Office">Varsha Badlani Office</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reports To</label>
                <select
                  name="reports_to"
                  value={(editFormData || newEmployeeFormData).reports_to}
                  onChange={editFormData ? handleEditChange : handleNewEmployeeChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Reports To</option>
                  <option value="LAL HIRANANDANI">LAL HIRANANDANI</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md mr-2" onClick={editFormData ? submitEdit : submitNewEmployee}>
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
