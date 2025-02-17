import React, { useState } from 'react';

interface ReceiptForm {
  receiptType: 'invoice' | 'advance';
  billingFirm: string;
  receiptDate: string;
  clientName: string;
  paymentType: string;
  emailPrimary: boolean;
  emailSecondary: boolean;
  whatsappPrimary: boolean;
  whatsappSecondary: boolean;
}

const Generate = () => {
  const [formData, setFormData] = useState<ReceiptForm>({
    receiptType: 'invoice',
    billingFirm: '',
    receiptDate: '',
    clientName: '',
    paymentType: '',
    emailPrimary: false,
    emailSecondary: false,
    whatsappPrimary: false,
    whatsappSecondary: false
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Generate Receipt</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Receipt Type<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={formData.receiptType === 'invoice'}
                onChange={() => setFormData({...formData, receiptType: 'invoice'})}
              />
              <span className="ml-2">Against Invoice</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={formData.receiptType === 'advance'}
                onChange={() => setFormData({...formData, receiptType: 'advance'})}
              />
              <span className="ml-2">Advance Receipt</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Firm<span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.billingFirm}
              onChange={(e) => setFormData({...formData, billingFirm: e.target.value})}
            >
              <option value="">Select Firm</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receipt Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.receiptDate}
              onChange={(e) => setFormData({...formData, receiptDate: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name<span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
            >
              <option value="">Select</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Payment<span className="text-red-500">*</span>
            </label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.paymentType}
              onChange={(e) => setFormData({...formData, paymentType: e.target.value})}
            >
              <option value="">Select Type of Payment</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Do you want to send email?</p>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.emailPrimary}
                  onChange={(e) => setFormData({...formData, emailPrimary: e.target.checked})}
                />
                <span className="ml-2">Primary contact</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.emailSecondary}
                  onChange={(e) => setFormData({...formData, emailSecondary: e.target.checked})}
                />
                <span className="ml-2">Secondary contact</span>
              </label>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Do you want to send whatsapp message?</p>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.whatsappPrimary}
                  onChange={(e) => setFormData({...formData, whatsappPrimary: e.target.checked})}
                />
                <span className="ml-2">Primary contact</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.whatsappSecondary}
                  onChange={(e) => setFormData({...formData, whatsappSecondary: e.target.checked})}
                />
                <span className="ml-2">Secondary contact</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Preview
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generate;