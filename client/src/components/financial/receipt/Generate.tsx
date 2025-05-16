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
  transactionId?: string;
  chequeNo?: string;
  bankName?: string;
}

interface Invoice {
  id: number;
  Date: string;
  Invoice_No: string;
  Client: string;
  PAN_No: string;
  Gross_Amount: number;
  Discount_Amount: number;
  Service_Amount: number;
  Taxable_Claim_Amount: number;
  Total_Taxable_Amount: number;
  CGST: number;
  SGST: number;
  IGST: number;
  Non_Taxable_Amount: number;
  Total_Bill_Amount: number;
  Outstanding_Amount: number;
  Settled_Amount: number;
  Billing_Firm: string;
}

interface EditableInvoice extends Invoice {
  editedTDS: number;
  editedDiscount: number;
  selected: boolean;
}

interface AdvanceReceipt {
  id: number;
  particulars: string;
  grossAdvanceAmount: number;
  tdsOnAdvance: number;
}

const ReceiptGenerator: React.FC = () => {
  const [formData, setFormData] = useState<ReceiptForm>({
    receiptType: 'invoice',
    clientName: '',
    billingFirm: '',
    receiptDate: undefined,
    paymentType: '',
    emailPrimary: false,
    emailSecondary: false,
    whatsappPrimary: false,
    whatsappSecondary: false,
    transactionId: '',
    chequeNo: '',
    bankName: '',
  });

  const [clients, setClients] = useState<string[]>([]);
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [invoices, setInvoices] = useState<EditableInvoice[]>([]);
  const [advanceReceipts, setAdvanceReceipts] = useState<AdvanceReceipt[]>([{ id: 1, particulars: '', grossAdvanceAmount: 0, tdsOnAdvance: 0 }]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isReceiptGenerated, setIsReceiptGenerated] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/opening-balance-clients`)
      .then(response => response.json())
      .then(data => {
        setClients(data);
      })
      .catch(error => console.error('Error fetching clients:', error));

    fetch(`${backendUrl}/api/financial-billing-firms`)
      .then(response => response.json())
      .then(data => {
        setBillingFirms(data.map((firm: { billing_firm: string }) => firm.billing_firm));
      })
      .catch(error => console.error('Error fetching billing firms:', error));
  }, []);

  useEffect(() => {
    if (formData.clientName && formData.billingFirm) {
      fetchInvoices();
    }
  }, [formData.clientName, formData.billingFirm]);

  const fetchInvoices = () => {
    fetch(`${backendUrl}/api/invoices?client=${formData.clientName}&billingFirm=${formData.billingFirm}`)
      .then(response => response.json())
      .then(data => {
        const editableInvoices = data.map((invoice: Invoice) => ({
          ...invoice,
          editedTDS: invoice.Gross_Amount * 0.1,
          editedDiscount: invoice.Discount_Amount,
          selected: true, // Default to selected
        }));
        setInvoices(editableInvoices);
      })
      .catch(error => console.error('Error fetching invoices:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

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

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleDateChange = (date: string, fieldName: string) => {
    setFormData({
      ...formData,
      [fieldName]: date ? new Date(date) : undefined,
    });

    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: '' });
    }
  };

  const handleTDSChange = (id: number, value: string) => {
    const newInvoices = invoices.map(invoice =>
      invoice.id === id ? { ...invoice, editedTDS: parseFloat(value) } : invoice
    );
    setInvoices(newInvoices);
  };

  const handleDiscountChange = (id: number, value: string) => {
    const newInvoices = invoices.map(invoice =>
      invoice.id === id ? { ...invoice, editedDiscount: parseFloat(value) } : invoice
    );
    setInvoices(newInvoices);
  };

  const handleSelectInvoice = (id: number, checked: boolean) => {
    const newInvoices = invoices.map(invoice =>
      invoice.id === id ? { ...invoice, selected: checked } : invoice
    );
    setInvoices(newInvoices);
  };

  const handleAdvanceReceiptChange = (id: number, field: string, value: string) => {
    const newAdvanceReceipts = advanceReceipts.map(receipt =>
      receipt.id === id ? { ...receipt, [field]: value } : receipt // Allow string input for 'particulars'
    );
    setAdvanceReceipts(newAdvanceReceipts);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName) {
      newErrors.clientName = "Please select a client name";
    }

    if (!formData.billingFirm) {
      newErrors.billingFirm = "Please select a billing firm";
    }

    if (!formData.receiptDate) {
      newErrors.receiptDate = "Please select a receipt date";
    }

    if (!formData.paymentType) {
      newErrors.paymentType = "Please select a payment type";
    }

    if (formData.paymentType === 'Cheque/DD' && !formData.bankName) {
      newErrors.bankName = "Please enter the bank name";
    }

    if (formData.paymentType === 'E-Payment' && !formData.transactionId) {
      newErrors.transactionId = "Please enter the transaction ID";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateReceipt = () => {
    if (!validate()) {
      return;
    }

    setIsGenerating(true);

    fetch(`${backendUrl}/api/max-receipt-no?billingFirm=${formData.billingFirm}`)
      .then(response => response.json())
      .then(result => {
        const newReceiptNo = result.maxReceiptNo;

        const receipt: ReceiptData = {
          receiptNo: newReceiptNo,
          receiptDate: formData.receiptDate ? format(formData.receiptDate, 'dd/MM/yyyy') : '',
          clientName: formData.clientName,
          paymentType: formData.paymentType,
          totalAmount: formData.receiptType === 'invoice' ? calculateTotalAmount() : calculateTotalAdvanceAmount(),
          invoiceDetails: formData.receiptType === 'invoice' ? invoices.filter(invoice => invoice.selected).map(invoice => {
            const totalBillAmount = invoice.Gross_Amount - invoice.editedDiscount - invoice.editedTDS;
            const outstandingAmount = totalBillAmount - calculateTotalAmount();
            const gst = invoice.CGST + invoice.SGST + invoice.IGST;
            return {
              invoiceNo: invoice.Invoice_No,
              invoiceDate: invoice.Date,
              invoiceAmount: invoice.Gross_Amount,
              previouslyReceivedTDS: 0,
              currentTDS: invoice.editedTDS,
              discount: invoice.editedDiscount,
              gst: gst,
              netAmountReceived: totalBillAmount + gst,
              balanceOutstanding: outstandingAmount > 0 ? outstandingAmount : 0
            };
          }) : advanceReceipts.map(receipt => {
            const netAmount = receipt.grossAdvanceAmount - receipt.tdsOnAdvance;
            return {
              invoiceNo: '',
              invoiceDate: '',
              invoiceAmount: receipt.grossAdvanceAmount,
              previouslyReceivedTDS: 0,
              currentTDS: receipt.tdsOnAdvance,
              discount: 0,
              gst: 0,
              netAmountReceived: netAmount,
              balanceOutstanding: 0
            };
          }),
          billingFirm: formData.billingFirm,
          receiptType: formData.receiptType,
          transactionId: formData.transactionId,
          bankName: formData.bankName,
        };

        setReceiptData(receipt);
        setShowReceiptModal(true);
        setIsReceiptGenerated(true);
        setIsGenerating(false);
      })
      .catch(error => {
        console.error('Error generating receipt number:', error);
        setIsGenerating(false);
      });
  };

  const handleSaveReceipt = async (receiptData: ReceiptData) => {
    try {
      const response = await fetch(`${backendUrl}/api/save-receipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receipt_no: receiptData.receiptNo,
          date: receiptData.receiptDate,
          type: receiptData.receiptType === 'invoice' ? 'Against Invoice' : 'Advance Receipt',
          client_name: receiptData.clientName,
          amount: receiptData.totalAmount,
          tds: receiptData.receiptType === 'invoice' ? receiptData.invoiceDetails.reduce((sum, item) => sum + item.currentTDS, 0) : 0,
          discount: receiptData.receiptType === 'invoice' ? receiptData.invoiceDetails.reduce((sum, item) => sum + item.discount, 0) : 0,
          mode: receiptData.paymentType,
          mode_details: receiptData.paymentType === 'Cash' ? 'Cash' :
                        receiptData.paymentType === 'E-Payment' ? `Transaction ID: ${receiptData.transactionId}` :
                        `Bank Name: ${receiptData.bankName}`,
          billing_firm: receiptData.billingFirm,
        }),
      });

      if (response.ok) {
        alert('Receipt saved successfully!');
      } else {
        console.error('Failed to save receipt');
      }
    } catch (error) {
      console.error('Error saving receipt:', error);
    }
  };

  const calculateTotalAmount = () => {
    return invoices.reduce((total, invoice) => {
      if (invoice.selected) {
        const totalBillAmount = invoice.Gross_Amount - invoice.editedDiscount - invoice.editedTDS;
        return total + totalBillAmount;
      }
      return total;
    }, 0);
  };

  const calculateTotalAdvanceAmount = () => {
    return advanceReceipts.reduce((total, receipt) => {
      return total + (receipt.grossAdvanceAmount - receipt.tdsOnAdvance);
    }, 0);
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
                  <>
                    <div className="space-y-2">
                      <label htmlFor="bankName" className="block text-sm font-medium">Bank Name <span className="text-red-500">*</span></label>
                      <input
                        id="bankName"
                        name="bankName"
                        value={formData.bankName || ''}
                        onChange={handleInputChange}
                        className={`w-full h-10 px-3 py-2 rounded-md border ${errors.bankName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                      />
                      {errors.bankName && <p className="text-red-500 text-xs">{errors.bankName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="chequeNo" className="block text-sm font-medium">Cheque No.</label>
                      <input
                        id="chequeNo"
                        name="chequeNo"
                        value={formData.chequeNo || ''}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </>
                )}

                {formData.paymentType === 'E-Payment' && (
                  <div className="space-y-2">
                    <label htmlFor="transactionId" className="block text-sm font-medium">Transaction ID / UTR No. <span className="text-red-500">*</span></label>
                    <input
                      id="transactionId"
                      name="transactionId"
                      value={formData.transactionId || ''}
                      onChange={handleInputChange}
                      className={`w-full h-10 px-3 py-2 rounded-md border ${errors.transactionId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                    />
                    {errors.transactionId && <p className="text-red-500 text-xs">{errors.transactionId}</p>}
                  </div>
                )}
              </div>

              {formData.receiptType === 'invoice' && (
                <div className="overflow-x-auto">
                  <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
                  <table className="min-w-full border border-gray-300">
                    <thead className='bg-gray-800 text-white'>
                      <tr>
                        <th className="py-2 px-4 border-b">Select</th>
                        <th className="py-2 px-4 border-b">Invoice No.</th>
                        <th className="py-2 px-4 border-b">Invoice Date</th>
                        <th className="py-2 px-4 border-b">Gross Amount</th>
                        <th className="py-2 px-4 border-b">GST</th>
                        <th className="py-2 px-4 border-b">TDS</th>
                        <th className="py-2 px-4 border-b">Discount Amount</th>
                        <th className="py-2 px-4 border-b">Net Amount</th>
                        <th className="py-2 px-4 border-b">Net Outstanding</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(invoice => {
                        const totalBillAmount = invoice.Gross_Amount - invoice.editedDiscount - invoice.editedTDS;
                        const outstandingAmount = totalBillAmount - calculateTotalAmount();
                        return (
                          <tr key={invoice.id} className='text-center'>
                            <td className="py-2 px-4 border-b">
                              <input
                                type="checkbox"
                                checked={invoice.selected}
                                onChange={(e) => handleSelectInvoice(invoice.id, e.target.checked)}
                                className="h-4 w-4 text-blue-600"
                              />
                            </td>
                            <td className="py-2 px-4 border-b">{invoice.Invoice_No}</td>
                            <td className="py-2 px-4 border-b">{format(new Date(invoice.Date), 'dd/MM/yyyy')}</td>
                            <td className="py-2 px-4 border-b">{invoice.Gross_Amount}</td>
                            <td className="py-2 px-4 border-b">{invoice.CGST + invoice.SGST + invoice.IGST}</td>
                            <td className="py-2 px-4 border-b">
                              <input
                                type="number"
                                value={invoice.editedTDS}
                                onChange={(e) => handleTDSChange(invoice.id, e.target.value)}
                                className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                              />
                            </td>
                            <td className="py-2 px-4 border-b">
                              <input
                                type="number"
                                value={invoice.editedDiscount}
                                onChange={(e) => handleDiscountChange(invoice.id, e.target.value)}
                                className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                              />
                            </td>
                            <td className="py-2 px-4 border-b">{totalBillAmount + invoice.CGST + invoice.SGST}</td>
                            <td className="py-2 px-4 border-b">0</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {formData.receiptType === 'advance' && (
                <div className="overflow-x-auto">
                  <h2 className="text-lg font-semibold mb-4">Advance Receipt Details</h2>
                  <table className="min-w-full border border-gray-300">
                    <thead className='bg-gray-800 text-white'>
                      <tr>
                        <th className="py-2 px-4 border-b">Particulars</th>
                        <th className="py-2 px-4 border-b">Gross Advance Amount</th>
                        <th className="py-2 px-4 border-b">TDS on Advance</th>
                        <th className="py-2 px-4 border-b">Net Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {advanceReceipts.map(receipt => (
                        <tr key={receipt.id} className='text-center'>
                          <td className="py-2 px-4 border-b">
                            <input
                              type="text"
                              value={receipt.particulars}
                              onChange={(e) => handleAdvanceReceiptChange(receipt.id, 'particulars', e.target.value)}
                              className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">
                            <input
                              type="number"
                              value={receipt.grossAdvanceAmount}
                              onChange={(e) => handleAdvanceReceiptChange(receipt.id, 'grossAdvanceAmount', e.target.value)}
                              className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">
                            <input
                              type="number"
                              value={receipt.tdsOnAdvance}
                              onChange={(e) => handleAdvanceReceiptChange(receipt.id, 'tdsOnAdvance', e.target.value)}
                              className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 transition-colors"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">
                            {receipt.grossAdvanceAmount - receipt.tdsOnAdvance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

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
          onSave={handleSaveReceipt}
        />
      )}
    </>
  );
};

export default ReceiptGenerator;
