import React, { useState, useEffect } from "react";
import axios from "axios";

interface KnowledgeItem {
  id: number;
  category: string;
  title: string;
  link: string;
}

const KnowledgeBase = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    link: "",
  });

  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);

  // Fetch knowledge base items from database
  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  const fetchKnowledgeItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/knowledge_base");
      setKnowledgeItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching knowledge items:", error);
      setKnowledgeItems([]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://hiranandani-automation.onrender.com/api/knowledge_base", formData);
      setFormData({ category: "", title: "", link: "" }); // Clear form
      fetchKnowledgeItems(); // Refresh table
    } catch (error) {
      console.error("Error adding knowledge item:", error);
    }
  };

  // Handle delete functionality
  // const handleDelete = async (id: number) => {
  //   try {
  //     await axios.delete(`/api/knowledge_base/${id}`);
  //     fetchKnowledgeItems(); // Refresh table
  //   } catch (error) {
  //     console.error("Error deleting knowledge item:", error);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-navy-900">Knowledge Base</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Enter category"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter title"
              required
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
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="Enter link"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            onClick={() => setFormData({ category: "", title: "", link: "" })}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Link</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {knowledgeItems.length > 0 ? (
              knowledgeItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-300">
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">
                    <a href={item.link} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                      {item.link}
                    </a>
                  </td>
                  <td className="px-4 py-2 flex gap-4">
                    By Hiranandani & Co.
                    {/* <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={4}>
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KnowledgeBase;
