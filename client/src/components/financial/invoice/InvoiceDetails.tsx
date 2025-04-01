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
  isBulk?: boolean; // Add a prop to determine if it's bulk invoice
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

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ data, setShowInvoice, isBulk = false }) => {
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [billingFirm, setBillingFirm] = useState('');
  const [invoiceNumbers, setInvoiceNumbers] = useState<string[]>([]);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        const response = await axios.get(`${backendUrl}/api/financial-billing-firms`);
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
    setInvoiceNumbers([]);
    setIsManualEntry(false);

    if (billingFirm) {
      const generateInvoiceNumbers = async () => {
        try {
          const response = await axios.get(`${backendUrl}/api/generate-invoice-number`, {
            params: { billingFirm }
          });

          if (response.data.manualEntry) {
            setIsManualEntry(true);
          } else {
            const baseNumber = parseInt(response.data.invoiceNumber.split('/').pop());
            const newInvoiceNumbers = data.map((_, index) =>
              `${response.data.invoiceNumber.split('/').slice(0, -1).join('/')}/${baseNumber + index}`
            );
            setInvoiceNumbers(newInvoiceNumbers);
          }
        } catch (error) {
          console.error('Error generating invoice numbers:', error);
          setIsManualEntry(true);
        }
      };

      generateInvoiceNumbers();
    }
  }, [billingFirm, data]);

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
    if (!billingFirm) {
      alert('Please select a Billing Firm');
      return;
    }

    if (invoiceNumbers.some(num => !num)) {
      alert('Please ensure all invoice numbers are generated');
      return;
    }

    const invoicesToSave = data.map((item, index) => {
      const totalGrossAmount = invoiceData
        .filter(inv => inv.Client_Name === item.Client_Name)
        .reduce((sum, inv) => sum + inv.GrossAmount, 0);
      const totalDiscountAmount = invoiceData
        .filter(inv => inv.Client_Name === item.Client_Name)
        .reduce((sum, inv) => sum + inv.DiscountAmount, 0);
      const totalNetAmount = invoiceData
        .filter(inv => inv.Client_Name === item.Client_Name)
        .reduce((sum, inv) => sum + inv.NetAmount, 0);
      const totalCGST = invoiceData
        .filter(inv => inv.Client_Name === item.Client_Name)
        .reduce((sum, inv) => sum + inv.CGST, 0);
      const totalSGST = invoiceData
        .filter(inv => inv.Client_Name === item.Client_Name)
        .reduce((sum, inv) => sum + inv.SGST, 0);
      const totalIGST = invoiceData
        .filter(inv => inv.Client_Name === item.Client_Name)
        .reduce((sum, inv) => sum + inv.IGST, 0);

      return {
        Date: new Date().toISOString().split('T')[0],
        Invoice_No: invoiceNumbers[index],
        Client: item.Client_Name,
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
    });

    try {
      const response = await axios.post(`${backendUrl}/api/save-invoice`, invoicesToSave);

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
            invoiceNumbers.map((num, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                value={num}
                onChange={(e) => {
                  const newNumbers = [...invoiceNumbers];
                  newNumbers[index] = e.target.value;
                  setInvoiceNumbers(newNumbers);
                }}
                placeholder="Enter Invoice Number"
              />
            ))
          ) : (
            invoiceNumbers.map((num, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                value={num}
                readOnly
              />
            ))
          )}
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
        
        <table className="min-w-full border border-gray-300 mb-4">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Service</th>
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
                <td className="px-4 py-2">{item.Client_Name}</td>
                <td className="px-4 py-2">{item.Service_Name}</td>
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
