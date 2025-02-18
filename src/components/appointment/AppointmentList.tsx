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
  meeting_purpose: string
};

const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/appointments"); // Replace with your actual API
        const data: Appointment[] = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

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
                  <td className="px-4 py-2 border">{appointment.from_time} - {appointment.to_time}</td>
                  <td className="px-4 py-2 border">{appointment.client_name}</td>
                  <td className="px-4 py-2 border">{appointment.to_meet}</td>
                  <td className="px-4 py-2 border">{appointment.enter_location}</td>
                  <td className="px-4 py-2 border">{appointment.meeting_purpose}</td>
                  <td className="px-4 py-2 border text-red-500">Pending</td>
                  <td className="px-4 py-2 border">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="ml-2 text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-4 py-2 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
