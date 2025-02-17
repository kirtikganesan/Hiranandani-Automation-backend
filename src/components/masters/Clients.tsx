import React, { useEffect, useState } from "react";

interface Client {
  id: number;
  client_name: string;
  client_group: string;
  branch: string;
  phone: string;
  email: string;
  services_prev_year: string;
  services_curr_year: string;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/client-details") // Update with your API endpoint
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Clients</h2>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border p-2">Client Name</th>
              <th className="border p-2">Client Group</th>
              <th className="border p-2">Branch</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Services Prev. Year</th>
              <th className="border p-2">Services Curr. Year</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border">
                <td className="border p-2 font-semibold text-center">{client.client_name}</td>
                <td className="border p-2">{client.client_group}</td>
                <td className="border p-2">{client.branch}</td>
                <td className="border p-2">{client.phone}</td>
                <td className="border p-2">{client.email}</td>
                <td className="border p-2">{client.services_prev_year}</td>
                <td className="border p-2">{client.services_curr_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;