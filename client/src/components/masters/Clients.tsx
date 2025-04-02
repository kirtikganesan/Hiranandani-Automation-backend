import React, { useEffect, useState } from "react";
import axios from "axios";

interface Client {
  id: number;
  client_name: string;
  client_group: string;
  branch: string;
  contact: string;
  email: string;
  services_prev_year: string;
  services_curr_year: string;
  full_name?: string;
  constitution?: string;
  client_code?: string;
  client_pan?: string;
  client_tan?: string;
  client_gstin?: string;
  industry?: string;
  date_of_incorporation?: string;
  address_line_1?: string;
  address_line_2?: string;
  area?: string;
  city?: string;
  state?: string;
  district?: string;
  pincode?: string;
  services?: string[];
}

interface NewClient {
  client_name: string;
  full_name?: string;
  client_group?: string;
  branch?: string;
  email?: string;
  contact?: string;
  constitution?: string;
  client_code?: string;
  client_pan?: string;
  client_tan?: string;
  client_gstin?: string;
  industry?: string;
  date_of_incorporation?: string;
  address_line_1?: string;
  address_line_2?: string;
  area?: string;
  city?: string;
  state?: string;
  district?: string;
  pincode?: string;
  services: string[];
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);
  const [newClient, setNewClient] = useState<NewClient>({
    client_name: "",
    full_name: "",
    client_group: "",
    branch: "Head Office",
    email: "",
    contact: "",
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
    services: [],
  });
  const [services, setServices] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showServiceSelector, setShowServiceSelector] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [showNewServiceInput, setShowNewServiceInput] = useState(false);
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  // Process client data to ensure services is always an array
  const processClientData = (client: any): Client => {
    // Ensure services is an array
    let processedServices = [];
    
    if (client.services) {
      try {
        // If it's a JSON string, parse it
        if (typeof client.services === 'string') {
          processedServices = JSON.parse(client.services);
        } 
        // If it's already an array, use it
        else if (Array.isArray(client.services)) {
          processedServices = client.services;
        }
      } catch (error) {
        console.error("Error parsing services:", error);
        processedServices = [];
      }
    }
    
    return {
      ...client,
      services: processedServices
    };
  };

  useEffect(() => {
    fetch(`${backendUrl}/api/client-details`)
      .then((response) => response.json())
      .then((data) => {
        // Process each client to ensure services is always an array
        const processedData = data.map(processClientData);
        setClients(processedData);
        setFilteredClients(processedData);
      })
      .catch((error) => console.error("Error fetching clients:", error));

    fetch(`${backendUrl}/api/unique-options`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data.services);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  useEffect(() => {
    const fetchFilteredClients = () => {
      if (searchTerm.trim() === "") {
        setFilteredClients(clients);
      } else {
        fetch(`${backendUrl}/api/client-details?search=${searchTerm}`)
          .then((response) => response.json())
          .then((data) => {
            // Process each client to ensure services is always an array
            const processedData = data.map(processClientData);
            setFilteredClients(processedData);
          })
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
    
    // Handle the phone/contact field name inconsistency
    if (name === "phone") {
      setNewClient((prevClient) => ({
        ...prevClient,
        contact: value,
      }));
    } else {
      setNewClient((prevClient) => ({
        ...prevClient,
        [name]: value,
      }));
    }
  };

  const handleServiceSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedService = e.target.value;
    
    if (selectedService === "other") {
      setShowNewServiceInput(true);
    } else if (selectedService && selectedService !== "") {
      // Check if service is already selected
      if (!newClient.services.includes(selectedService)) {
        setNewClient((prevClient) => ({
          ...prevClient,
          services: [...prevClient.services, selectedService],
        }));
      }
      // Reset the selector
      setShowServiceSelector(false);
    }
  };

  const handleAddNewService = () => {
    if (newServiceName.trim() !== "" && !services.includes(newServiceName)) {
      axios.post(`${backendUrl}/api/add-service`, { serviceName: newServiceName })
        .then((response) => {
          // Add to services list
          setServices((prevServices) => [...prevServices, response.data.serviceName]);
          // Add to current client's services
          if (!newClient.services.includes(response.data.serviceName)) {
            setNewClient((prevClient) => ({
              ...prevClient,
              services: [...prevClient.services, response.data.serviceName],
            }));
          }
          // Reset inputs
          setNewServiceName("");
          setShowNewServiceInput(false);
          setShowServiceSelector(false);
        })
        .catch((error) => console.error("Error adding service:", error));
    }
  };

  const removeService = (serviceToRemove: string) => {
    setNewClient((prevClient) => ({
      ...prevClient,
      services: prevClient.services.filter(service => service !== serviceToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.client_name) {
      alert("Client Name is required.");
      return;
    }

    const clientData = {
      ...newClient,
      // Ensure we're sending an array for services, even if empty
      services: Array.isArray(newClient.services) ? newClient.services : []
    };

    // Use client_code for the endpoint if available, else use the ID
    const idForEndpoint = isEditMode ? 
      (newClient.client_code || editingClientId) : null;
      
    const endpoint = isEditMode ? 
      `${backendUrl}/api/client-details/${idForEndpoint}` : 
      `${backendUrl}/api/client-details`;
      
    const method = isEditMode ? "put" : "post";

    console.log("Submitting client data:", clientData);
    console.log("Endpoint:", endpoint);
    console.log("Method:", method);

    axios[method](endpoint, clientData)
      .then((response) => {
        // Handle the response
        let updatedClient;
        
        if (isEditMode) {
          // For edit mode, use our client data with the ID we were editing
          updatedClient = {
            ...clientData,
            id: editingClientId as number
          };
        } else {
          // For new client, use the response data which should include the new ID
          updatedClient = {
            ...response.data,
            services: Array.isArray(response.data.services) ? response.data.services : []
          };
        }
        
        // Update clients list
        setClients((prevClients) =>
          isEditMode
            ? prevClients.map((client) => (client.id === editingClientId ? updatedClient : client))
            : [...prevClients, updatedClient]
        );
        
        // Reset form
        setIsFormVisible(false);
        setIsSuccessModalVisible(true);
        setNewClient({
          client_name: "",
          full_name: "",
          client_group: "",
          branch: "Head Office",
          email: "",
          contact: "",
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
          services: [],
        });
        setIsEditMode(false);
        setEditingClientId(null);
      })
      .catch((error) => console.error("Error adding/updating client:", error));
  };

  const handleEdit = (client: Client) => {
    // Process the client's services to ensure it's an array
    const processedClient = processClientData(client);
    setEditingClientId(client.id);
    
    // Log the services to help with debugging
    console.log("Client services before editing:", processedClient.services);
    
    setNewClient({
      client_name: processedClient.client_name,
      full_name: processedClient.full_name || "",
      client_group: processedClient.client_group || "",
      branch: processedClient.branch || "Head Office",
      email: processedClient.email || "",
      contact: processedClient.contact || "",
      constitution: processedClient.constitution || "",
      client_code: processedClient.client_code || processedClient.id.toString(),
      client_pan: processedClient.client_pan || "",
      client_tan: processedClient.client_tan || "",
      client_gstin: processedClient.client_gstin || "",
      industry: processedClient.industry || "",
      date_of_incorporation: processedClient.date_of_incorporation || "",
      address_line_1: processedClient.address_line_1 || "",
      address_line_2: processedClient.address_line_2 || "",
      area: processedClient.area || "",
      city: processedClient.city || "",
      state: processedClient.state || "",
      district: processedClient.district || "",
      pincode: processedClient.pincode || "",
      services: Array.isArray(processedClient.services) ? [...processedClient.services] : [],
    });
    
    setIsFormVisible(true);
    setIsEditMode(true);
    setActiveTab("basic"); // Start with basic tab when editing
  };

  const handleDelete = (id: number) => {
    setClientToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (clientToDelete !== null) {
      axios.delete(`${backendUrl}/api/client-details/${clientToDelete}`)
        .then(() => {
          setClients((prevClients) => prevClients.filter((client) => client.id !== clientToDelete));
          setFilteredClients((prevClients) => prevClients.filter((client) => client.id !== clientToDelete));
          setIsDeleteModalVisible(false);
        })
        .catch((error) => console.error("Error deleting client:", error));
    }
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
        <button onClick={() => {
          setIsFormVisible(true);
          setIsEditMode(false);
          setEditingClientId(null);
          setNewClient({
            client_name: "",
            full_name: "",
            client_group: "",
            branch: "Head Office",
            email: "",
            contact: "",
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
            services: [],
          });
          setActiveTab("basic");
        }} className="bg-blue-500 text-white p-2 rounded">Add Client</button>
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
              <th className="border p-2">Constitution</th>
              <th className="border p-2">PAN No</th>
              <th className="border p-2">Applicable Services</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {currentEntries.map((client) => (
            <tr key={client.id} className="border">
              <td className="border p-2 text-blue-600 font-bold">{client.client_name}</td>
              <td className="border p-2">{client.client_group}</td>
              <td className="border p-2">{client.branch}</td>
              <td className="border p-2">{client.contact}</td>
              <td className="border p-2">{client.email}</td>
              <td className="border p-2">{client.constitution}</td>
              <td className="border p-2">{client.client_pan}</td>
              <td className="border p-2">
                {Array.isArray(client.services) ? client.services.join(", ") : "No services"}
              </td>
              <td className="border p-2">
                <button onClick={() => handleEdit(client)} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(client.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
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
            <h3 className="text-xl font-bold mb-4">{isEditMode ? "Edit Client" : "Add New Client"}</h3>
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab("basic")}
                className={`px-4 py-2 ${activeTab === "basic" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
              >
                Basic
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`px-4 py-2 ${activeTab === "services" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
              >
                Applicable Services
              </button>
            </div>
            {activeTab === "basic" && (
              <form onSubmit={(e) => {
                e.preventDefault();
                setActiveTab("services");
              }}>
                <div className="mb-4">
                  <label className="block mb-2">Client Name <span className="text-red-500">*</span></label>
                  <input type="text" name="client_name" value={newClient.client_name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Full Name</label>
                  <input type="text" name="full_name" value={newClient.full_name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Client Group</label>
                  <input type="text" name="client_group" value={newClient.client_group} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Branch</label>
                  <select name="branch" value={newClient.branch} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md">
                    <option value="Head Office">Head Office</option>
                    <option value="Varsha Badlani's Office">Varsha Badlani's Office</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Email</label>
                  <input type="email" name="email" value={newClient.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Phone</label>
                  <input type="text" name="contact" value={newClient.contact} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Constitution</label>
                  <input type="text" name="constitution" value={newClient.constitution} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Client Code</label>
                  <input type="text" name="client_code" value={newClient.client_code} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">PAN No</label>
                  <input type="text" name="client_pan" value={newClient.client_pan} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">TAN No</label>
                  <input type="text" name="client_tan" value={newClient.client_tan} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">GSTIN No</label>
                  <input type="text" name="client_gstin" value={newClient.client_gstin} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Industry</label>
                  <input type="text" name="industry" value={newClient.industry} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Date of Incorporation</label>
                  <input type="date" name="date_of_incorporation" value={newClient.date_of_incorporation} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Address Line 1</label>
                  <input type="text" name="address_line_1" value={newClient.address_line_1} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Address Line 2</label>
                  <input type="text" name="address_line_2" value={newClient.address_line_2} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Area</label>
                  <input type="text" name="area" value={newClient.area} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">City</label>
                  <input type="text" name="city" value={newClient.city} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">State</label>
                  <input type="text" name="state" value={newClient.state} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">District</label>
                  <input type="text" name="district" value={newClient.district} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Pincode</label>
                  <input type="text" name="pincode" value={newClient.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-gray-400 text-white p-2 rounded mr-2">Next</button>
                </div>
              </form>
            )}
            {activeTab === "services" && (
              <div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Selected Services</label>
                  {newClient.services && newClient.services.length > 0 ? (
                    <div className="border rounded-md p-2 mb-4">
                      {newClient.services.map((service, index) => (
                        <div key={index} className="flex justify-between items-center bg-blue-50 p-2 mb-2 rounded-md">
                          <span>{service}</span>
                          <button 
                            type="button" 
                            onClick={() => removeService(service)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic mb-4">No services selected</div>
                  )}
                  
                  {showServiceSelector ? (
                    <div className="mb-4">
                      <select 
                        className="w-full px-3 py-2 border rounded-md"
                        onChange={handleServiceSelection}
                        value=""
                      >
                        <option value="">Select a service</option>
                        {services
                          .filter(service => !newClient.services.includes(service))
                          .map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                          ))
                        }
                        <option value="other">Add new service</option>
                      </select>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowServiceSelector(true)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-md mb-4"
                    >
                      + Add service
                    </button>
                  )}
                  
                  {showNewServiceInput && (
                    <div className="flex mb-4">
                      <input
                        type="text"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        placeholder="Enter new service name"
                        className="flex-grow px-3 py-2 border rounded-l-md"
                      />
                      <button
                        type="button"
                        onClick={handleAddNewService}
                        className="bg-green-500 text-white px-3 py-2 rounded-r-md"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setActiveTab("basic")} className="bg-gray-400 text-white p-2 rounded mr-2">Back</button>
                  <button type="button" onClick={handleSubmit} className="bg-green-600 text-white p-2 rounded">Submit</button>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button type="button" onClick={() => {
                setIsFormVisible(false);
                setActiveTab("basic");
                setIsEditMode(false);
                setEditingClientId(null);
              }} className="bg-gray-400 text-white p-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {isSuccessModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Client {isEditMode ? "updated" : "added"} successfully</h3>
            <button onClick={() => setIsSuccessModalVisible(false)} className="bg-blue-500 text-white p-2 rounded text-center w-full">OK</button>
          </div>
        </div>
      )}
      {isDeleteModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this client?</h3>
            <div className="flex justify-end">
              <button onClick={() => setIsDeleteModalVisible(false)} className="bg-gray-400 text-white p-2 rounded mr-2">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-500 text-white p-2 rounded">Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;