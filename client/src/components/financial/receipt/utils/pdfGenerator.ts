import { jsPDF } from 'jspdf';

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
  billingFirm: string; // Add this line
}

export const generatePDF = (data: ReceiptData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Add logo and header
  if (data.billingFirm === "HIRANANDANI AND ASSOCIATES") {
    // Uncomment and update the path to the logo if needed
    // doc.addImage('/path/to/logo.png', 'PNG', 10, 10, 20, 20);
  }

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

  // Add receipt details
  doc.setFontSize(10);
  doc.text(`No: ${data.receiptNo}`, 15, 55);
  doc.text(`Date: ${data.receiptDate}`, 170, 55, { align: 'right' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('RECEIPT', 105, 65, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Format the amount for display
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(data.totalAmount).replace('₹', 'Rs. ');

  // Add receipt text
  doc.text(`Received with thanks from ${data.clientName} a sum of ${formattedAmount} (Rupees Only)`, 15, 75);
  doc.text(`by ${data.paymentType} as per the details given below:`, 15, 81);

  // Create table
  let y = 90;
  const headerHeight = 8;
  const rowHeight = 7;
  const colWidth = [20, 20, 20, 27, 20, 20, 25, 25];
  const startX = 15;
  let currentX = startX;

  // Draw header
  doc.setFillColor(240, 240, 240);
  doc.rect(startX, y, colWidth.reduce((a, b) => a + b, 0), headerHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);

  doc.text('Invoice No.', startX + 2, y + 5);
  currentX += colWidth[0];

  doc.text('Invoice Date', currentX + 2, y + 5);
  currentX += colWidth[1];

  doc.text('Invoice Amount', currentX + 2, y + 5);
  currentX += colWidth[2];

  doc.text('Previously Received + TDS', currentX + 2, y + 5);
  currentX += colWidth[3];

  doc.text('Current TDS', currentX + 2, y + 5);
  currentX += colWidth[4];

  doc.text('Discount', currentX + 2, y + 5);
  currentX += colWidth[5];

  doc.text('Net Amount Received', currentX + 2, y + 5);
  currentX += colWidth[6];

  doc.text('Balance Outstanding', currentX + 2, y + 5);

  // Add table lines
  doc.line(startX, y, startX + colWidth.reduce((a, b) => a + b, 0), y); // Top horizontal line
  doc.line(startX, y + headerHeight, startX + colWidth.reduce((a, b) => a + b, 0), y + headerHeight); // Bottom horizontal line

  // Draw vertical lines for headers
  currentX = startX;
  doc.line(currentX, y, currentX, y + headerHeight); // First vertical line

  data.invoiceDetails.forEach((detail, index) => {
    y += rowHeight;

    // Draw row
    doc.setFont('helvetica', 'normal');
    currentX = startX;

    doc.text(detail.invoiceNo, currentX + 2, y + 4);
    currentX += colWidth[0];

    doc.text(detail.invoiceDate, currentX + 2, y + 4);
    currentX += colWidth[1];

    doc.text(detail.invoiceAmount.toFixed(2), currentX + 2, y + 4);
    currentX += colWidth[2];

    doc.text(detail.previouslyReceivedTDS.toFixed(2), currentX + 2, y + 4);
    currentX += colWidth[3];

    doc.text(detail.currentTDS.toFixed(2), currentX + 2, y + 4);
    currentX += colWidth[4];

    doc.text(detail.discount.toFixed(2), currentX + 2, y + 4);
    currentX += colWidth[5];

    doc.text(detail.netAmountReceived.toFixed(2), currentX + 2, y + 4);
    currentX += colWidth[6];

    doc.text(detail.balanceOutstanding.toFixed(2), currentX + 2, y + 4);
  });

  // Draw bottom line for data rows
  doc.line(startX, y, startX + colWidth.reduce((a, b) => a + b, 0), y);

  // Footer
  y += 20;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('*Subject to realization of funds', 15, y);

  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('For HIRANANDANI & ASSOCIATES', 170, y, { align: 'right' });

  y += 15;
  doc.text('Proprietor', 170, y, { align: 'right' });

  // Save the PDF
  doc.save(`Receipt_${data.receiptNo}_${data.clientName.replace(/\s+/g, '_')}.pdf`);
};
