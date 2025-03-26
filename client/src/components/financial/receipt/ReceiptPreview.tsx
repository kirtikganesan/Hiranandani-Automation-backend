import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { generatePDF, ReceiptData } from './utils/pdfGenerator';
import img from "../../../assets/calogo.png"

interface ReceiptPreviewProps {
  data: ReceiptData;
  onClose: () => void;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ data, onClose }) => {
  const [receiptNo, setReceiptNo] = useState<string>(data.receiptNo);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  // useEffect(() => {
  //   // Fetch the maximum receipt number for the selected billing firm
  //   const fetchMaxReceiptNo = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/api/max-receipt-no?billingFirm=${data.billingFirm}`);
  //       const result = await response.json();
  //       const maxReceiptNo = result.maxReceiptNo;

  //       // Generate the new receipt number
  //       if (maxReceiptNo) {
  //         const prefix = maxReceiptNo.split('-')[0];
  //         const number = parseInt(maxReceiptNo.split('-')[1], 10) + 1;
  //         const newReceiptNo = `${prefix}-${number.toString().padStart(2, '0')}`;
  //         setReceiptNo(newReceiptNo);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching max receipt number:', error);
  //     }
  //   };

  //   fetchMaxReceiptNo();
  // }, [data.billingFirm]);

  const handleDownloadPDF = () => {
    generatePDF({ ...data, receiptNo });
  };

  // Calculate totals
  const totalInvoiceAmount = data.invoiceDetails.reduce((sum, item) => sum + item.invoiceAmount, 0);
  const totalPreviouslyReceivedTDS = data.invoiceDetails.reduce((sum, item) => sum + item.previouslyReceivedTDS, 0);
  const totalCurrentTDS = data.invoiceDetails.reduce((sum, item) => sum + item.currentTDS, 0);
  const totalDiscount = data.invoiceDetails.reduce((sum, item) => sum + item.discount, 0);
  const totalNetAmountReceived = data.invoiceDetails.reduce((sum, item) => sum + item.netAmountReceived, 0);
  const totalBalanceOutstanding = data.invoiceDetails.reduce((sum, item) => sum + item.balanceOutstanding, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount).replace('₹', 'Rs. ');
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Receipt Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-1">
              {data.billingFirm === "HIRANANDANI AND ASSOCIATES" && (
                <img
                  src={img}
                  alt="CA Logo"
                  className="h-14 mr-2"
                />
              )}
              <div>
                <h1 className="text-xl font-bold tracking-tight">{data.billingFirm}</h1>
              </div>
            </div>
            <p className="text-xs mt-1">204, 205, 206 and 207, 2nd FLOOR, MANOHAR PALACE,</p>
            <p className="text-xs">BEHIND SAPNA TALKIES, FURNITURE BAZAR, ULHASNAGAR,ULHASNAGAR 421003</p>
            <p className="text-xs">Contact No. 9321022496   Email: hiranandaniandassociates@gmail.com</p>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          {/* Receipt Details */}
          <div className="flex justify-between mb-6">
            <p className="text-sm"><span className="font-medium">No:</span> {data.receiptNo}</p>
            <p className="text-sm"><span className="font-medium">Date:</span> {data.receiptDate}</p>
          </div>

          <h2 className="text-center font-bold text-lg mb-6">
            RECEIPT
          </h2>

          {/* Receipt Body */}
          <div className="mb-6">
            <p className="text-sm mb-6">
              Received with thanks from <span className="font-medium">{data.clientName}</span> a sum of <span className="font-medium">{formatCurrency(data.totalAmount)}</span> (Rupees Only) by {data.paymentType} as per the details given below:
            </p>

            {/* Receipt Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th colSpan={8} className="px-4 py-2 text-center border-b border-gray-200">
                      Against Invoice
                    </th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                      Invoice No.
                    </th>
                    <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                      Invoice Date
                    </th>
                    <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                      Invoice Amount
                    </th>
                    <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                      Previously Received + TDS Amount
                    </th>
                    <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                      Current TDS Amount
                    </th>
                    <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                      Discount
                    </th>
                    <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                      Net Amount Received
                    </th>
                    <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                      Balance Outstanding
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.invoiceDetails.map((invoice, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.invoiceNo}</td>
                      <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.invoiceDate}</td>
                      <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.invoiceAmount.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.previouslyReceivedTDS.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.currentTDS.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.discount.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.netAmountReceived.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.balanceOutstanding.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td colSpan={2} className="px-2 py-2 text-xs text-left border border-gray-200">Total</td>
                    <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalInvoiceAmount.toFixed(2)}</td>
                    <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalPreviouslyReceivedTDS.toFixed(2)}</td>
                    <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalCurrentTDS.toFixed(2)}</td>
                    <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalDiscount.toFixed(2)}</td>
                    <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalNetAmountReceived.toFixed(2)}</td>
                    <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalBalanceOutstanding.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Receipt Footer */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;
