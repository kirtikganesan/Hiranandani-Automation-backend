import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SacSummaryReport {
  SAC_Code: string;
  Taxable_Amount: number;
  CGST: number;
  SGST: number;
  IGST: number;
  Billing_Firm: string;
}

const SacCodeSummaryReport = () => {
  const [financialYear, setFinancialYear] = useState('');
  const [billingProfile, setBillingProfile] = useState('');
  const [financialYears, setFinancialYears] = useState<string[]>([]);
  const [billingFirms, setBillingFirms] = useState<{ Billing_Firm: string }[]>([]);
  const [filteredData, setFilteredData] = useState<SacSummaryReport[]>([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Fetch financial years
    axios.get('http://localhost:5000/api/financial-years')
      .then(response => {
        setFinancialYears(response.data);
        setFinancialYear(response.data[0]); // Set default financial year
      })
      .catch(error => {
        console.error('Error fetching financial years:', error);
      });

    // Fetch billing firms
    axios.get('http://localhost:5000/api/billing-firms')
      .then(response => {
        setBillingFirms(response.data);
        setBillingProfile(response.data[0]?.Billing_Firm || ''); // Set default billing firm
      })
      .catch(error => {
        console.error('Error fetching billing firms:', error);
      });
  }, []);

  const handleListClick = () => {
    if (financialYear === '2024-2025') {
      // Fetch and filter data based on selected billing firm
      axios.get('http://localhost:5000/api/sac-summary-report')
        .then(response => {
          const filtered = response.data.filter((item: SacSummaryReport) => item.Billing_Firm === billingProfile);
          setFilteredData(filtered);
          setShowTable(true);
        })
        .catch(error => {
          console.error('Error fetching SAC summary report:', error);
        });
    } else {
      setFilteredData([]);
      setShowTable(true);
    }
  };

  const formatNumber = (value: any): number => {
    if (typeof value === 'number') {
      return Math.round(value); // Round the number to the nearest integer
    }
    if (typeof value === 'string') {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        return Math.round(num);
      }
    }
    return 0; // Default value if the input is not a valid number
  };

  const calculateTotal = (data: SacSummaryReport[]): number => {
    return data.reduce((sum, item) => sum + formatNumber(item.Taxable_Amount) + formatNumber(item.CGST) + formatNumber(item.SGST) + formatNumber(item.IGST), 0);
  };

  const total = calculateTotal(filteredData);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">SAC Code Summary Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Financial Year<span className="text-red-500">*</span>
          </label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {financialYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Billing Profile<span className="text-red-500">*</span>
          </label>
          <select
            value={billingProfile}
            onChange={(e) => setBillingProfile(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {billingFirms.map(firm => (
              <option key={firm.Billing_Firm} value={firm.Billing_Firm}>{firm.Billing_Firm}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button onClick={handleListClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">Export</button>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          {filteredData.length > 0 ? (
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-3 text-left">SAC Code</th>
                  <th className="px-4 py-3 text-right">Taxable Amount</th>
                  <th className="px-4 py-3 text-right">CGST</th>
                  <th className="px-4 py-3 text-right">SGST</th>
                  <th className="px-4 py-3 text-right">IGST</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(item => (
                  <tr key={item.SAC_Code} className="border-b border-gray-200">
                    <td className="px-4 py-3">{item.SAC_Code}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(item.Taxable_Amount)}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(item.CGST)}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(item.SGST)}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(item.IGST)}</td>
                    <td className="px-4 py-3 text-right font-bold">{formatNumber(item.Taxable_Amount + item.CGST + item.SGST + item.IGST)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className="px-4 py-3">Grand Total</td>
                  <td className="px-4 py-3 text-right">{formatNumber(filteredData.reduce((sum, item) => sum + formatNumber(item.Taxable_Amount), 0))}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(filteredData.reduce((sum, item) => sum + formatNumber(item.CGST), 0))}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(filteredData.reduce((sum, item) => sum + formatNumber(item.SGST), 0))}</td>
                  <td className="px-4 py-3 text-right">{formatNumber(filteredData.reduce((sum, item) => sum + formatNumber(item.IGST), 0))}</td>
                  <td className="px-4 py-3 text-right">{total}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p className="text-center text-gray-500">No records found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SacCodeSummaryReport;
