import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ServiceDueDateAddProps {
  onClose: () => void;
  editId?: number;
  initialData?: {
    ServiceMainCategory: string;
    ServiceName: string;
    FinancialYear: string;
    Periodicity: 'Annually' | 'Monthly' | 'Quarterly' | 'Six-Monthly';
    FeesPerPeriod: number;
    statutory_due_date?: string | null;
    trigger_date?: string | null;
    target_date?: string | null;
  };
}

const ServiceDueDateAdd: React.FC<ServiceDueDateAddProps> = ({ onClose, editId, initialData }) => {
  console.log('[DEBUG] ServiceDueDateAdd initialData:', initialData);

  const [financialYear, setFinancialYear] = useState(initialData?.FinancialYear || '2025-2026');
  const [serviceCategory, setServiceCategory] = useState(initialData?.ServiceMainCategory || '');
  const [serviceName, setServiceName] = useState(initialData?.ServiceName || '');
  const [periodicity, setPeriodicity] = useState(initialData?.Periodicity || '');
  const [statutoryDueDate, setStatutoryDueDate] = useState(initialData?.statutory_due_date || '');
  const [triggerDate, setTriggerDate] = useState(initialData?.trigger_date || '');
  const [targetDate, setTargetDate] = useState(initialData?.target_date || '');
  const [feesPerPeriod, setFeesPerPeriod] = useState(initialData?.FeesPerPeriod?.toString() || '');
  const [serviceCategories, setServiceCategories] = useState<string[]>([]);
  const [serviceNames, setServiceNames] = useState<string[]>([]);
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const isEditMode = !!editId;

  const unsetServices = [
    'Accounting & Book Keeping ANNUAL MODE (Non Corporate)',
    'GST Accounting',
    'hiranandaniandassociates@gmail.com',
    'Show Cause Notice for Cancellation of Registration',
  ];

  const financialYears = Array.from({ length: 10 }, (_, i) => {
    const startYear = 2025 - i;
    return `${startYear}-${startYear + 1}`;
  });

  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/service-categories`);
        setServiceCategories(response.data);
        if (!isEditMode && response.data.length > 0) {
          setServiceCategory(response.data[0]);
        }
      } catch (err) {
        console.error('Error fetching service categories:', err);
        setError('Failed to load service categories');
      }
    };
    fetchServiceCategories();
  }, [backendUrl, isEditMode]);

  useEffect(() => {
    if (!serviceCategory) return;
    const fetchServiceNames = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/service-names`, {
          params: { serviceCategory },
        });
        setServiceNames(response.data);
        if (!isEditMode && response.data.length > 0) {
          setServiceName(response.data[0]);
        }
      } catch (err) {
        console.error('Error fetching service names:', err);
        setError('Failed to load service names');
      }
    };
    fetchServiceNames();
  }, [serviceCategory, backendUrl, isEditMode]);

  const handleSave = async () => {
    if (!financialYear || !serviceCategory || !serviceName || !periodicity) {
      setError('Please fill all required fields');
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (statutoryDueDate && !dateRegex.test(statutoryDueDate)) {
      setError('Invalid Statutory Due Date format (use YYYY-MM-DD)');
      return;
    }
    if (triggerDate && !dateRegex.test(triggerDate)) {
      setError('Invalid Trigger Date format (use YYYY-MM-DD)');
      return;
    }
    if (targetDate && !dateRegex.test(targetDate)) {
      setError('Invalid Target Date format (use YYYY-MM-DD)');
      return;
    }

    try {
      const serviceResponse = await axios.get(`${backendUrl}/api/service-id`, {
        params: { serviceName, serviceCategory },
      });
      const serviceId = serviceResponse.data.serviceId;

      if (!serviceId) {
        setError('Invalid service selected');
        return;
      }

      const formData = {
        serviceId,
        financialYear,
        periodicity,
        feesPerPeriod: parseFloat(feesPerPeriod) || 0,
        statutoryDueDate,
        triggerDate,
        targetDate,
      };

      if (isEditMode && editId) {
        await axios.put(`${backendUrl}/api/service-due-date/${editId}`, formData);
      } else {
        await axios.post(`${backendUrl}/api/service-due-date`, formData);
      }

      setError('');
      onClose();
    } catch (err: any) {
      console.error('Error saving service:', err);
      if (err.response) {
        if (err.response.status === 404) {
          setError('Service not found. It may have been deleted.');
        } else if (err.response.status === 400) {
          setError(err.response.data.error || 'Invalid data provided.');
        } else {
          setError('Failed to save service. Please try again.');
        }
      } else {
        setError('Failed to connect to the server. Please check your network.');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-navy-900 mb-6">
        {isEditMode ? 'Service Due Date Edit' : 'Service Due Date Add'}
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Financial year <span className="text-red-500">*</span>
          </label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {financialYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Main Category <span className="text-red-500">*</span>
          </label>
          <select
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            {serviceCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name <span className="text-red-500">*</span>
          </label>
          <select
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={!serviceCategory}
          >
            <option value="">Select</option>
            {serviceNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periodicity <span className="text-red-500">*</span>
          </label>
          <select
            value={periodicity}
            onChange={(e) => setPeriodicity(e.target.value as 'Annually' | 'Monthly' | 'Quarterly' | 'Six-Monthly')}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Six-Monthly">Six-Monthly</option>
            <option value="Annually">Annually</option>
          </select>
        </div>

        <div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-100 p-2">
              <div className="text-sm font-medium">Service Period</div>
              <div>{financialYear ? `${financialYear.split('-')[0]}-Apr - ${financialYear.split('-')[1]}-Mar` : 'Select Financial Year'}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Statutory Due Date</div>
              <input
                type="text"
                value={statutoryDueDate}
                onChange={(e) => setStatutoryDueDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div>
              <div className="text-sm font-medium">Trigger Date</div>
              <input
                type="text"
                value={triggerDate}
                onChange={(e) => setTriggerDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div>
              <div className="text-sm font-medium">Target Date</div>
              <input
                type="text"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RATE /PERIODICITY
          </label>
          <input
            type="number"
            value={feesPerPeriod}
            onChange={(e) => setFeesPerPeriod(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter rate"
          />
        </div>

        <div className="border border-red-500 rounded-md p-4 bg-red-50">
          <h3 className="font-medium text-red-900 mb-2">Services whose dates are not set -</h3>
          <ul className="list-disc pl-5 space-y-1">
            {unsetServices.map((service, index) => (
              <li key={index} className="text-red-700">{service}</li>
            ))}
          </ul>
        </div>

        <div className="text-red-500 text-sm">
          Note: Only those services where Due Date Applicable flag is set yes in Settings - Services will be shown here.
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDueDateAdd;