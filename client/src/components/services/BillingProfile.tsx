import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

interface BillingEntry {
  id: number;
  firm_type: string;
  name: string;
  email_id: string;
  partner_email_id: string;
  pan: string;
  gst: string;
  status: string;
}

interface FormData {
  id?: number;
  firmType: string;
  name: string;
  contactNumber: string;
  emailId: string;
  partnerEmailId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  district: string;
  pincode: string;
  pan: string;
  gst: string;
  cin: string;
  udyamRegistration: string;
  msmeCategory: string;
  reminderDays: string;
  creditPeriod: string;
  accountNo: string;
  ifscCode: string;
  bankName: string;
  branch: string;
  upiId: string;
  billingSeries: string;
  financialYear: string;
  receiptNoStartsAt: string;
  widthOfNumericalPart: string;
  prefillWithZero: boolean;
  prefix: string;
  suffix: string;
  prefixApplicableFrom: string;
  suffixApplicableFrom: string;
}

const BillingProfile: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'firm' | 'bank' | 'invoice' | 'receipt' | 'quotation'>('firm');
  const [formData, setFormData] = useState<FormData>({
    firmType: 'Chartered Accountants Firm',
    name: '',
    contactNumber: '',
    emailId: '',
    partnerEmailId: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    district: '',
    pincode: '',
    pan: '',
    gst: '',
    cin: '',
    udyamRegistration: '',
    msmeCategory: 'Micro',
    reminderDays: '',
    creditPeriod: '',
    accountNo: '',
    ifscCode: '',
    bankName: '',
    branch: '',
    upiId: '',
    billingSeries: '',
    financialYear: '',
    receiptNoStartsAt: '',
    widthOfNumericalPart: '',
    prefillWithZero: false,
    prefix: '',
    suffix: '',
    prefixApplicableFrom: '',
    suffixApplicableFrom: '',
  });

  const [billingData, setBillingData] = useState<BillingEntry[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/billing-profiles`);
      setBillingData(response.data);
    } catch (error) {
      console.error('Error fetching billing data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/billing-profiles`, formData);
      setBillingData([...billingData, response.data]);
      setShowModal(false);
      setSuccessMessage('Billing Profile added successfully');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error adding billing profile:', error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      await axios.put(`${backendUrl}/api/billing-profiles/${id}`, formData);
      fetchBillingData();
      setShowModal(false);
      setSuccessMessage('Billing Profile updated successfully');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating billing profile:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${backendUrl}/api/billing-profiles/${id}`);
      fetchBillingData();
      setSuccessMessage('Billing Profile deleted successfully');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error deleting billing profile:', error);
    }
  };

  const handleEditClick = async (entry: BillingEntry) => {
    try {
      // Fetch full profile details
      const response = await axios.get(`${backendUrl}/api/billing-profiles/${entry.id}`);
      const fullProfileData = response.data;
      
      setFormData({
        id: fullProfileData.id,
        firmType: fullProfileData.firmType,
        name: fullProfileData.name,
        contactNumber: fullProfileData.contactNumber,
        emailId: fullProfileData.emailId,
        partnerEmailId: fullProfileData.partnerEmailId,
        addressLine1: fullProfileData.addressLine1,
        addressLine2: fullProfileData.addressLine2,
        city: fullProfileData.city,
        state: fullProfileData.state,
        district: fullProfileData.district,
        pincode: fullProfileData.pincode,
        pan: fullProfileData.pan,
        gst: fullProfileData.gst,
        cin: fullProfileData.cin,
        udyamRegistration: fullProfileData.udyamRegistration,
        msmeCategory: fullProfileData.msmeCategory,
        reminderDays: fullProfileData.reminderDays,
        creditPeriod: fullProfileData.creditPeriod,
        accountNo: fullProfileData.accountNo,
        ifscCode: fullProfileData.ifscCode,
        bankName: fullProfileData.bankName,
        branch: fullProfileData.branch,
        upiId: fullProfileData.upiId,
        billingSeries: fullProfileData.billingSeries,
        financialYear: fullProfileData.financialYear,
        receiptNoStartsAt: fullProfileData.receiptNoStartsAt,
        widthOfNumericalPart: fullProfileData.widthOfNumericalPart,
        prefillWithZero: fullProfileData.prefillWithZero,
        prefix: fullProfileData.prefix,
        suffix: fullProfileData.suffix,
        prefixApplicableFrom: fullProfileData.prefixApplicableFrom,
        suffixApplicableFrom: fullProfileData.suffixApplicableFrom,
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching billing profile details:', error);
    }
  };

  const renderFirmDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type of Firm *</label>
          <select
            name="firmType"
            value={formData.firmType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="Chartered Accountants Firm">Chartered Accountants Firm</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Id *</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Partner Email Id</label>
        <input
          type="email"
          name="partnerEmailId"
          value={formData.partnerEmailId}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
        <textarea
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
        <textarea
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select District</option>
            <option value="Thane">Thane</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">PAN</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GST Number</label>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Send Reminder every</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="reminderDays"
              value={formData.reminderDays}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
            <span>days for outstanding invoices</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Credit period for outstanding reminders</label>
          <input
            type="text"
            name="creditPeriod"
            value={formData.creditPeriod}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Account No. *</label>
          <input
            type="text"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name of the Bank *</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Branch *</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">UPI ID</label>
        <input
          type="text"
          name="upiId"
          value={formData.upiId}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>
    </div>
  );

  const renderInvoiceFormatting = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Billing Series *</label>
          <select
            name="billingSeries"
            value={formData.billingSeries}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Financial Year *</label>
          <select
            name="financialYear"
            value={formData.financialYear}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select</option>
            <option value="2024-2025">2024-2025</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Previous Invoice Data</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 text-left">Invoice Set Date</th>
              <th className="p-2 text-left">F.Y.</th>
              <th className="p-2 text-left">Billing Series (Month)</th>
              <th className="p-2 text-left">Billing Starts At</th>
              <th className="p-2 text-left">Prefix</th>
              <th className="p-2 text-left">Suffix</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">12/11/2024</td>
              <td className="p-2">2024-2025</td>
              <td className="p-2">Yearly</td>
              <td className="p-2">27</td>
              <td className="p-2">A/24-25/</td>
              <td className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReceiptFormatting = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Financial Year *</label>
          <select
            name="financialYear"
            value={formData.financialYear}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Receipt No Starts At *</label>
          <input
            type="text"
            name="receiptNoStartsAt"
            value={formData.receiptNoStartsAt}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Width of Numerical Part *</label>
          <input
            type="text"
            name="widthOfNumericalPart"
            value={formData.widthOfNumericalPart}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prefix</label>
          <input
            type="text"
            name="prefix"
            value={formData.prefix}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Suffix</label>
          <input
            type="text"
            name="suffix"
            value={formData.suffix}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Pre Fill with 0 *</label>
        <div className="mt-1">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="prefillWithZero"
              value="yes"
              checked={formData.prefillWithZero}
              onChange={(e) => setFormData(prev => ({ ...prev, prefillWithZero: e.target.value === 'yes' }))}
              className="mr-2"
            />
            <span>Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="prefillWithZero"
              value="no"
              checked={!formData.prefillWithZero}
              onChange={(e) => setFormData(prev => ({ ...prev, prefillWithZero: e.target.value === 'yes' }))}
              className="mr-2"
            />
            <span>No</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderQuotationFormatting = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Financial Year *</label>
          <select
            name="financialYear"
            value={formData.financialYear}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quotation No Starts At *</label>
          <input
            type="text"
            name="quotationNoStartsAt"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prefix Applicable From</label>
          <input
            type="text"
            name="prefixApplicableFrom"
            value={formData.prefixApplicableFrom}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Suffix Applicable From</label>
          <input
            type="text"
            name="suffixApplicableFrom"
            value={formData.suffixApplicableFrom}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Width of Numerical Part *</label>
          <input
            type="text"
            name="widthOfNumericalPart"
            value={formData.widthOfNumericalPart}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Pre Fill with 0 *</label>
        <div className="mt-1">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="prefillWithZero"
              value="yes"
              checked={formData.prefillWithZero}
              onChange={(e) => setFormData(prev => ({ ...prev, prefillWithZero: e.target.value === 'yes' }))}
              className="mr-2"
            />
            <span>Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="prefillWithZero"
              value="no"
              checked={!formData.prefillWithZero}
              onChange={(e) => setFormData(prev => ({ ...prev, prefillWithZero: e.target.value === 'yes' }))}
              className="mr-2"
            />
            <span>No</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Billing Profile</h1>
        <button
          onClick={() => {
            setFormData({
              firmType: 'Chartered Accountants Firm',
              name: '',
              contactNumber: '',
              emailId: '',
              partnerEmailId: '',
              addressLine1: '',
              addressLine2: '',
              city: '',
              state: '',
              district: '',
              pincode: '',
              pan: '',
              gst: '',
              cin: '',
              udyamRegistration: '',
              msmeCategory: 'Micro',
              reminderDays: '',
              creditPeriod: '',
              accountNo: '',
              ifscCode: '',
              bankName: '',
              branch: '',
              upiId: '',
              billingSeries: '',
              financialYear: '',
              receiptNoStartsAt: '',
              widthOfNumericalPart: '',
              prefillWithZero: false,
              prefix: '',
              suffix: '',
              prefixApplicableFrom: '',
              suffixApplicableFrom: '',
            });
            setShowModal(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <span>Search:</span>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-3 py-1 pr-8"
                placeholder="Search..."
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-white text-center">
                <th className="px-4 py-3">Firm Type</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Partner Email</th>
                <th className="px-4 py-3">PAN</th>
                <th className="px-4 py-3">GST</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {billingData.map((entry) => (
                <tr key={entry.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{entry.firm_type}</td>
                  <td className="px-4 py-3 text-blue-600">{entry.name}</td>
                  <td className="px-4 py-3">{entry.email_id}</td>
                  <td className="px-4 py-3">{entry.partner_email_id}</td>
                  <td className="px-4 py-3">{entry.pan}</td>
                  <td className="px-4 py-3">{entry.gst}</td>
                  <td className="px-4 py-3">{entry.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                        onClick={() => handleEditClick(entry)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        onClick={() => handleDelete(entry.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between border-t">
          <div>Showing 1 to {entriesPerPage} of {billingData.length} entries</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add/Edit Billing Profile</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('firm')}
                  className={`px-4 py-2 ${activeTab === 'firm' ? 'text-green-500 border-b-2 border-green-500' : ''}`}
                >
                  Firm Details
                </button>
                <button
                  onClick={() => setActiveTab('bank')}
                  className={`px-4 py-2 ${activeTab === 'bank' ? 'text-green-500 border-b-2 border-green-500' : ''}`}
                >
                  Bank Details
                </button>
                <button
                  onClick={() => setActiveTab('invoice')}
                  className={`px-4 py-2 ${activeTab === 'invoice' ? 'text-green-500 border-b-2 border-green-500' : ''}`}
                >
                  Invoice No Formatting
                </button>
                <button
                  onClick={() => setActiveTab('receipt')}
                  className={`px-4 py-2 ${activeTab === 'receipt' ? 'text-green-500 border-b-2 border-green-500' : ''}`}
                >
                  Receipt No Formatting
                </button>
                <button
                  onClick={() => setActiveTab('quotation')}
                  className={`px-4 py-2 ${activeTab === 'quotation' ? 'text-green-500 border-b-2 border-green-500' : ''}`}
                >
                  Quotation No Formatting
                </button>
              </div>

              <div className="mt-6">
                {activeTab === 'firm' && renderFirmDetails()}
                {activeTab === 'bank' && renderBankDetails()}
                {activeTab === 'invoice' && renderInvoiceFormatting()}
                {activeTab === 'receipt' && renderReceiptFormatting()}
                {activeTab === 'quotation' && renderQuotationFormatting()}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              {activeTab !== 'firm' && (
                <button
                  onClick={() => {
                    const tabs = ['firm', 'bank', 'invoice', 'receipt', 'quotation'];
                    const currentIndex = tabs.indexOf(activeTab);
                    setActiveTab(tabs[currentIndex - 1] as any);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Previous
                </button>
              )}
              {activeTab !== 'quotation' ? (
                <button
                  onClick={() => {
                    const tabs = ['firm', 'bank', 'invoice', 'receipt', 'quotation'];
                    const currentIndex = tabs.indexOf(activeTab);
                    setActiveTab(tabs[currentIndex + 1] as any);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (formData.id) {
                      handleEdit(formData.id);
                    } else {
                      handleAdd();
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4">{successMessage}</h2>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingProfile;
