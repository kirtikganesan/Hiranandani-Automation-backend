import { jsPDF } from 'jspdf';
import img from "../../../assets/calogo.png"

export interface InvoiceDetail {
  invoiceNo: string;
  invoiceDate: string;
  invoiceAmount: number;
  previouslyReceivedTDS: number;
  currentTDS: number;
  discount: number;
  netAmountReceived: number;
  balanceOutstanding: number;
}

export interface ReceiptData {
  receiptNo: string;
  receiptDate: string;
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
  doc.text('RECEIPT', 105, 65, { align: 'center' });

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
      detail.invoiceAmount.toFixed(2),
      detail.previouslyReceivedTDS.toFixed(2),
      detail.currentTDS.toFixed(2),
      detail.discount.toFixed(2),
      detail.netAmountReceived.toFixed(2),
      detail.balanceOutstanding.toFixed(2)
    ];

    values.forEach((value, i) => {
      doc.text(value, x + colWidths[i] / 2, y + 5, { align: 'center' });
      x += colWidths[i];
    });

    y += rowHeight;
  });

  y += 10;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('*Subject to realization of funds', 15, y);


  doc.save(`Receipt_${data.receiptNo}_${data.clientName.replace(/\s+/g, '_')}.pdf`);
};
