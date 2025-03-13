import React, { useState,useEffect } from "react";
import axios from "axios";

const AddTimesheet = () => {
  const [formData, setFormData] = useState({
    timesheet_date: "",
    worked_at: "",
    in_time: "",
    out_time: "",
    total_time: "",
    allotted_client: "",
    service: "",
    non_allotted_services: false,
    office_related: false,
    notice_appointment: false,
  });

  const [clients, setClients] = useState<string[]>([]);

  useEffect(() => {
    axios.get("https://hiranandani-automation.onrender.com/api/client-details")
      .then((response) => {
        setClients(response.data.map((client: { client_name: string }) => client.client_name));
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  

  // Calculate total time when in_time or out_time changes
  const calculateTotalTime = () => {
    if (formData.in_time && formData.out_time) {
      const inTime = new Date(`1970-01-01T${formData.in_time}:00Z`);
      const outTime = new Date(`1970-01-01T${formData.out_time}:00Z`);
      const diffMs = outTime.getTime() - inTime.getTime();
      
      if (diffMs < 0) {
        alert("Out time must be after In time.");
        return;
      }

      const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
      const totalMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setFormData((prev) => ({
        ...prev,
        total_time: `${totalHours.toString().padStart(2, "0")}:${totalMinutes.toString().padStart(2, "0")}`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://hiranandani-automation.onrender.com/api/timesheets", formData);
      alert("Timesheet added successfully!");
      setFormData({
        timesheet_date: "",
        worked_at: "",
        in_time: "",
        out_time: "",
        total_time: "",
        allotted_client: "",
        service: "",
        non_allotted_services: false,
        office_related: false,
        notice_appointment: false,
      });
    } catch (error) {
      console.error("Error adding timesheet:", error);
      alert("Failed to add timesheet");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add Timesheet</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timesheet Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="timesheet_date"
                value={formData.timesheet_date}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Worked at</label>
              <select
                name="worked_at"
                value={formData.worked_at}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="office">Office</option>
                <option value="client">Client Location</option>
                <option value="home">Work from Home</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                In Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="in_time"
                value={formData.in_time}
                onChange={handleChange}
                onBlur={calculateTotalTime}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Out Time</label>
              <input
                type="time"
                name="out_time"
                value={formData.out_time}
                onChange={handleChange}
                onBlur={calculateTotalTime}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Time</label>
              <input
                type="text"
                name="total_time"
                value={formData.total_time}
                readOnly
                className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allotted Client</label>
              <select
                name="allotted_client"
                value={formData.allotted_client}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {clients.map((client, index) => (
                  <option key={index} value={client}>{client}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Also Fill</label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="non_allotted_services"
                  checked={formData.non_allotted_services}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2">Non Allotted Services</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="office_related"
                  checked={formData.office_related}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2">Office Related</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="notice_appointment"
                  checked={formData.notice_appointment}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2">Notice/Appointment</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Fill Timesheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimesheet;
