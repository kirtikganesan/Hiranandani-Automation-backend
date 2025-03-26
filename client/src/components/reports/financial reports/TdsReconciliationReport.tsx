import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TdsReport {
  Client: string;
  TAN: string | null;
  Date: string;
  Number: string;
  Billing_Firm: string;
  Taxable_Amount: number;
  TDS_Amount_bf: number;
  FY_from_which_bf: string;
  TDS_deducted_Current_year: number;
  TDS_Claim_Current_year: number;
  TDS_cf: number;
  TDS_appearing_in_26AS: 'yes' | 'no';
}

const TdsReconciliationReport: React.FC = () => {
  const [billingFirm, setBillingFirm] = useState<string>('');
  const [financialYear, setFinancialYear] = useState<string>('');
  const [billingFirms, setBillingFirms] = useState<{ Billing_Firm: string }[]>([]);
  const [financialYears, setFinancialYears] = useState<string[]>([]);
  const [data, setData] = useState<TdsReport[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names


  useEffect(() => {
    // Fetch distinct Billing Firms
    axios.get(`${backendUrl}/api/billing-firms`)
      .then(response => setBillingFirms(response.data))
      .catch(error => console.error('Error fetching billing firms:', error));

    // Fetch financial year options
    axios.get(`${backendUrl}/api/financial-years`)
      .then(response => setFinancialYears(response.data))
      .catch(error => console.error('Error fetching financial years:', error));
  }, []);

  const fetchData = () => {
    const params = {
      billingFirm: billingFirm || undefined,
      financialYear: financialYear || undefined,
    };

    axios.get(`${backendUrl}/api/tds-report`, { params })
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">TDS Reconciliation Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Billing Firm</label>
          <select
            value={billingFirm}
            onChange={(e) => setBillingFirm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {billingFirms.map((firm, index) => (
              <option key={index} value={firm.Billing_Firm}>
                {firm.Billing_Firm}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Financial Year</label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {financialYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          List
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">TAN</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Number</th>
              <th className="px-4 py-3 text-left">Billing Firm</th>
              <th className="px-4 py-3 text-right">Taxable Amount</th>
              <th className="px-4 py-3 text-right">TDS Amount b/f</th>
              <th className="px-4 py-3 text-left">F. Y. from which b/f</th>
              <th className="px-4 py-3 text-right">TDS deducted in Current</th>
              <th className="px-4 py-3 text-right">TDS Claim Current year</th>
              <th className="px-4 py-3 text-right">TDS c/f</th>
              <th className="px-4 py-3 text-center">TDS appearing in 26AS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-3">{row.Client}</td>
                <td className="px-4 py-3">{row.TAN}</td>
                <td className="px-4 py-3">{formatDate(row.Date)}</td>
                <td className="px-4 py-3">{row.Number}</td>
                <td className="px-4 py-3">{row.Billing_Firm}</td>
                <td className="px-4 py-3 text-right">{row.Taxable_Amount}</td>
                <td className="px-4 py-3 text-right">{row.TDS_Amount_bf}</td>
                <td className="px-4 py-3">{row.FY_from_which_bf}</td>
                <td className="px-4 py-3 text-right">{row.TDS_deducted_Current_year}</td>
                <td className="px-4 py-3 text-right">{row.TDS_Claim_Current_year}</td>
                <td className="px-4 py-3 text-right">{row.TDS_cf}</td>
                <td className="px-4 py-3 text-center">{row.TDS_appearing_in_26AS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TdsReconciliationReport;
