import React, { useState, useEffect } from 'react';
import { ServiceFormData } from '../../types/service';

interface ServiceFormProps {
  initialData?: Partial<ServiceFormData>;
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
  mainCategories: string[];
  gstCategories: string[];
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
  mainCategories,
  gstCategories,
}) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    ServiceMainCategory: '',
    ServiceName: '',
    GSTBillingCategory: '',
    DueDate: '',
    UDIN: '',
    financialYear: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ServiceMainCategory: initialData.ServiceMainCategory || '',
        ServiceName: initialData.ServiceName || '',
        GSTBillingCategory: initialData.GSTBillingCategory || '',
        DueDate: initialData.DueDate ? 'YES' : 'NO', // Transform to 'YES' or 'NO'
        UDIN: initialData.UDIN ? 'YES' : 'NO', // Transform to 'YES' or 'NO'
        financialYear: initialData.financialYear || '',
      });
    }
  }, [initialData]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit Service' : 'Add Service'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Main Category*
            </label>
            <select
              name="ServiceMainCategory"
              value={formData.ServiceMainCategory}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              {mainCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Name*
            </label>
            <input
              type="text"
              name="ServiceName"
              value={formData.ServiceName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              GST Billing Category*
            </label>
            <select
              name="GSTBillingCategory"
              value={formData.GSTBillingCategory}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              {gstCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date*
            </label>
            <select
              name="DueDate"
              value={formData.DueDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              UDIN*
            </label>
            <select
              name="UDIN"
              value={formData.UDIN}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
