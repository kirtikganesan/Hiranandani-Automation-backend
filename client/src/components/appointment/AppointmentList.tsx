import React, { useEffect, useState } from "react";

// Define the Appointment type
type Appointment = {
  id: number;
  appointment_date: string;
  client_name: string;
  to_meet: string;
  from_time: string;
  to_time: string;
  financial_year: string;
  enter_location: string;
  service_name: string;
  include_bill: boolean;
  meeting_purpose: string;
  status: string;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
};

const formatTime = (fromTime: string, toTime: string) => {
  return `${fromTime.slice(0, 5)}-${toTime.slice(0, 5)}`;
};

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments");
        const data: Appointment[] = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };

  const handleSave = async () => {
    if (editingAppointment) {
      try {
        const response = await fetch(`https://hiranandani-automation.onrender.com/api/appointments/${editingAppointment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingAppointment),
        });
        if (response.ok) {
          setAppointments(appointments.map(appt => appt.id === editingAppointment.id ? editingAppointment : appt));
          setEditingAppointment(null);
        } else {
          console.error('Error updating appointment:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://hiranandani-automation.onrender.com/api/appointments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAppointments(appointments.filter(appt => appt.id !== id));
        setDeleteId(null);
      } else {
        console.error('Error deleting appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className="mt-8 p-6">
      <h3 className="text-xl font-semibold mb-4">Appointment List</h3>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Client Name</th>
              <th className="px-4 py-2 border">To Meet</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Purpose</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="px-4 py-2 border">{formatDate(appointment.appointment_date)}</td>
                  <td className="px-4 py-2 border">{formatTime(appointment.from_time, appointment.to_time)}</td>
                  <td className="px-4 py-2 border">{appointment.client_name}</td>
                  <td className="px-4 py-2 border">{appointment.to_meet}</td>
                  <td className="px-4 py-2 border">{appointment.enter_location}</td>
                  <td className="px-4 py-2 border">{appointment.meeting_purpose}</td>
                  <td className={`px-4 py-2 border ${appointment.status === 'Pending' ? 'text-red-500' : 'text-green-500'}`}>
                    {appointment.status}
                  </td>
                  <td className="px-4 py-2 border flex space-x-2">
                    <button className="text-blue-500 hover:underline" onClick={() => handleEdit(appointment)}>Edit</button>
                    <button className="text-red-500 hover:underline" onClick={() => setDeleteId(appointment.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-2 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-full overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Appointment</h3>
            <div className="mb-4">
              <label className="block mb-2">Date</label>
              <input
                type="date"
                value={editingAppointment.appointment_date}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, appointment_date: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">From Time</label>
              <input
                type="time"
                value={editingAppointment.from_time}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, from_time: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">To Time</label>
              <input
                type="time"
                value={editingAppointment.to_time}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, to_time: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Client Name</label>
              <input
                type="text"
                value={editingAppointment.client_name}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, client_name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">To Meet</label>
              <input
                type="text"
                value={editingAppointment.to_meet}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, to_meet: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Location</label>
              <input
                type="text"
                value={editingAppointment.enter_location}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, enter_location: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Purpose</label>
              <textarea
                value={editingAppointment.meeting_purpose}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, meeting_purpose: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <select
                value={editingAppointment.status}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, status: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setEditingAppointment(null)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 mr-2">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Are you sure you want to delete?</h3>
            <div className="flex justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 mr-2">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId!)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
