import { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  id: number;
  client_code: string;
  client_name: string;
  services: string;
  triggered_date: string;
  statutory_due_date: string;
}

interface Employee {
  id: number;
  employee_name: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Converts to DD/MM/YYYY format
};

const ServicesTriggeredButNotAlloted = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  useEffect(() => {
    fetchServices();
    fetchEmployees();
  }, []);

  const fetchServices = () => {
    axios
      .get("http://localhost:5000/api/services-triggered-but-not-alloted")
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setError("Failed to load services.");
        setLoading(false);
      });
  };

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  const handleAssignClick = (service: Service) => {
    setSelectedService(service);
    setTaskName(service.services); // Pre-fill task name with service name
    setModalOpen(true);
  };

  const handleConfirmAssign = () => {
    if (!taskName || !selectedEmployee || !selectedService) {
      alert("Please fill all required fields.");
      return;
    }

    axios
      .post("http://localhost:5000/api/assign-service", {
        services: taskName,
        alloted_to: selectedEmployee,
        due_date: selectedService.statutory_due_date,
        status: "Pending",
        udin: "N/A",
      })
      .then(() => {
        alert("Task assigned successfully!");
        setModalOpen(false);
        fetchServices(); // Refresh table
      })
      .catch((error) => {
        console.error("Error assigning task:", error);
        alert("Failed to assign task.");
      });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Services Triggered but Not Allotted
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        {services.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold mt-4">
            No data available
          </p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 ">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 border">Client Code</th>
                <th className="px-4 py-2 border">Client Name</th>
                <th className="px-4 py-2 border">Services</th>
                <th className="px-4 py-2 border">Triggered Date</th>
                <th className="px-4 py-2 border">Statutory Due Date</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="text-center hover:bg-gray-100">
                  <td className="px-4 py-2 border">{service.client_code}</td>
                  <td className="px-4 py-2 border">{service.client_name}</td>
                  <td className="px-4 py-2 border">{service.services}</td>
                  <td className="px-4 py-2 border">{formatDate(service.triggered_date)}</td>
                  <td className="px-4 py-2 border">{formatDate(service.statutory_due_date)}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                      onClick={() => handleAssignClick(service)}
                    >
                      Assign
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Assign Modal */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Assign Task</h2>

            <p>
              <strong>Client Code:</strong> {selectedService.client_code}
            </p>
            <p>
              <strong>Client Name:</strong> {selectedService.client_name}
            </p>
            <p>
              <strong>Services:</strong> {selectedService.services}
            </p>
            <p>
              <strong>Triggered Date:</strong>{" "}
              {formatDate(selectedService.triggered_date)}
            </p>
            <p>
              <strong>Statutory Due Date:</strong>{" "}
              {formatDate(selectedService.statutory_due_date)}
            </p>

            <label className="block mt-4 font-semibold">Task Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mt-1"
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
            />

            <label className="block mt-4 font-semibold">Assign To</label>
            <select
              className="w-full border px-3 py-2 rounded mt-1"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.employee_name}>
                  {employee.employee_name}
                </option>
              ))}
            </select>

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                onClick={handleConfirmAssign}
              >
                Confirm
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

export default ServicesTriggeredButNotAlloted;
