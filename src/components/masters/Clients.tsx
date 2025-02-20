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
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;

  useEffect(() => {
    fetch("http://localhost:5000/api/client-details")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
        setFilteredClients(data);
      })
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  useEffect(() => {
    const fetchFilteredClients = () => {
      if (searchTerm.trim() === "") {
        setFilteredClients(clients);
      } else {
        fetch(`http://localhost:5000/api/client-details?search=${searchTerm}`)
          .then((response) => response.json())
          .then((data) => setFilteredClients(data))
          .catch((error) => console.error("Error searching clients:", error));
      }
      setCurrentPage(1);
    };

    fetchFilteredClients();
  }, [searchTerm, clients]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredClients.slice(indexOfFirstEntry, indexOfLastEntry);

  const nextPage = () => {
    if (indexOfLastEntry < filteredClients.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Clients</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Client Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
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
            {currentEntries.map((client) => (
              <tr key={client.id} className="border">
                <td className="border p-2 text-blue-600 font-bold">{client.client_name}</td>
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
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-500 text-white p-2 rounded disabled:opacity-50">Previous</button>
        <span className="p-2">Page {currentPage}</span>
        <button onClick={nextPage} disabled={indexOfLastEntry >= filteredClients.length} className="bg-gray-500 text-white p-2 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default Clients;
