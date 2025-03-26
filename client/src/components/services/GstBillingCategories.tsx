import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GstBillingCategories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    gst_billing_category: '',
    sac_code: '',
    igst_18: '',
    cgst_9: '',
    sgst_9: '',
  });
  const [error, setError] = useState('');
  const [modal, setModal] = useState<{ show: boolean; type: string; id: number | null }>({
    show: false,
    type: '',
    id: null,
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(`${backendUrl}/api/categories`);
    setCategories(response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some(value => value === '')) {
      setError('All fields are required');
      return;
    }
    await axios.post(`${backendUrl}/api/categories`, formData);
    setModal({ show: true, type: 'Added successfully', id: null });
    fetchCategories();
  };

  const handleEdit = (id: number) => {
    const category = categories.find(cat => cat.id === id);
    setFormData(category);
    setModal({ show: true, type: 'edit', id });
  };

  const handleUpdate = async () => {
    await axios.put(`${backendUrl}/api/categories/${modal.id}`, formData);
    setModal({ show: true, type: 'Updated successfully', id: null });
    fetchCategories();
  };

  const handleDelete = (id: number) => {
    setModal({ show: true, type: 'delete', id });
  };

  const confirmDelete = async () => {
    await axios.delete(`${backendUrl}/api/categories/${modal.id}`);
    setModal({ show: true, type: 'Deleted successfully', id: null });
    fetchCategories();
  };

  return (
    <div className="p-6 w-full bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">GST Billing Categories</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {['gst_billing_category', 'sac_code', 'igst_18', 'cgst_9', 'sgst_9'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace('_', ' ').toUpperCase()}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={modal.type === 'edit' ? handleUpdate : handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>

      <table className="mt-6 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">GST Billing Category</th>
            <th className="border p-2">SAC Code</th>
            <th className="border p-2">IGST 18%</th>
            <th className="border p-2">CGST 9%</th>
            <th className="border p-2">SGST 9%</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id} className="border">
              <td className="border p-2">{cat.gst_billing_category}</td>
              <td className="border p-2">{cat.sac_code}</td>
              <td className="border p-2">{cat.igst_18}</td>
              <td className="border p-2">{cat.cgst_9}</td>
              <td className="border p-2">{cat.sgst_9}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(cat.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(cat.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            {modal.type === 'delete' ? (
              <>
                <p>Are you sure you want to delete?</p>
                <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">OK</button>
                <button onClick={() => setModal({ show: false, type: '', id: null })} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </>
            ) : modal.type === 'edit' ? (
              <>
                <h3 className="text-lg font-semibold mb-2">Edit GST Billing Category</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {['gst_billing_category', 'sac_code', 'igst_18', 'cgst_9', 'sgst_9'].map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      placeholder={field.replace('_', ' ').toUpperCase()}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="p-2 border rounded w-full"
                    />
                  ))}
                </div>
                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </>
            ) : (
              <>
                <p>{modal.type}</p>
                <button onClick={() => setModal({ show: false, type: '', id: null })} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">OK</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GstBillingCategories;
