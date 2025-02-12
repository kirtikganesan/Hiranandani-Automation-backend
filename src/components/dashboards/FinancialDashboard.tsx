import React, { useEffect, useState } from "react";

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
  days_since_outstanding: number;
  remark: string;
}

const FinancialDashboard: React.FC = () => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  const [financialData, setFinancialData] = useState<FinancialData[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/financial-details")
      .then((response) => response.json())
      .then((data) => setFinancialData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Financial Dashboard</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white text-sm">
              <th className="border px-4 py-3 text-center font-semibold">Invoice No</th>
              <th className="border px-4 py-3 text-center font-semibold">Client</th>
              <th className="border px-4 py-3 text-center font-semibold">Gross Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Date</th>
              <th className="border px-4 py-3 text-center font-semibold">Service Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Total Bill Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Outstanding Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Settled Amount</th>
              <th className="border px-4 py-3 text-center font-semibold">Days Since Outstanding</th>
              <th className="border px-4 py-3 text-center font-semibold">Remark</th>
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
                <td className="border px-4 py-2">{item.days_since_outstanding}</td>
                <td className="border px-4 py-2">{item.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialDashboard;
