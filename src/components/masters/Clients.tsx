import React, { useEffect, useState } from "react";
import axios from "axios";

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

interface NewClient {
  client_name: string;
  full_name: string;
  client_group: string;
  branch: string;
  email: string;
  phone: string;
  constitution: string;
  client_code: string;
  client_pan: string;
  client_tan: string;
  client_gstin: string;
  industry: string;
  date_of_incorporation: string;
  address_line_1: string;
  address_line_2: string;
  area: string;
  city: string;
  state: string;
  district: string;
  pincode: string;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [newClient, setNewClient] = useState<NewClient>({
    client_name: "",
    full_name: "",
    client_group: "",
    branch: "Head Office",
    email: "",
    phone: "",
    constitution: "",
    client_code: "",
    client_pan: "",
    client_tan: "",
    client_gstin: "",
    industry: "",
    date_of_incorporation: "",
    address_line_1: "",
    address_line_2: "",
    area: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/client-details", newClient)
      .then((response) => {
        setClients([...clients, response.data]);
        setFilteredClients([...clients, response.data]);
        setIsFormVisible(false);
        setIsSuccessModalVisible(true);
        setNewClient({
          client_name: "",
          full_name: "",
          client_group: "",
          branch: "Head Office",
          email: "",
          phone: "",
          constitution: "",
          client_code: "",
          client_pan: "",
          client_tan: "",
          client_gstin: "",
          industry: "",
          date_of_incorporation: "",
          address_line_1: "",
          address_line_2: "",
          area: "",
          city: "",
          state: "",
          district: "",
          pincode: "",
        });
      })
      .catch((error) => console.error("Error adding client:", error));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Clients</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Client Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-2/3"
        />
        <button onClick={() => setIsFormVisible(true)} className="bg-blue-500 text-white p-2 rounded">Add Client</button>
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
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-full overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add New Client</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Client Name</label>
                <input type="text" name="client_name" value={newClient.client_name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Full Name</label>
                <input type="text" name="full_name" value={newClient.full_name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Client Group</label>
                <input type="text" name="client_group" value={newClient.client_group} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Branch</label>
                <select name="branch" value={newClient.branch} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required>
                  <option value="Head Office">Head Office</option>
                  <option value="Varsha Badlani's Office">Varsha Badlani's Office</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input type="email" name="email" value={newClient.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone</label>
                <input type="text" name="phone" value={newClient.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Constitution</label>
                <input type="text" name="constitution" value={newClient.constitution} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Client Code</label>
                <input type="text" name="client_code" value={newClient.client_code} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">PAN No</label>
                <input type="text" name="client_pan" value={newClient.client_pan} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">TAN No</label>
                <input type="text" name="client_tan" value={newClient.client_tan} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">GSTIN No</label>
                <input type="text" name="client_gstin" value={newClient.client_gstin} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Industry</label>
                <input type="text" name="industry" value={newClient.industry} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Date of Incorporation</label>
                <input type="date" name="date_of_incorporation" value={newClient.date_of_incorporation} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address Line 1</label>
                <input type="text" name="address_line_1" value={newClient.address_line_1} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address Line 2</label>
                <input type="text" name="address_line_2" value={newClient.address_line_2} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Area</label>
                <input type="text" name="area" value={newClient.area} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">City</label>
                <input type="text" name="city" value={newClient.city} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">State</label>
                <input type="text" name="state" value={newClient.state} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">District</label>
                <input type="text" name="district" value={newClient.district} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Pincode</label>
                <input type="text" name="pincode" value={newClient.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-green-600 text-white p-2 rounded mr-2">Submit</button>
                <button type="button" onClick={() => setIsFormVisible(false)} className="bg-gray-400 text-white p-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isSuccessModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Client added successfully</h3>
            <button onClick={() => setIsSuccessModalVisible(false)} className="bg-blue-500 text-white p-2 rounded text-center">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
