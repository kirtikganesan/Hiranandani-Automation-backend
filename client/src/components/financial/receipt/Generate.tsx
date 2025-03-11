import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import ReceiptPreview from './ReceiptPreview';
import { ReceiptData } from './utils/pdfGenerator';

interface ReceiptForm {
  receiptType: 'invoice' | 'advance';
  clientName: string;
  billingFirm: string;
  receiptDate: Date | undefined;
  paymentType: string;
  emailPrimary: boolean;
  emailSecondary: boolean;
  whatsappPrimary: boolean;
  whatsappSecondary: boolean;
  totalAmount: number | null;
  invoiceNo: string;
  invoiceDate: Date | undefined;
  invoiceAmount: number | null;
  previouslyReceivedTDS: number | null;
  currentTDS: number | null;
  discount: number | null;
  transactionId?: string;
  chequeNo?: string;
}

const ReceiptGenerator: React.FC = () => {
  const [formData, setFormData] = useState<ReceiptForm>({
    receiptType: 'invoice',
    clientName: '',
    billingFirm: '',
    receiptDate: new Date(),
    paymentType: '',
    emailPrimary: false,
    emailSecondary: false,
    whatsappPrimary: false,
    whatsappSecondary: false,
    totalAmount: null,
    invoiceNo: '',
    invoiceDate: new Date(),
    invoiceAmount: null,
    previouslyReceivedTDS: null,
    currentTDS: null,
    discount: null,
    transactionId: '',
    chequeNo: '',
  });

  const [clients, setClients] = useState<string[]>([]);
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch clients
    fetch('http://localhost:5000/api/clients')
      .then(response => response.json())
      .then(data => {
        setClients(data.map((client: { client_name: string }) => client.client_name));
      })
      .catch(error => console.error('Error fetching clients:', error));

    // Fetch billing firms
    fetch('http://localhost:5000/api/financial-billing-firms')
      .then(response => response.json())
      .then(data => {
        setBillingFirms(data.map((firm: { billing_firm: string }) => firm.billing_firm));
      })
      .catch(error => console.error('Error fetching billing firms:', error));
  }, []);

  useEffect(() => {
    // Calculate total amount automatically
    if (formData.receiptType === 'invoice') {
      const totalAmount = (formData.invoiceAmount || 0) -
                          (formData.previouslyReceivedTDS || 0) -
                          (formData.currentTDS || 0) -
                          (formData.discount || 0);
      setFormData(prevFormData => ({
        ...prevFormData,
        totalAmount: totalAmount > 0 ? totalAmount : 0
      }));
    }
  }, [formData.invoiceAmount, formData.previouslyReceivedTDS, formData.currentTDS, formData.discount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value ? parseFloat(value) : null,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleDateChange = (date: string, fieldName: string) => {
    setFormData({
      ...formData,
      [fieldName]: date ? new Date(date) : undefined,
    });

    // Clear error for this field
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName) {
      newErrors.clientName = "Please select a client name";
    }

    if (!formData.receiptDate) {
      newErrors.receiptDate = "Please select a receipt date";
    }

    if (!formData.paymentType) {
      newErrors.paymentType = "Please select a payment type";
    }

    if (!formData.totalAmount) {
      newErrors.totalAmount = "Please enter the total amount";
    }

    if (formData.receiptType === 'invoice') {
      if (!formData.invoiceNo) {
        newErrors.invoiceNo = "Please enter the invoice number";
      }

      if (!formData.invoiceDate) {
        newErrors.invoiceDate = "Please select an invoice date";
      }

      if (!formData.invoiceAmount) {
        newErrors.invoiceAmount = "Please enter the invoice amount";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateReceipt = () => {
    if (!validate()) {
      return;
    }
  
    setIsGenerating(true);
  
    // Fetch the new receipt number for the selected billing firm
    fetch(`http://localhost:5000/api/max-receipt-no?billingFirm=${formData.billingFirm}`)
      .then(response => response.json())
      .then(result => {
        const newReceiptNo = result.maxReceiptNo; // This is already the new receipt number
        
        // Continue with creating receipt data
        const netAmountReceived = formData.totalAmount || 0;
        const invoiceAmount = formData.invoiceAmount || 0;
        const previouslyReceivedTDS = formData.previouslyReceivedTDS || 0;
        const currentTDS = formData.currentTDS || 0;
        const discount = formData.discount || 0;
  
        const balanceOutstanding =
          invoiceAmount -
          previouslyReceivedTDS -
          currentTDS -
          discount -
          netAmountReceived;
  
        const receipt: ReceiptData = {
          receiptNo: newReceiptNo,
          receiptDate: formData.receiptDate ? format(formData.receiptDate, 'dd/MM/yyyy') : '',
          clientName: formData.clientName,
          paymentType: formData.paymentType,
          totalAmount: formData.totalAmount || 0,
          invoiceDetails: [
            {
              invoiceNo: formData.invoiceNo,
              invoiceDate: formData.invoiceDate ? format(formData.invoiceDate, 'dd/MM/yyyy') : '',
              invoiceAmount: invoiceAmount,
              previouslyReceivedTDS: previouslyReceivedTDS,
              currentTDS: currentTDS,
              discount: discount,
              netAmountReceived: netAmountReceived,
              balanceOutstanding: balanceOutstanding > 0 ? balanceOutstanding : 0
            }
          ],
          billingFirm: formData.billingFirm
        };
  
        setReceiptData(receipt);
        setShowReceiptModal(true);
        setIsGenerating(false);
      })
      .catch(error => {
        console.error('Error generating receipt number:', error);
        setIsGenerating(false);
      });
  };
  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Receipt Generator</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="grid gap-6">
              <div className="space-y-4">
                <label className="text-base font-medium">Receipt Type</label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="invoice"
                      checked={formData.receiptType === 'invoice'}
                      onChange={() => handleSelectChange('receiptType', 'invoice')}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="invoice" className="cursor-pointer">Against Invoice</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="advance"
                      checked={formData.receiptType === 'advance'}
                      onChange={() => handleSelectChange('receiptType', 'advance')}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="advance" className="cursor-pointer">Advance Receipt</label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="clientName" className="block text-sm font-medium">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleSelectChange('clientName', e.target.value)}
                    className={`w-full h-10 px-3 py-2 rounded-md border ${errors.clientName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  >
                    <option value="">Select Client</option>
                    {clients.map((client, index) => (
                      <option key={index} value={client}>
                        {client}
                      </option>
                    ))}
                  </select>
                  {errors.clientName && <p className="text-red-500 text-xs">{errors.clientName}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="billingFirm" className="block text-sm font-medium">
                    Billing Firm <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="billingFirm"
                    value={formData.billingFirm}
                    onChange={(e) => handleSelectChange('billingFirm', e.target.value)}
                    className={`w-full h-10 px-3 py-2 rounded-md border ${errors.billingFirm ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  >
                    <option value="">Select Billing Firm</option>
                    {billingFirms.map((firm, index) => (
                      <option key={index} value={firm}>
                        {firm}
                      </option>
                    ))}
                  </select>
                  {errors.billingFirm && <p className="text-red-500 text-xs">{errors.billingFirm}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="receiptDate" className="block text-sm font-medium">
                    Receipt Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="receiptDate"
                    value={formData.receiptDate ? format(formData.receiptDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => handleDateChange(e.target.value, 'receiptDate')}
                    className={`w-full h-10 px-3 py-2 rounded-md border ${errors.receiptDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  />
                  {errors.receiptDate && <p className="text-red-500 text-xs">{errors.receiptDate}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="paymentType" className="block text-sm font-medium">
                    Type of Payment <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="paymentType"
                    value={formData.paymentType}
                    onChange={(e) => handleSelectChange('paymentType', e.target.value)}
                    className={`w-full h-10 px-3 py-2 rounded-md border ${errors.paymentType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  >
                    <option value="">Select Type of Payment</option>
                    <option value="Cheque/DD">Cheque/DD</option>
                    <option value="E-Payment">E-Payment</option>
                    <option value="Cash">Cash</option>
                  </select>
                  {errors.paymentType && <p className="text-red-500 text-xs">{errors.paymentType}</p>}
                </div>

                {formData.paymentType === 'Cheque/DD' && (
                  <div className="space-y-2">
                    <label htmlFor="chequeNo" className="block text-sm font-medium">Cheque/DD No.</label>
                    <input
                      id="chequeNo"
                      name="chequeNo"
                      value={formData.chequeNo || ''}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                )}

                {formData.paymentType === 'E-Payment' && (
                  <div className="space-y-2">
                    <label htmlFor="transactionId" className="block text-sm font-medium">Transaction ID / UTR No.</label>
                    <input
                      id="transactionId"
                      name="transactionId"
                      value={formData.transactionId || ''}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                )}
              </div>

              {formData.receiptType === 'invoice' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="invoiceNo" className="block text-sm font-medium">
                      Invoice No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="invoiceNo"
                      name="invoiceNo"
                      value={formData.invoiceNo}
                      onChange={handleInputChange}
                      className={`w-full h-10 px-3 py-2 rounded-md border ${errors.invoiceNo ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                    />
                    {errors.invoiceNo && <p className="text-red-500 text-xs">{errors.invoiceNo}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="invoiceDate" className="block text-sm font-medium">
                      Invoice Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="invoiceDate"
                      value={formData.invoiceDate ? format(formData.invoiceDate, 'yyyy-MM-dd') : ''}
                      onChange={(e) => handleDateChange(e.target.value, 'invoiceDate')}
                      className={`w-full h-10 px-3 py-2 rounded-md border ${errors.invoiceDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                    />
                    {errors.invoiceDate && <p className="text-red-500 text-xs">{errors.invoiceDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="invoiceAmount" className="block text-sm font-medium">
                      Invoice Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="invoiceAmount"
                      name="invoiceAmount"
                      type="number"
                      value={formData.invoiceAmount === null ? '' : formData.invoiceAmount}
                      onChange={handleNumberInputChange}
                      className={`w-full h-10 px-3 py-2 rounded-md border ${errors.invoiceAmount ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                    />
                    {errors.invoiceAmount && <p className="text-red-500 text-xs">{errors.invoiceAmount}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="previouslyReceivedTDS" className="block text-sm font-medium">Previously Received + TDS Amount</label>
                    <input
                      id="previouslyReceivedTDS"
                      name="previouslyReceivedTDS"
                      type="number"
                      value={formData.previouslyReceivedTDS === null ? '' : formData.previouslyReceivedTDS}
                      onChange={handleNumberInputChange}
                      className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="currentTDS" className="block text-sm font-medium">Current TDS Amount</label>
                    <input
                      id="currentTDS"
                      name="currentTDS"
                      type="number"
                      value={formData.currentTDS === null ? '' : formData.currentTDS}
                      onChange={handleNumberInputChange}
                      className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="discount" className="block text-sm font-medium">Discount</label>
                    <input
                      id="discount"
                      name="discount"
                      type="number"
                      value={formData.discount === null ? '' : formData.discount}
                      onChange={handleNumberInputChange}
                      className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="totalAmount" className="block text-sm font-medium">
                  Total Amount <span className="text-red-500">*</span>
                </label>
                <input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  value={formData.totalAmount === null ? '' : formData.totalAmount}
                  onChange={handleNumberInputChange}
                  className={`w-full h-10 px-3 py-2 rounded-md border ${errors.totalAmount ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                />
                {errors.totalAmount && <p className="text-red-500 text-xs">{errors.totalAmount}</p>}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  onClick={handleGenerateReceipt}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 inline-block h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : "Generate Receipt"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReceiptModal && receiptData && (
        <ReceiptPreview
          data={receiptData}
          onClose={() => setShowReceiptModal(false)}
        />
      )}
    </>
  );
};

export default ReceiptGenerator;
