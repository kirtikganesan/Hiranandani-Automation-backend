import { jsPDF } from 'jspdf';
import img from "../../../assets/calogo.png"

export interface InvoiceDetail {
  invoiceNo: string;
  invoiceDate: string;
  invoiceAmount: number;
  previouslyReceivedTDS: number;
  currentTDS: number;
  discount: number;
  gst: number;
  netAmountReceived: number;
  balanceOutstanding: number;
  particulars?: string; // Add this field for advance receipts
}

export interface ReceiptData {
  transactionId: any;
  bankName: any;
  receiptNo: string;
  receiptDate: string;
  receiptType: 'invoice' | 'advance';
  clientName: string;
  paymentType: string;
  totalAmount: number;
  invoiceDetails: InvoiceDetail[];
  billingFirm: string;
}

export const generatePDF = (data: ReceiptData) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(data.billingFirm, 105, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Chartered Accountants', 105, 25, { align: 'center' });

  doc.setFontSize(8);
  doc.text('204, 205, 206 and 207, 2nd FLOOR, MANOHAR PALACE, BEHIND SAPNA TALKIES', 105, 32, { align: 'center' });
  doc.text('FURNITURE BAZAR, ULHASNAGAR, ULHASNAGAR 421003', 105, 36, { align: 'center' });
  doc.text('Contact No. 9321022496   Email: hiranandaniandassociates@gmail.com', 105, 40, { align: 'center' });

  doc.setFontSize(10);
  doc.text(`No: ${data.receiptNo}`, 15, 55);
  doc.text(`Date: ${data.receiptDate}`, 170, 55, { align: 'right' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(data.receiptType === 'invoice' ? 'RECEIPT' : 'ADVANCE RECEIPT', 105, 65, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(data.totalAmount).replace('₹', 'Rs. ');

  doc.text(`Received with thanks from ${data.clientName} a sum of ${formattedAmount} (Rupees Only)`, 15, 75);
  doc.text(`by ${data.paymentType} as per the details given below:`, 15, 81);

  let y = 90;
  const rowHeight = 7;

  if (data.receiptType === 'invoice') {
    // Invoice Receipt table
    const colWidths = [25, 25, 25, 30, 20, 20, 25, 25];
    const headers = [
      'Invoice No.',
      'Invoice Date',
      'Invoice Amount',
      'Pre. Received',
      'Current TDS',
      'Discount',
      'Net Amount',
      'Bal. Outstanding'
    ];

    let x = 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setFillColor(230, 230, 230);
    doc.rect(x, y, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');

    headers.forEach((header, i) => {
      doc.text(header, x + colWidths[i] / 2, y + 5, { align: 'center' });
      x += colWidths[i];
    });

    y += rowHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    data.invoiceDetails.forEach(detail => {
      let x = 15;
      const values = [
        detail.invoiceNo,
        detail.invoiceDate,
        Number(detail.invoiceAmount).toFixed(2), // Ensure it's a number
        Number(detail.previouslyReceivedTDS).toFixed(2), // Ensure it's a number
        Number(detail.currentTDS).toFixed(2), // Ensure it's a number
        Number(detail.discount).toFixed(2), // Ensure it's a number
        Number(detail.netAmountReceived).toFixed(2), // Ensure it's a number
        Number(detail.balanceOutstanding).toFixed(2) // Ensure it's a number
      ];

      values.forEach((value, i) => {
        doc.text(value, x + colWidths[i] / 2, y + 5, { align: 'center' });
        x += colWidths[i];
      });

      y += rowHeight;
    });
  } else {
    // Advance Receipt table
    const colWidths = [50, 50, 45, 45];
    const headers = [
      'Particulars',
      'Gross Advance Amount',
      'TDS on Advance',
      'Net Amount'
    ];

    let x = 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setFillColor(230, 230, 230);
    doc.rect(x, y, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');

    headers.forEach((header, i) => {
      doc.text(header, x + colWidths[i] / 2, y + 5, { align: 'center' });
      x += colWidths[i];
    });

    y += rowHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    data.invoiceDetails.forEach(detail => {
      let x = 15;
      const values = [
        detail.particulars || 'Advance Payment', // Use 'particulars' field
        Number(detail.invoiceAmount).toFixed(2), // Ensure it's a number
        Number(detail.currentTDS).toFixed(2), // Ensure it's a number
        Number(detail.netAmountReceived).toFixed(2) // Ensure it's a number
      ];

      values.forEach((value, i) => {
        doc.text(value, x + colWidths[i] / 2, y + 5, { align: 'center' });
        x += colWidths[i];
      });

      y += rowHeight;
    });
  }

  y += 10;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('*Subject to realization of funds', 15, y);

  doc.save(`Receipt_${data.receiptNo}_${data.clientName.replace(/\s+/g, '_')}.pdf`);
};
