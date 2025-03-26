import React, { useState, useEffect } from 'react';
import { ServiceFormData, Task } from '../../types/service';

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
  const [currentTab, setCurrentTab] = useState<'service' | 'dueDate'>('service');
  const [formData, setFormData] = useState<ServiceFormData>({
    ServiceMainCategory: '',
    ServiceName: '',
    GSTBillingCategory: '',
    DueDate: 'NO',
    UDIN: 'NO',
    tasks: [],
    financialYear: '',
    periodicity: '',
    ratePerPeriodicity: '',
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  const [newTask, setNewTask] = useState<Task>({
    id: '',
    taskName: '',
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (initialData) {
      console.log('Initial Data:', initialData); // Debugging log
      setFormData({
        ServiceMainCategory: initialData.ServiceMainCategory || '',
        ServiceName: initialData.ServiceName || '',
        GSTBillingCategory: initialData.GSTBillingCategory || '',
        DueDate: initialData.DueDate || 'NO',
        UDIN: initialData.UDIN || 'NO',
        tasks: initialData.tasks || [],
        financialYear: initialData.financialYear || '',
        periodicity: initialData.periodicity || '',
        ratePerPeriodicity: initialData.ratePerPeriodicity || '',
      });
      setCurrentTab('service');
    }
  }, [initialData]);

  const handleAddTask = () => {
    if (newTask.taskName) {
      setFormData((prev) => ({
        ...prev,
        tasks: [...prev.tasks, { ...newTask, id: Date.now().toString() }],
      }));
      setNewTask({ id: '', taskName: '', days: 0, hours: 0, minutes: 0 });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-4 border-b">
        <button
          className={`px-4 py-2 ${
            currentTab === 'service'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
          onClick={() => setCurrentTab('service')}
        >
          Service & Task
        </button>
        {!isEdit && (
          <button
            className={`px-4 py-2 ${
              currentTab === 'dueDate'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setCurrentTab('dueDate')}
          >
            Service Due Date
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {currentTab === 'service' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Main Category*
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.ServiceMainCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, ServiceMainCategory: e.target.value })
                  }
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.ServiceName}
                  onChange={(e) =>
                    setFormData({ ...formData, ServiceName: e.target.value })
                  }
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.GSTBillingCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, GSTBillingCategory: e.target.value })
                  }
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
            </div>

            {!isEdit && (
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Due Date*
                  </label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        checked={formData.DueDate === 'YES'}
                        onChange={() => setFormData({ ...formData, DueDate: 'YES' })}
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio"
                        checked={formData.DueDate === 'NO'}
                        onChange={() => setFormData({ ...formData, DueDate: 'NO' })}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    UDIN*
                  </label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        checked={formData.UDIN === 'YES'}
                        onChange={() => setFormData({ ...formData, UDIN: 'YES' })}
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio"
                        checked={formData.UDIN === 'NO'}
                        onChange={() => setFormData({ ...formData, UDIN: 'NO' })}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Tasks</h3>
              <div className="grid grid-cols-5 gap-4 mb-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Task Name"
                    className="w-full rounded-md border-gray-300"
                    value={newTask.taskName}
                    onChange={(e) =>
                      setNewTask({ ...newTask, taskName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Days"
                    className="w-full rounded-md border-gray-300"
                    value={newTask.days}
                    onChange={(e) =>
                      setNewTask({ ...newTask, days: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Hours"
                    className="w-full rounded-md border-gray-300"
                    value={newTask.hours}
                    onChange={(e) =>
                      setNewTask({ ...newTask, hours: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Minutes"
                    className="w-full rounded-md border-gray-300"
                    value={newTask.minutes}
                    onChange={(e) =>
                      setNewTask({ ...newTask, minutes: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add More
              </button>
            </div>

            <div className="mt-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Task Name</th>
                    <th className="px-4 py-2">Days</th>
                    <th className="px-4 py-2">Hours</th>
                    <th className="px-4 py-2">Minutes</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="border px-4 py-2">{task.taskName}</td>
                      <td className="border px-4 py-2">{task.days}</td>
                      <td className="border px-4 py-2">{task.hours}</td>
                      <td className="border px-4 py-2">{task.minutes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Financial Year*
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.financialYear}
                  onChange={(e) =>
                    setFormData({ ...formData, financialYear: e.target.value })
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Periodicity*
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.periodicity}
                  onChange={(e) =>
                    setFormData({ ...formData, periodicity: e.target.value })
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rate/Periodicity
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.ratePerPeriodicity}
                  onChange={(e) =>
                    setFormData({ ...formData, ratePerPeriodicity: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {currentTab === 'service' ? 'Cancel' : 'Previous'}
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {currentTab === 'service' ? 'Next' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
