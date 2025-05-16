import React, { useState, useEffect } from 'react';
import { Search, RefreshCcw, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceDueDateAdd from './ServiceDueDateAdd';
import ServiceDueDateEdit from './ServiceDueDateEdit';
import axios from 'axios';

interface Service {
  id: number; // service_financial_details.id
  service_id: number; // service_financial_details.service_id
  ServiceMainCategory: string; // services.ServiceMainCategory
  ServiceName: string; // services.ServiceName
  GSTBillingCategory: string; // services.GSTBillingCategory
  DueDate: string; // services.DueDate
  UDIN: string; // services.UDIN
  ServiceNoOfClients: number; // services.NoOfClients
  NoOfTasks: number; // services.NoOfTasks
  FinancialYear: string; // service_financial_details.fy
  Periodicity: 'Annually' | 'Monthly' | 'Quarterly' | 'Six-Monthly'; // service_financial_details.periodicity
  FeesPerPeriod: number; // service_financial_details.Fees_Per_Period
  FinancialNoOfClients: number; // service_financial_details.NoOfClients
  statutory_due_date?: string | null; // service_financial_details.statutory_due_date
  trigger_date?: string | null; // service_financial_details.trigger_date
  target_date?: string | null; // service_financial_details.target_date
}

const ServiceDueDate: React.FC = () => {
  const [serviceCategory, setServiceCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/service-due-date`, {
        params: { dueDate: 'YES' },
      });
      setServices(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearch = () => {
    fetchServices();
  };

  const handleReset = () => {
    setServiceCategory('');
    setSearchTerm('');
    setCurrentPage(1);
    fetchServices();
  };

  const handleEdit = (service: Service) => {
    console.log('[DEBUG] Editing service:', service);
    setEditService(service);
    setShowEditForm(true);
  };

  const handleDelete = (id: number) => {
    setDeleteServiceId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (deleteServiceId === null) return;
    try {
      await axios.delete(`${backendUrl}/api/service-due-date/${deleteServiceId}`);
      setShowDeletePopup(false);
      setDeleteServiceId(null);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteServiceId(null);
  };

  const filteredServices = services.filter(
    (service) =>
      service.ServiceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (serviceCategory ? service.ServiceMainCategory === serviceCategory : true)
  );

  const totalPages = Math.ceil(filteredServices.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const paginatedServices = filteredServices.slice(startIndex, startIndex + parseInt(entriesPerPage));

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (showAddForm) {
    return <ServiceDueDateAdd onClose={() => setShowAddForm(false)} />;
  }

  if (showEditForm && editService) {
    return (
      <ServiceDueDateEdit
        onClose={() => {
          setShowEditForm(false);
          setEditService(null);
          fetchServices();
        }}
        editId={editService.id} // Use service_financial_details.id
        initialData={editService}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Service Due Date</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Main Category</label>
            <select
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Accounting">Accounting</option>
              <option value="Accounting -Monthly">Accounting -Monthly</option>
              <option value="Accounting and Book Keeping (Corporate)">Accounting and Book Keeping (Corporate)</option>
              <option value="Accounting and Book Keeping (Non Corporate)">Accounting and Book Keeping (Non Corporate)</option>
              <option value="Andhra Pradesh Profession Tax (Corporate)">Andhra Pradesh Profession Tax (Corporate)</option>
              <option value="Andhra Pradesh Profession Tax (Non Corporate)">Andhra Pradesh Profession Tax (Non Corporate)</option>
              <option value="Assam Profession Tax (Corporate)">Assam Profession Tax (Corporate)</option>
              <option value="Assam Profession Tax (Non Corporate)">Assam Profession Tax (Non Corporate)</option>
              <option value="Representation & Litigation (Corporate)">Representation & Litigation (Corporate)</option>
              <option value="Representation & Litigation (Non Corporate)">Representation & Litigation (Non Corporate)</option>
              <option value="RERA (Corporate)">RERA (Corporate)</option>
              <option value="RERA (Non Corporate)">RERA (Non Corporate)</option>
              <option value="ROC / Secretarial Compliance">ROC / Secretarial Compliance</option>
              <option value="ROF">ROF</option>
              <option value="Sikkim Profession Tax (Corporate)">Sikkim Profession Tax (Corporate)</option>
              <option value="Sikkim Profession Tax (Non Corporate)">Sikkim Profession Tax (Non Corporate)</option>
              <option value="Supervision">Supervision</option>
              <option value="Tamil Nadu Profession Tax (Corporate)">Tamil Nadu Profession Tax (Corporate)</option>
              <option value="Tamil Nadu Profession Tax (Non Corporate)">Tamil Nadu Profession Tax (Non Corporate)</option>
              <option value="Telangana Profession Tax (Corporate)">Telangana Profession Tax (Corporate)</option>
              <option value="Telangana Profession Tax (Non Corporate)">Telangana Profession Tax (Non Corporate)</option>
              <option value="West Bengal Profession Tax (Corporate)">West Bengal Profession Tax (Corporate)</option>
              <option value="West Bengal Profession Tax (Non Corporate)">West Bengal Profession Tax (Non Corporate)</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
            >
              <RefreshCcw size={18} />
              Reset
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
            >
              <Plus size={18} />
              Add
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-1"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Service Main Category</th>
                <th className="border px-4 py-2 text-left">Service Name</th>
                <th className="border px-4 py-2 text-left">GST Billing Category</th>
                <th className="border px-4 py-2 text-left">Due Date</th>
                <th className="border px-4 py-2 text-left">UDIN</th>
                <th className="border px-4 py-2 text-left">Service No. of Clients</th>
                <th className="border px-4 py-2 text-left">No. of Tasks</th>
                <th className="border px-4 py-2 text-left">Financial Year</th>
                <th className="border px-4 py-2 text-left min-w-[120px]">Periodicity</th>
                <th className="border px-4 py-2 text-left">Fees/Period</th>
                <th className="border px-4 py-2 text-left">Financial No. of Clients</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedServices.map((service, index) => (
                <tr key={service.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border px-4 py-2">{service.id}</td>
                  <td className="border px-4 py-2">{service.ServiceMainCategory}</td>
                  <td className="border px-4 py-2">{service.ServiceName}</td>
                  <td className="border px-4 py-2">{service.GSTBillingCategory}</td>
                  <td className="border px-4 py-2">{service.DueDate}</td>
                  <td className="border px-4 py-2">{service.UDIN}</td>
                  <td className="border px-4 py-2 text-blue-500">{service.ServiceNoOfClients}</td>
                  <td className="border px-4 py-2">{service.NoOfTasks}</td>
                  <td className="border px-4 py-2">{service.FinancialYear}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white text-xs whitespace-nowrap ${
                        service.Periodicity === 'Monthly'
                          ? 'bg-green-500'
                          : service.Periodicity === 'Quarterly'
                          ? 'bg-blue-500'
                          : service.Periodicity === 'Six-Monthly'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {service.Periodicity === 'Six-Monthly' ? 'Six Monthly' : service.Periodicity}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{service.FeesPerPeriod}</td>
                  <td className="border px-4 py-2 text-blue-500">{service.FinancialNoOfClients}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + parseInt(entriesPerPage), filteredServices.length)} of {filteredServices.length} entries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Are you sure you want to delete?</h3>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDueDate;