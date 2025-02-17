import React, { useState } from 'react';

interface KnowledgeItem {
  category: string;
  title: string;
  link: string;
  addedBy: string;
}

const KnowledgeBase = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    link: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submit logic here
  };

  const mockData: KnowledgeItem[] = [
    {
      category: 'Accounting Standards',
      title: 'Accounting Standards (AS): Disclosures Checklist (Revised February, 2020)',
      link: 'http://www.icai.org/resource/58286asb47542as.pdf',
      addedBy: 'By Bizalys'
    },
    {
      category: 'Accounting Standards',
      title: 'Accounting Standards as on July 1, 2017',
      link: 'http://www.icai.org/resource/46901asb36689asb-compendium.pdf',
      addedBy: 'By Bizalys'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-navy-900">Knowledge Base</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category<span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select</option>
              <option value="accounting">Accounting Standards</option>
              <option value="tax">Tax Laws</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Title"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Link<span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="Link"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
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

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select className="border border-gray-300 rounded-md p-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Search:</span>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-navy-900 text-white">
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Link</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">
                    <a href={item.link} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                      {item.link}
                    </a>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{item.addedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;