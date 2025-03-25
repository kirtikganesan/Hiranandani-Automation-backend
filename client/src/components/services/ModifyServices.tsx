import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Service, ServiceFormData } from '../../types/service';
import ServiceForm from './ServiceForm';
import DeleteModal from './DeleteModal';

const ModifyServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch services from backend
  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/services', {
        params: {
          financialYear: selectedYear,
          serviceMainCategory: selectedCategory,
          searchTerm: searchTerm
        }
      });
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      // Optional: Add error handling toast or notification
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch services when filters change
  useEffect(() => {
    fetchServices();
  }, [selectedYear, selectedCategory, searchTerm]);

  // Add new service
  const handleAdd = async (data: ServiceFormData) => {
    try {
      const response = await axios.post('/api/services', {
        serviceMainCategory: data.ServiceMainCategory,
        serviceName: data.ServiceName,
        financialYear: data.financialYear,
        gstBillingCategory: data.GSTBillingCategory,
        dueDate: data.DueDate,
        udin: data.UDIN,
        noOfTasks: data.tasks.length,
      });
      
      // Update local state
      setServices([...services, response.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add service:', error);
      // Optional: Add error handling toast or notification
    }
  };

  // Edit existing service
  const handleEdit = async (data: ServiceFormData) => {
    if (editingService) {
      try {
        await axios.put(`/api/services/${editingService.id}`, {
          serviceMainCategory: data.ServiceMainCategory,
          serviceName: data.ServiceName,
          gstBillingCategory: data.GSTBillingCategory,
          dueDate: data.DueDate,
          udin: data.UDIN,
          noOfTasks: data.tasks.length,
        });

        // Refetch services to ensure latest data
        fetchServices();
        setEditingService(null);
      } catch (error) {
        console.error('Failed to edit service:', error);
        // Optional: Add error handling toast or notification
      }
    }
  };

  // Delete service
  const handleDelete = (id: string) => {
    setServiceToDelete(id);
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (serviceToDelete) {
      try {
        await axios.delete(`/api/services/${serviceToDelete}`);
        
        // Refetch services to ensure latest data
        fetchServices();
        setDeleteModalOpen(false);
        setServiceToDelete(null);
      } catch (error) {
        console.error('Failed to delete service:', error);
        // Optional: Add error handling toast or notification
      }
    }
  };

  return (
    <div className="p-6">
      {!showAddForm && !editingService && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Services</h1>
            <div className="space-x-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add New
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Import Services
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Financial Year
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Main Category
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="ROC">ROC</option>
                <option value="Accounting">Accounting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services..."
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-2">Service Main Category</th>
                    <th className="px-4 py-2">Service Name</th>
                    <th className="px-4 py-2">F.Y.</th>
                    <th className="px-4 py-2">GST Billing Category</th>
                    <th className="px-4 py-2">Due Date</th>
                    <th className="px-4 py-2">UDIN</th>
                    <th className="px-4 py-2">No.of Clients</th>
                    <th className="px-4 py-2">No.of Tasks</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b">
                      <td className="px-4 py-2">{service.ServiceMainCategory}</td>
                      <td className="px-4 py-2">{service.ServiceName}</td>
                      <td className="px-4 py-2">2024-2025</td>
                      <td className="px-4 py-2">{service.GSTBillingCategory}</td>
                      <td className="px-4 py-2">{service.DueDate}</td>
                      <td className="px-4 py-2">{service.UDIN}</td>
                      <td className="px-4 py-2">{service.NoOfClients}</td>
                      <td className="px-4 py-2">{service.NoOfTasks}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => {
                            // Convert snake_case to camelCase for frontend
                            const editData = {
                              id: service.id,
                              serviceMainCategory: service.ServiceMainCategory,
                              serviceName: service.ServiceName,
                              financialYear: service.financialYear,
                              gstBillingCategory: service.GSTBillingCategory,
                              dueDate: service.DueDate === 'YES',
                              udin: service.UDIN === 'YES',
                              noOfClients: service.NoOfClients,
                              noOfTasks: service.NoOfTasks
                            };
                            setEditingService(editData as unknown as Service);
                          }}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id.toString())}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {(showAddForm || editingService) && (
        <ServiceForm
          initialData={editingService || undefined}
          onSubmit={editingService ? handleEdit : handleAdd}
          onCancel={() => {
            setShowAddForm(false);
            setEditingService(null);
          }}
          isEdit={!!editingService}
        />
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ModifyServices;