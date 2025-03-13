import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id?: number;
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
    cdDvdAvailable: false,
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch books from database
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('https://hiranandani-automation.onrender.com/books');
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editMode && editId !== null) {
        // Update existing book
        await axios.put(`https://hiranandani-automation.onrender.com/updateBook/${editId}`, formData);
      } else {
        // Insert new book
        await axios.post('https://hiranandani-automation.onrender.com/addBook', formData);
      }

      fetchBooks(); // Refresh table data
      setFormData({ category: '', name: '', year: '', publisher: '', type: '', cdDvdAvailable: false });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleEdit = (book: Book) => {
    setFormData(book);
    setEditMode(true);
    setEditId(book.id ?? null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`https://hiranandani-automation.onrender.com/deleteBook/${id}`);
        fetchBooks(); // Refresh table data
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-navy-900">{editMode ? 'Edit Book' : 'Add Book'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category of the Book<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Category of the Book"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name of the Book<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name of the Book"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Year of Publication<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="Year of Publication"
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
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
              placeholder="Name of the Publisher"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type of the Book<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="Type of the Book"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">CD/DVD Available</label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                checked={formData.cdDvdAvailable}
                onChange={() => setFormData({ ...formData, cdDvdAvailable: true })}
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                checked={!formData.cdDvdAvailable}
                onChange={() => setFormData({ ...formData, cdDvdAvailable: false })}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors">
            {editMode ? 'Update' : 'Save'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Publisher</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="text-center">
                <td className="px-4 py-2">{book.name}</td>
                <td className="px-4 py-2">{book.category}</td>
                <td className="px-4 py-2">{book.year}</td>
                <td className="px-4 py-2">{book.publisher}</td>
                <td className="px-4 py-2">{book.type}</td>
                <td className="px-4 py-2">
                  <button className='p-2 bg-green-500 rounded-lg mx-5' onClick={() => handleEdit(book)}>Edit</button>
                  <button className='p-2 bg-red-500 rounded-lg' onClick={() => handleDelete(book.id!)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;
