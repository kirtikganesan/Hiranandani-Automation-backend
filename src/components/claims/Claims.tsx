import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Upload } from 'lucide-react';
import axios from 'axios';
import ClaimList from './ClaimList';

interface FormData {
  claim_date: string;
  travel_from: string;
  bill_no: string;
  claim_type: string;
  travel_to: string;
  bill_date: string;
  nature_of_claim: string;
  kms: string;
  claim_amount: string;
  particulars: string;
  challan_no: string;
  claim_submitted_for: string;
  billUpload: File | null;
}

export default function Claims() {
  const [formData, setFormData] = useState<FormData>({
    claim_date: '',
    travel_from: '',
    bill_no: '',
    claim_type: 'office',
    travel_to: '',
    bill_date: '',
    nature_of_claim: '',
    kms: '',
    claim_amount: '',
    particulars: '',
    challan_no: '',
    claim_submitted_for: '',
    billUpload: null,
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [employees, setEmployees] = useState<string[]>([]);

  useEffect(() => {
    // Fetch employee data from the backend API
    axios.get('http://localhost:5000/api/employees')
      .then(response => {
        // Assuming the response contains an array of employee objects with an employee_name field
        const employeeNames = response.data.map((employee: any) => employee.employee_name);
        setEmployees(employeeNames);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        billUpload: files[0],
      });
      setFileName(files[0].name); // Set the file name to display
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/claims', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error saving claim:', error);
      alert('Error saving claim');
    }
  };

  const handleUploadClick = () => {
    document.getElementById('billUpload')?.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Claim</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="claimDate" className="block text-sm font-medium mb-1">
            Claim Date
          </label>
          <input
            type="date"
            id="claimDate"
            name="claim_date"
            defaultValue={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="travelFrom" className="block text-sm font-medium mb-1">
            Travel From <span className="text-red-500">*</span>
          </label>
          <input
            id="travelFrom"
            name="travel_from"
            placeholder="Travel From"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="billNo" className="block text-sm font-medium mb-1">
            Bill No.
          </label>
          <input
            id="billNo"
            name="bill_no"
            placeholder="Enter bill number"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Claim Type <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="claim_type"
                value="office"
                defaultChecked
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>Office</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="claim_type"
                value="client"
                onChange={handleChange}
                className="w-4 h-4"
              />
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
            name="travel_to"
            placeholder="Travel To"
            onChange={handleChange}
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
            name="bill_date"
            defaultValue={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="natureOfClaim" className="block text-sm font-medium mb-1">
            Nature of Claim <span className="text-red-500">*</span>
          </label>
          <select
            id="natureOfClaim"
            name="nature_of_claim"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select nature of claim</option>
            <option value="digital">Digital Signature</option>
            <option value="food">Food</option>
            <option value="fees">Govt. Fees / Challans</option>
            <option value="lodge">Lodging</option>
            <option value="misc">Miscellaneous</option>
            <option value="print">Printing / Stationery / Photocopy</option>
            <option value="stamp">Stamp Papers</option>
            <option value="travel">Travelling / Local Conveyance</option>
          </select>
        </div>

        <div>
          <label htmlFor="kms" className="block text-sm font-medium mb-1">
            KMS <span className="text-red-500">*</span>
          </label>
          <input
            id="kms"
            name="kms"
            placeholder="Enter KMS"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="claimAmount" className="block text-sm font-medium mb-1">
            Claim Amount <span className="text-red-500">*</span>
          </label>
          <input
            id="claimAmount"
            name="claim_amount"
            type="number"
            placeholder="Enter amount"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="particulars" className="block text-sm font-medium mb-1">
            Particulars <span className="text-red-500">*</span>
          </label>
          <textarea
            id="particulars"
            name="particulars"
            placeholder="Enter particulars"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="challanNo" className="block text-sm font-medium mb-1">
            Challan No <span className="text-red-500">*</span>
          </label>
          <input
            id="challanNo"
            name="challan_no"
            placeholder="Enter challan number"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="claimSubmittedFor" className="block text-sm font-medium mb-1">
            Claim Submitted For <span className="text-red-500">*</span>
          </label>
          <select
            id="claimSubmittedFor"
            name="claim_submitted_for"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            {employees.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <label htmlFor="billUpload" className="block text-sm font-medium mb-1">
            Bill Upload
          </label>
          <div className="mt-2">
            <input
              id="billUpload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              className="w-full px-4 py-2 border-2 border-dashed rounded-md hover:bg-gray-50 flex items-center justify-center"
              onClick={handleUploadClick}
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </button>
            {fileName && (
              <p className="text-xs text-gray-500 mt-1">Selected file: {fileName}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <ClaimList />
    </div>
  );
}
