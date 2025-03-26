import React, { useState, useEffect } from 'react';
import AppointmentList from './AppointmentList';

const Appointment = () => {
  const [formData, setFormData] = useState({
    appointment_date: '',
    client_name: '',
    to_meet: '',
    from_time: '',
    to_time: '',
    enter_location: '',
    meeting_purpose: '',
  });

  const [clients, setClients] = useState<string[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names

  // Fetch client names from the backend
  useEffect(() => {
    fetch(`${backendUrl}/api/client-details`) // Fetch client names from API
      .then((response) => response.json())
      .then((data) => {
        setClients(data.map((client: { client_name: string }) => client.client_name)); // Extract client names
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Appointment saved successfully!');
        setFormData({
          appointment_date: '',
          client_name: '',
          to_meet: '',
          from_time: '',
          to_time: '',
          enter_location: '',
          meeting_purpose: '',
        });
      } else {
        alert('Failed to save appointment');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the appointment');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Appointment</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name <span className="text-red-500">*</span>
              </label>
              <select
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                {clients.map((client, index) => (
                  <option key={index} value={client}>
                    {client}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Meet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="to_meet"
                value={formData.to_meet}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="from_time"
                value={formData.from_time}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="to_time"
                value={formData.to_time}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Location <span className="text-red-500">*</span>
            </label>
            <textarea
              name="enter_location"
              value={formData.enter_location}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Purpose <span className="text-red-500">*</span>
            </label>
            <textarea
              name="meeting_purpose"
              value={formData.meeting_purpose}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <AppointmentList />
    </div>
  );
};

export default Appointment;
