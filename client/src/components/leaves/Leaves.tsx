import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaves = () => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Converts to DD/MM/YYYY format
  };
  interface Leave {
    id: number;
    employee_name: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
    leave_duration: string;
  }
  const [employees, setEmployees] = useState<{ id: number; employee_name: string }[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    leave_duration: "full",
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    axios.get(`${backendUrl}/api/employees`)
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  useEffect(() => {
    axios.get<Leave[]>(`${backendUrl}/api/leaves`)
      .then(response => setLeaves(response.data))
      .catch(error => console.error("Error fetching leaves:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`${backendUrl}/api/apply-leave`, formData)
      .then(() => alert("Leave applied successfully"))
      .catch((error) => console.error("Error submitting leave:", error));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Leaves</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee <span className="text-red-500">*</span>
              </label>
              <select name="employee_id" value={formData.employee_id} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm">
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.employee_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Type <span className="text-red-500">*</span>
              </label>
              <select name="leave_type" value={formData.leave_type} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm">
                <option value="">Select</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="earned">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea name="reason" rows={3} value={formData.reason} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Leave for <span className="text-red-500">*</span>
            </label>
            <div className="space-x-4">
              {["full", "first", "second"].map((duration) => (
                <label key={duration} className="inline-flex items-center">
                  <input type="radio" name="leave_duration" value={duration} checked={formData.leave_duration === duration} onChange={handleChange} className="text-blue-600" />
                  <span className="ml-2">{duration === "full" ? "Full Day" : duration === "first" ? "First Half" : "Second Half"}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="reset" className="px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">Submit</button>
          </div>
        </form>

         <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Leave Records</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3">Employee</th>
                  <th className="px-6 py-3">Leave Type</th>
                  <th className="px-6 py-3">Start</th>
                  <th className="px-6 py-3">End</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">Duration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {leaves.map(leave => (
                  <tr key={leave.id}>
                    <td className="px-6 py-4">{leave.employee_name}</td>
                    <td className="px-6 py-4">{leave.leave_type}</td>
                    <td className="px-6 py-4">{formatDate(leave.start_date)}</td>
                    <td className="px-6 py-4">{formatDate(leave.end_date)}</td>
                    <td className="px-6 py-4">{leave.reason}</td>
                    <td className="px-6 py-4">{leave.leave_duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
