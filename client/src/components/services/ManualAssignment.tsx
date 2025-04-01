import { useState, useEffect } from "react";
import axios from "axios";

export default function ManualAssignment() {
  const [formData, setFormData] = useState({
    financialYear: "2024-2025",
    mainCategory: "",
    triggerDate: "",
    clientId: "",
    services: "",
    targetDate: "",
    priority: "medium",
    feesPeriod: "",
    workReportingHead: "",
    remark: "",
    employee: "",
    sopInstructions: "",
  });

  const [clients, setClients] = useState<{ client_id: number; client_name: string }[]>([]);
  const [employees, setEmployees] = useState<{ employee_id: number; employee_name: string }[]>([]);
  const [mainCategories, setMainCategories] = useState<{ ServiceMainCategory: string }[]>([]);
  const [servicesByCategory, setServicesByCategory] = useState<{ ServiceName: string }[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${backendUrl}/api/client-details`).then((response) => {
      setClients(response.data);
    });
    axios.get(`${backendUrl}/api/employee-details`).then((response) => {
      setEmployees(response.data);
    });
    axios.get(`${backendUrl}/api/service-main-categories`).then((response) => {
      setMainCategories(response.data);
    });
  }, []);

  useEffect(() => {
    if (formData.mainCategory) {
      axios.get(`${backendUrl}/api/services-by-category`, {
        params: { category: formData.mainCategory }
      }).then((response) => {
        setServicesByCategory(response.data);
      });
    }
  }, [formData.mainCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/manual-assignment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Data saved successfully!");
        setFormData({
          financialYear: "2024-2025",
          mainCategory: "",
          triggerDate: "",
          clientId: "",
          services: "",
          targetDate: "",
          priority: "medium",
          feesPeriod: "",
          workReportingHead: "",
          remark: "",
          employee: "",
          sopInstructions: "",
        });
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Generate financial years from 2022-2023 to 2015-2016
  const generateFinancialYears = () => {
    const years = [];
    for (let year = 2024; year >= 2015; year--) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };

  const financialYears = generateFinancialYears();

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Assign Manual Services to Client</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Financial Year <span className="text-red-500">*</span></label>
          <select name="financialYear" value={formData.financialYear} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
            {financialYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Main Category <span className="text-red-500">*</span></label>
          <select name="mainCategory" value={formData.mainCategory} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
            <option value="">Select Main Category</option>
            {mainCategories.map((category, index) => (
              <option key={index} value={category.ServiceMainCategory}>
                {category.ServiceMainCategory}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Trigger Date <span className="text-red-500">*</span></label>
          <input type="date" name="triggerDate" value={formData.triggerDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Clients <span className="text-red-500">*</span></label>
          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.client_id} value={client.client_id}>
                {client.client_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Services <span className="text-red-500">*</span></label>
          <select name="services" value={formData.services} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
            <option value="">Select Service</option>
            {servicesByCategory.map((service, index) => (
              <option key={index} value={service.ServiceName}>
                {service.ServiceName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Target Date</label>
          <input type="date" name="targetDate" value={formData.targetDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fees/Period</label>
          <input type="text" name="feesPeriod" value={formData.feesPeriod} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Work Reporting Head</label>
          <input type="text" name="workReportingHead" value={formData.workReportingHead} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Remark</label>
          <input type="text" name="remark" value={formData.remark} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Employee <span className="text-red-500">*</span></label>
          <select
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.employee_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">SOP / Instructions</label>
          <textarea name="sopInstructions" value={formData.sopInstructions} onChange={handleChange} className="w-full px-3 py-2 border rounded-md h-32"></textarea>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Save
        </button>
      </div>
    </div>
  );
}
