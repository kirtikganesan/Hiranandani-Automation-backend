import React, { useState } from 'react';

interface Book {
  category: string;
  name: string;
  year: string;
  publisher: string;
  type: string;
  cdDvdAvailable: boolean;
}

const Library = () => {
  const [formData, setFormData] = useState<Book>({
    category: '',
    name: '',
    year: '',
    publisher: '',
    type: '',
    cdDvdAvailable: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submit logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-navy-900">Add Books</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category of the Book<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
              </select>
              <button 
                type="button"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name of the Book<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Name of the Book"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Publisher's Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.publisher}
              onChange={(e) => setFormData({...formData, publisher: e.target.value})}
              placeholder="Name of the Publisher"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
            Publication Year<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.publisher}
              onChange={(e) => setFormData({...formData, publisher: e.target.value})}
              placeholder="Year of Publication"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type of the Book<span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="">Select</option>
              <option value="hardcover">Hardcover</option>
              <option value="paperback">Paperback</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            CD/DVD Available
          </label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                checked={formData.cdDvdAvailable}
                onChange={() => setFormData({...formData, cdDvdAvailable: true})}
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                checked={!formData.cdDvdAvailable}
                onChange={() => setFormData({...formData, cdDvdAvailable: false})}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      </form>

      <div className="mt-8">
      
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name of the Book</th>
                <th className="px-4 py-2 text-left">Category of the Book</th>
                <th className="px-4 py-2 text-left">Year of Publication</th>
                <th className="px-4 py-2 text-left">Type of the Book</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">CD/DVD Available</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan={9}>
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Library;