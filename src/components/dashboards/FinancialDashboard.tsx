import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

interface FinancialData {
  id: number;
  date: string;
  invoice_no: string;
  client: string;
  gross_amount: number;
  service_amount: number;
  total_bill_amount: number;
  outstanding_amount: number;
  settled_amount: number;
  remark: string;
  billing_firm: string;
}

const FinancialDashboard: React.FC = () => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  const calculateDaysSinceOutstanding = (dateString: string) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calculate days
  };

  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [selectedFirm, setSelectedFirm] = useState<string>("");

  // Fetch billing firms
  useEffect(() => {
    fetch("http://localhost:5000/api/financial-billing-firms")
      .then((response) => response.json())
      .then((data) => {
        const firms = data.map((item: any) => item.billing_firm);
        setBillingFirms(firms);
      })
      .catch((error) => console.error("Error fetching billing firms:", error));
  }, []);

  // Fetch financial data based on selected firm
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/financial-details${
            selectedFirm ? `?billingFirm=${selectedFirm}` : ""
          }`
        );
        const data = await response.json();
        setFinancialData(data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchFinancialData();
  }, [selectedFirm]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(financialData.map(item => ({
      ...item,
      date: formatDate(item.date),
      days_since_outstanding: calculateDaysSinceOutstanding(item.date)
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FinancialData');
    XLSX.writeFile(workbook, 'FinancialData.xlsx');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Financial Dashboard</h2>
      <div className="mb-4">
        <label htmlFor="billingFirmSelect" className="mr-2">Select Billing Firm:</label>
        <select
          id="billingFirmSelect"
          value={selectedFirm}
          onChange={(e) => setSelectedFirm(e.target.value)}
          className="border p-2"
        >
          <option value="">All Firms</option>
          {billingFirms.map((firm, index) => (
            <option key={index} value={firm}>
              {firm}
            </option>
          ))}
        </select>
      </div>
      <button onClick={exportToExcel} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Export to Excel
      </button>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white text-sm">
              <th className="border px-4 py-3 text-center font-semibold">Date</th>
              <th className="border px-4 py-3 text-center font-semibold">Invoice No</th>
              <th className="border px-4 py-3 text-center font-semibold">Client</th>
              <th className="border px-4 py-3 text-center font-semibold">Gross Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Service Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Total Bill Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Outstanding Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Settled Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Days Since Outstanding</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {financialData.map((item) => (
              <tr key={item.id} className="text-sm text-center">
                <td className="border px-4 py-2">{formatDate(item.date)}</td>
                <td className="border px-4 py-2">{item.invoice_no}</td>
                <td className="border px-4 py-2">{item.client}</td>
                <td className="border px-4 py-2">{item.gross_amount}</td>
                <td className="border px-4 py-2">{item.service_amount}</td>
                <td className="border px-4 py-2">{item.total_bill_amount}</td>
                <td className="border px-4 py-2">{item.outstanding_amount}</td>
                <td className="border px-4 py-2">{item.settled_amount}</td>
                <td className="border px-4 py-2">{calculateDaysSinceOutstanding(item.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialDashboard;
