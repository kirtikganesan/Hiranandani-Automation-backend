import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Service {
  id: number;
  service_name: string;
  dependent_services: number;
  gst_billing_categories: number;
}

const ServiceMainCategory = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState('');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editValue, setEditValue] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/service-main');
      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        console.error('Unexpected API response:', response.data);
        setServices([]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    }
  };

  const addService = async () => {
    if (!newService.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/service-main', {
        service_name: newService,
        dependent_services: 0,
        gst_billing_categories: 0,
      });
      setNewService('');
      fetchServices();
      showMessage('Added successfully');
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const updateService = async () => {
    if (!editValue.trim() || !editingService) return;
    try {
      await axios.put(`http://localhost:5000/api/service-main/${editingService.id}`, {
        service_name: editValue,
      });
      setEditingService(null);
      fetchServices();
      showMessage('Updated successfully');
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const confirmDelete = (id: number) => {
    setShowDeleteConfirm(id);
  };

  const deleteService = async () => {
    if (showDeleteConfirm === null) return;
    try {
      await axios.delete(`http://localhost:5000/api/service-main/${showDeleteConfirm}`);
      fetchServices();
      showMessage('Deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
    }
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Service Main Category</h2>
      {message && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-4 rounded shadow-lg">
          <p>{message}</p>
          <button onClick={() => setMessage(null)} className="mt-2 bg-white text-green-500 px-4 py-2 rounded text-center">Ok</button>
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add new service"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addService} className="bg-blue-500 text-white p-2">Save</button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className='bg-gray-800 text-white'>
            <th className="border p-2">Service Name</th>
            <th className="border p-2">Dependent Services</th>
            <th className="border p-2">GST Billing Categories</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.id}>
                <td className="border p-2">{service.service_name}</td>
                <td className="border p-2">{service.dependent_services}</td>
                <td className="border p-2">{service.gst_billing_categories}</td>
                <td className="border p-2">
                  <button
                    onClick={() => { setEditingService(service); setEditValue(service.service_name); }}
                    className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(service.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border p-2 text-center">No services available</td>
            </tr>
          )}
        </tbody>
      </table>
      {editingService && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Edit the service main category</h3>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button onClick={updateService} className="bg-blue-500 text-white p-2 mr-2">Save</button>
            <button onClick={() => setEditingService(null)} className="bg-gray-500 text-white p-2">Cancel</button>
          </div>
        </div>
      )}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded text-center">
            <p className="mb-4">Are you sure you want to delete?</p>
            <button onClick={deleteService} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Ok</button>
            <button onClick={() => setShowDeleteConfirm(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceMainCategory;
