import { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  id: number;
  services: string;
  alloted_to: string;
  due_date: string;
  status: string;
  udin: string;
}

interface Employee {
  id: number;
  employee_name: string;
}

const AllServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employee-details").then((response) => {
      setEmployees(response.data);
    }).catch((error) => console.error("Error fetching employees:", error));
  }, []);

  useEffect(() => {
    const fetchServices = () => {
      let url = "http://localhost:5000/api/all-services";
      if (selectedEmployee) {
        url += `?alloted_to=${selectedEmployee}`;
      }
      axios.get(url).then((response) => {
        setServices(response.data);
      }).catch((error) => console.error("Error fetching services:", error));
    };

    fetchServices();
  }, [selectedEmployee]);

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedService) return;
    axios.put(`http://localhost:5000/api/update-service/${selectedService.id}`, selectedService)
      .then(() => {
        setServices(services.map(s => s.id === selectedService.id ? selectedService : s));
        setModalOpen(false);
      })
      .catch(error => console.error("Error updating service:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">All Services</h2>
      <div className="mb-4">
        <label className="mr-2">Select Employee:</label>
        <select
          value={selectedEmployee || ""}
          onChange={e => setSelectedEmployee(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.employee_name}>
              {emp.employee_name}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Service</th>
              <th className="px-4 py-2 border">Alloted To</th>
              <th className="px-4 py-2 border">Due Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">UDIN</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="text-center hover:bg-gray-100">
                <td className="px-4 py-2 border">{service.id}</td>
                <td className="px-4 py-2 border">{service.services}</td>
                <td className="px-4 py-2 border">{service.alloted_to}</td>
                <td className="px-4 py-2 border">{new Date(service.due_date).toLocaleDateString("en-GB")}</td>
                <td className={`px-4 py-2 border ${service.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                  {service.status}
                </td>
                <td className="px-4 py-2 border">{service.udin}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => handleEditClick(service)} className="px-3 py-1 bg-blue-500 text-white rounded-md">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Service</h3>
            <label>Service Name:</label>
            <input type="text" value={selectedService.services} onChange={e => setSelectedService({ ...selectedService, services: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-2" />
            <label>Alloted To:</label>
            <select value={selectedService.alloted_to} onChange={e => setSelectedService({ ...selectedService, alloted_to: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-2">
              {employees.map(emp => (
                <option key={emp.id} value={emp.employee_name}>
                  {emp.employee_name}
                </option>
              ))}
            </select>
            <label>Due Date:</label>
            <input
              type="date"
              value={selectedService?.due_date ? new Date(selectedService.due_date).toISOString().split("T")[0] : ""}
              onChange={(e) => setSelectedService({ ...selectedService, due_date: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-2" />
            <label>Status:</label>
            <select value={selectedService.status} onChange={e => setSelectedService({ ...selectedService, status: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <label>UDIN:</label>
            <select value={selectedService.udin} onChange={e => setSelectedService({ ...selectedService, udin: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="N/A">N/A</option>
              <option value="UDIN generated">UDIN generated</option>
              <option value="UDIN generated but not consumed">UDIN generated but not consumed</option>
              <option value="UDIN generated and consumed">UDIN generated and consumed</option>
            </select>
            <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2">Update</button>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllServices;
