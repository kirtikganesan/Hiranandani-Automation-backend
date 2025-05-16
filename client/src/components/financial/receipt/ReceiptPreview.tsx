import React, { useState } from 'react';
import { format } from 'date-fns';
import { generatePDF, ReceiptData } from './utils/pdfGenerator';
import img from "../../../assets/calogo.png";

interface ReceiptPreviewProps {
  data: ReceiptData;
  onClose: () => void;
  onSave: (receiptData: ReceiptData) => void;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ data, onClose, onSave }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/save-receipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receipt_no: data.receiptNo,
          date: data.receiptDate,
          type: data.receiptType === 'invoice' ? 'Against Invoice' : 'Advance Receipt',
          client_name: data.clientName,
          amount: data.totalAmount,
          tds: data.receiptType === 'invoice' ? data.invoiceDetails.reduce((sum, item) => sum + item.currentTDS, 0) : 0,
          discount: data.receiptType === 'invoice' ? data.invoiceDetails.reduce((sum, item) => sum + item.discount, 0) : 0,
          mode: data.paymentType,
          mode_details: data.paymentType === 'Cash' ? 'Cash' :
                        data.paymentType === 'E-Payment' ? `Transaction ID: ${data.transactionId}` :
                        `Bank Name: ${data.bankName}`,
          billing_firm: data.billingFirm,
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        console.error('Failed to save receipt');
      }
    } catch (error) {
      console.error('Error saving receipt:', error);
    }
  };

  const handleDownloadPDF = () => {
    generatePDF(data);
    setShowSuccessModal(false);
    onClose();
  };

  const totalInvoiceAmount = data.invoiceDetails.reduce((sum, item) => sum + item.invoiceAmount, 0);
  const totalPreviouslyReceivedTDS = data.invoiceDetails.reduce((sum, item) => sum + item.previouslyReceivedTDS, 0);
  const totalCurrentTDS = data.invoiceDetails.reduce((sum, item) => sum + item.currentTDS, 0);
  const totalDiscount = data.invoiceDetails.reduce((sum, item) => sum + item.discount, 0);
  const totalGST = data.invoiceDetails.reduce((sum, item) => sum + item.gst, 0);
  const totalNetAmountReceived = data.invoiceDetails.reduce((sum, item) => sum + item.netAmountReceived, 0);
  const totalBalanceOutstanding = data.invoiceDetails.reduce((sum, item) => sum + item.balanceOutstanding, 0);

  const totalGrossAdvance = data.receiptType === 'advance'
    ? data.invoiceDetails.reduce((sum, item) => sum + (item.invoiceAmount || 0), 0)
    : 0;

  const totalAdvanceTDS = data.receiptType === 'advance'
    ? data.invoiceDetails.reduce((sum, item) => sum + (item.currentTDS || 0), 0)
    : 0;

  const totalNetAdvance = data.receiptType === 'advance'
    ? data.invoiceDetails.reduce((sum, item) => sum + (item.netAmountReceived || 0), 0)
    : 0;

  const formatTotal = (value: number) => Number(value).toFixed(2);

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

          <div className="flex justify-between mb-6">
            <p className="text-sm"><span className="font-medium">No:</span> {data.receiptNo}</p>
            <p className="text-sm"><span className="font-medium">Date:</span> {data.receiptDate}</p>
          </div>

          <h2 className="text-center font-bold text-lg mb-6">
            {data.receiptType === 'invoice' ? 'RECEIPT' : 'ADVANCE RECEIPT'}
          </h2>

          <div className="mb-6">
            <p className="text-sm mb-6">
              Received with thanks from <span className="font-medium">{data.clientName}</span> a sum of <span className="font-medium">{formatCurrency(data.totalAmount)}</span> (Rupees Only) by {data.paymentType} as per the details given below:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th colSpan={data.receiptType === 'invoice' ? 9 : 4} className="px-4 py-2 text-center border-b border-gray-200">
                      {data.receiptType === 'invoice' ? 'Against Invoice' : 'Advance Receipt'}
                    </th>
                  </tr>

                  {data.receiptType === 'invoice' ? (
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
                        GST
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
                  ) : (
                    <tr className="bg-gray-50">
                      <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                        Particulars
                      </th>
                      <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                        Gross Advance Amount
                      </th>
                      <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                        TDS on Advance
                      </th>
                      <th className="px-2 py-2 text-xs font-medium text-gray-600 border border-gray-200">
                        Net Amount
                      </th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {data.receiptType === 'invoice' ? (
                    data.invoiceDetails.map((invoice, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.invoiceNo}</td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{formatDate(invoice.invoiceDate)}</td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.invoiceAmount?.toFixed(2) || '0.00'}</td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.gst?.toFixed(2) || '0.00'}</td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.previouslyReceivedTDS?.toFixed(2) || '0.00'}</td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.currentTDS?.toFixed(2) || '0.00'}</td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.discount?.toFixed(2) || '0.00'}</td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">
                          {(invoice.invoiceAmount + (invoice.gst || 0) - invoice.currentTDS)?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">{invoice.balanceOutstanding?.toFixed(2) || '0.00'}</td>
                      </tr>
                    ))
                  ) : (
                    data.invoiceDetails.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">
                          {item.invoiceNo || "Advance Payment"}
                        </td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">
                          {Number(item.invoiceAmount)?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">
                          {item.currentTDS?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-2 py-2 text-xs text-center border-x border-gray-200">
                          {item.netAmountReceived?.toFixed(2) || '0.00'}
                        </td>
                      </tr>
                    ))
                  )}

                  {data.receiptType === 'invoice' ? (
                    <tr className="bg-gray-50 font-medium">
                      <td colSpan={2} className="px-2 py-2 text-xs text-left border border-gray-200">Total</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalInvoiceAmount.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalGST.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalPreviouslyReceivedTDS.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalCurrentTDS.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalDiscount.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalNetAmountReceived.toFixed(2)}</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{totalBalanceOutstanding.toFixed(2)}</td>
                    </tr>
                  ) : (
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-2 py-2 text-xs text-left border border-gray-200">Total</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{formatTotal(totalGrossAdvance)}</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{formatTotal(totalAdvanceTDS)}</td>
                      <td className="px-2 py-2 text-xs text-center border border-gray-200">{formatTotal(totalNetAdvance)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">Saved Successfully...</h2>
            <p className="mb-4">Do you want to download the PDF?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                No
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptPreview;
