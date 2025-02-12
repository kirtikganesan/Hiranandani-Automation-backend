import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function Notice() {
  const [letterOfAuthority, setLetterOfAuthority] = useState<'yes' | 'no'>('no');

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notice</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Client Name <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select</option>
            <option value="client1">Client 1</option>
            <option value="client2">Client 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Notice No <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Notice No"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            F.Y. <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Notice Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Act <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select</option>
            <option value="act1">Act 1</option>
            <option value="act2">Act 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date of receipt to client <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            u/s. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="u/s."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date submitted to us <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Submission Mode <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select</option>
            <option value="mode1">Mode 1</option>
            <option value="mode2">Mode 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Assessing Officer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Assessing Officer"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Brief issues of the case <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Brief Issues of the Case"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date & Time of hearing <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Document Required to be Submitted <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Document Required to be Submitted"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Service Main Category <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select</option>
            <option value="cat1">Category 1</option>
            <option value="cat2">Category 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Service Name <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select</option>
            <option value="service1">Service 1</option>
            <option value="service2">Service 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Letter of Authority Obtained <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="authority"
                value="yes"
                checked={letterOfAuthority === 'yes'}
                onChange={() => setLetterOfAuthority('yes')}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="authority"
                value="no"
                checked={letterOfAuthority === 'no'}
                onChange={() => setLetterOfAuthority('no')}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Notice
          </label>
          <div className="mt-1">
            <input type="file" id="noticeUpload" className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
            <button
              onClick={() => document.getElementById('noticeUpload')?.click()}
              className="w-full px-4 py-2 border-2 border-dashed rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </button>
            <p className="text-xs text-gray-500 mt-1">File format: jpg,jpeg,png,pdf</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Fees
          </label>
          <input
            type="number"
            placeholder="Notice Fees"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Cancel
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Save
        </button>
      </div>
    </div>
  );
}