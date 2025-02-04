import React, { useEffect, useState } from "react";

const FinancialDashboard = () => {
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/financial-details")
      .then((response) => response.json())
      .then((data) => setFinancialData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Financial Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Invoice No</th>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Gross Amount</th>
              <th className="border px-4 py-2">Service Amount</th>
              <th className="border px-4 py-2">Total Bill Amount</th>
              <th className="border px-4 py-2">Outstanding Amount</th>
              <th className="border px-4 py-2">Settled Amount</th>
              <th className="border px-4 py-2">Days Since Outstanding</th>
              <th className="border px-4 py-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((item: any) => (
              <tr key={item.id} className="border">
                <td className="border px-4 py-2">{item.date}</td>
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
