import { Upload } from "lucide-react";

export default function Claims() {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Claim</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="claimDate" className="block text-sm font-medium mb-1">
            Claim Date
          </label>
          <input
            type="date"
            id="claimDate"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="travelFrom" className="block text-sm font-medium mb-1">
            Travel From <span className="text-red-500">*</span>
          </label>
          <input
            id="travelFrom"
            placeholder="Travel From"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="billNo" className="block text-sm font-medium mb-1">
            Bill No.
          </label>
          <input
            id="billNo"
            placeholder="Enter bill number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Claim Type <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="claimType" value="office" defaultChecked className="w-4 h-4" />
              <span>Office</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="claimType" value="client" className="w-4 h-4" />
              <span>Client</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="travelTo" className="block text-sm font-medium mb-1">
            Travel To <span className="text-red-500">*</span>
          </label>
          <input
            id="travelTo"
            placeholder="Travel To"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="billDate" className="block text-sm font-medium mb-1">
            Bill Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="billDate"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="natureOfClaim" className="block text-sm font-medium mb-1">
            Nature of Claim <span className="text-red-500">*</span>
          </label>
          <select id="natureOfClaim" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select nature of claim</option>
            <option value="digital">Digital Signature</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div>
          <label htmlFor="kms" className="block text-sm font-medium mb-1">
            KMS <span className="text-red-500">*</span>
          </label>
          <input
            id="kms"
            placeholder="Enter KMS"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="claimAmount" className="block text-sm font-medium mb-1">
            Claim Amount <span className="text-red-500">*</span>
          </label>
          <input
            id="claimAmount"
            type="number"
            placeholder="Enter amount"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="particulars" className="block text-sm font-medium mb-1">
            Particulars <span className="text-red-500">*</span>
          </label>
          <textarea
            id="particulars"
            placeholder="Enter particulars"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="challanNo" className="block text-sm font-medium mb-1">
            Challan No <span className="text-red-500">*</span>
          </label>
          <input
            id="challanNo"
            placeholder="Enter challan number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="claimSubmittedFor" className="block text-sm font-medium mb-1">
            Claim Submitted For <span className="text-red-500">*</span>
          </label>
          <select id="claimSubmittedFor" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="billUpload" className="block text-sm font-medium mb-1">
          Bill Upload
        </label>
        <div className="mt-2">
          <input id="billUpload" type="file" className="hidden" />
          <button
            className="w-full px-4 py-2 border-2 border-dashed rounded-md hover:bg-gray-50 flex items-center justify-center"
            onClick={() => document.getElementById('billUpload')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </button>
        </div>
        <p className="text-sm text-red-500 mt-2">
          Document upload will be permitted upon entering the Bill No./Challan No.
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <div className="space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            My Claims
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Employee Claims
          </button>
        </div>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}