import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CompletedService {
  Client_Code: string;
  Client_Name: string;
  Main_Category: string;
  Service_Name: string;
  Basic_Amount: number;
  Approved_Claim: number;
  Unapproved_Claim: number;
  Billing_Firm?: string;
}

interface InvoiceDetailsProps {
  data: CompletedService[];
  setShowInvoice: (show: boolean) => void;
}

interface InvoiceData extends CompletedService {
  GrossAmount: number;
  DiscountAmount: number;
  NetAmount: number;
  CGST: number;
  SGST: number;
  IGST: number;
  GrandTotal: number;
}

interface InvoiceSubmissionData {
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

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ data, setShowInvoice }) => {
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [billingFirm, setBillingFirm] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [panNumber, setPanNumber] = useState('');
  const [invoiceData, setInvoiceData] = useState<InvoiceData[]>(
    data.map(item => ({
      ...item,
      GrossAmount: item.Basic_Amount,
      DiscountAmount: 0,
      NetAmount: item.Basic_Amount,
      CGST: 0,
      SGST: 0,
      IGST: 0,
      GrandTotal: item.Basic_Amount
    }))
  );

  useEffect(() => {
    const fetchBillingFirms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/financial-billing-firms');
        
        const firms = Array.isArray(response.data) 
          ? response.data.map(firm => 
              typeof firm === 'object' && firm !== null 
                ? (firm.name || firm.Billing_Firm || firm.billing_firm || String(firm)) 
                : String(firm)
            ).filter(firm => firm && firm.trim() !== '')
          : [];

        setBillingFirms(firms);
      } catch (error) {
        console.error('Error fetching billing firms:', error);
        setBillingFirms([]);
      }
    };

    fetchBillingFirms();
  }, []);

  useEffect(() => {
    // Reset invoice number when billing firm changes
    setInvoiceNumber('');
    setIsManualEntry(false);

    // If a billing firm is selected, try to generate invoice number
    if (billingFirm) {
      const generateInvoiceNumber = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/generate-invoice-number', {
            params: { billingFirm }
          });

          if (response.data.manualEntry) {
            setIsManualEntry(true);
          } else {
            setInvoiceNumber(response.data.invoiceNumber);
          }
        } catch (error) {
          console.error('Error generating invoice number:', error);
          setIsManualEntry(true);
        }
      };

      generateInvoiceNumber();
    }
  }, [billingFirm]);

  const handleInputChange = (index: number, field: keyof InvoiceData, value: any) => {
    const newData = [...invoiceData];
    newData[index] = {
      ...newData[index],
      [field]: value
    };

    if (field === 'GrossAmount' || field === 'DiscountAmount') {
      newData[index].NetAmount = newData[index].GrossAmount - newData[index].DiscountAmount;
    }

    if (billingFirm === 'HIRANANDANI AND ASSOCIATES' || billingFirm === 'Hiranandani And Co') {
      newData[index].CGST = newData[index].NetAmount * 0.09;
      newData[index].SGST = newData[index].NetAmount * 0.09;
      newData[index].IGST = 0;
    } else {
      newData[index].CGST = 0;
      newData[index].SGST = 0;
      newData[index].IGST = 0;
    }

    newData[index].GrandTotal = newData[index].NetAmount + newData[index].CGST + newData[index].SGST + newData[index].IGST;

    setInvoiceData(newData);
  };

  const handlePreview = async () => {
    // Validation checks
    if (!billingFirm) {
      alert('Please select a Billing Firm');
      return;
    }

    if (!invoiceNumber) {
      alert('Please enter an Invoice Number');
      return;
    }

    // Aggregate data for submission
    const totalGrossAmount = invoiceData.reduce((sum, item) => sum + item.GrossAmount, 0);
    const totalDiscountAmount = invoiceData.reduce((sum, item) => sum + item.DiscountAmount, 0);
    const totalNetAmount = invoiceData.reduce((sum, item) => sum + item.NetAmount, 0);
    const totalCGST = invoiceData.reduce((sum, item) => sum + item.CGST, 0);
    const totalSGST = invoiceData.reduce((sum, item) => sum + item.SGST, 0);
    const totalIGST = invoiceData.reduce((sum, item) => sum + item.IGST, 0);

    const invoiceSubmissionData: InvoiceSubmissionData = {
      Date: new Date().toISOString().split('T')[0], // Current date
      Invoice_No: invoiceNumber,
      Client: data[0].Client_Name,
      PAN_No: panNumber,
      Gross_Amount: totalGrossAmount,
      Discount_Amount: totalDiscountAmount,
      Service_Amount: totalNetAmount,
      Taxable_Claim_Amount: totalNetAmount,
      Total_Taxable_Amount: totalNetAmount,
      CGST: totalCGST,
      SGST: totalSGST,
      IGST: totalIGST,
      Non_Taxable_Amount: 0,
      Total_Bill_Amount: totalNetAmount + totalCGST + totalSGST + totalIGST,
      Outstanding_Amount: totalNetAmount + totalCGST + totalSGST + totalIGST,
      Settled_Amount: 0,
      Billing_Firm: billingFirm
    };

    try {
      const response = await axios.post('http://localhost:5000/api/save-invoice', invoiceSubmissionData);
      
      if (response.data.success) {
        alert('Invoice saved successfully!');
        setShowInvoice(false);
      } else {
        alert('Failed to save invoice. Please try again.');
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('An error occurred while saving the invoice.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Billing Firm
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={billingFirm}
            onChange={(e) => setBillingFirm(e.target.value)}
          >
            <option value="">Select</option>
            {billingFirms.map((firm, index) => (
              <option key={index} value={firm}>
                {firm}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Invoice No
          </label>
          {isManualEntry ? (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Enter Invoice Number"
            />
          ) : (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={invoiceNumber}
              readOnly
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client's PAN Number
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            placeholder="Enter Client's PAN Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={new Date().toISOString().split('T')[0]}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={data.length > 0 ? data[0].Client_Name : ''}
            readOnly
          />
        </div>
        
        <table className="min-w-full border border-gray-300 mb-4">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">SAC</th>
              <th className="px-4 py-2 text-left">Gross Amount</th>
              <th className="px-4 py-2 text-left">Discount Amount</th>
              <th className="px-4 py-2 text-left">Net Amount</th>
              <th className="px-4 py-2 text-left">CGST</th>
              <th className="px-4 py-2 text-left">SGST</th>
              <th className="px-4 py-2 text-left">IGST</th>
              <th className="px-4 py-2 text-left">Grand Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{item.Service_Name}</td>
                <td className="px-4 py-2">998222</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={item.GrossAmount}
                    onChange={(e) => handleInputChange(index, 'GrossAmount', Number(e.target.value))}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={item.DiscountAmount}
                    onChange={(e) => handleInputChange(index, 'DiscountAmount', Number(e.target.value))}
                  />
                </td>
                <td className="px-4 py-2">{item.NetAmount?.toFixed(2) || '0.00'}</td>
                <td className="px-4 py-2">{item.CGST?.toFixed(2) || '0.00'}</td>
                <td className="px-4 py-2">{item.SGST?.toFixed(2) || '0.00'}</td>
                <td className="px-4 py-2">{item.IGST?.toFixed(2) || '0.00'}</td>
                <td className="px-4 py-2">{item.GrandTotal?.toFixed(2) || '0.00'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={() => setShowInvoice(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handlePreview}
          >
            Preview and Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;