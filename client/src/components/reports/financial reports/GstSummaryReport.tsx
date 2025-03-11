import React, { useState, useEffect } from 'react';

// Define an interface for the GST summary report data
interface GstSummaryReportData {
  Client: string;
  Branch: string;
  GSTIN: string;
  State: string;
  Place_of_Supply: string;
  Invoice_Date: string;
  Invoice_Number: string;
  Invoice_Basic_Value: number;
  CGST: number;
  SGST: number;
  IGST: number;
  Non_Taxable_Claim: number;
  Total: number;
}

const GstSummaryReport = () => {
  const [startDate, setStartDate] = useState('2025-02-01');
  const [endDate, setEndDate] = useState('2025-02-17');
  const [branch, setBranch] = useState('Head Office');
  const [billingFirm, setBillingFirm] = useState('');
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [filteredData, setFilteredData] = useState<GstSummaryReportData[]>([]);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch billing firms
    fetch('http://localhost:5000/api/billing-firms')
      .then(response => response.json())
      .then(data => {
        setBillingFirms(data.map((item: { Billing_Firm: string }) => item.Billing_Firm));
        if (data.length > 0) {
          setBillingFirm(data[0].Billing_Firm); // Set default billing firm
        }
      })
      .catch(error => console.error('Error fetching billing firms:', error));
  }, []);

  const handleListClick = () => {
    // Fetch data from the backend based on selected criteria
    const queryParams = new URLSearchParams({
      billingFirm,
      startDate,
      endDate,
    });

    fetch(`http://localhost:5000/api/gst-summary-report?${queryParams}`)
      .then(response => response.json())
      .then((data: GstSummaryReportData[]) => {
        setFilteredData(data);
        setShowTable(true);
      })
      .catch(error => console.error('Error fetching GST summary report:', error));
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">GST Summary Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Start Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            End Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Branch<span className="text-red-500">*</span>
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Head Office">Head Office</option>
            <option value="Varsha Badlani's Office">Varsha Badlani's Office</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Billing Firm<span className="text-red-500">*</span>
          </label>
          <select
            value={billingFirm}
            onChange={(e) => setBillingFirm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {billingFirms.map((firm, index) => (
              <option key={index} value={firm}>{firm}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button onClick={handleListClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Branch</th>
                <th className="px-4 py-3 text-left">GSTIN</th>
                <th className="px-4 py-3 text-left">State</th>
                <th className="px-4 py-3 text-left">Place of Supply</th>
                <th className="px-4 py-3 text-left">Invoice Date</th>
                <th className="px-4 py-3 text-left">Invoice Number</th>
                <th className="px-4 py-3 text-right">Basic Value</th>
                <th className="px-4 py-3 text-right">CGST</th>
                <th className="px-4 py-3 text-right">SGST</th>
                <th className="px-4 py-3 text-right">IGST</th>
                <th className="px-4 py-3 text-right">Non Taxable</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-3">{item.Client}</td>
                    <td className="px-4 py-3">{item.Branch}</td>
                    <td className="px-4 py-3">{item.GSTIN}</td>
                    <td className="px-4 py-3">{item.State}</td>
                    <td className="px-4 py-3">{item.Place_of_Supply}</td>
                    <td className="px-4 py-3">{formatDate(item.Invoice_Date)}</td>
                    <td className="px-4 py-3">{item.Invoice_Number}</td>
                    <td className="px-4 py-3 text-right">{item.Invoice_Basic_Value}</td>
                    <td className="px-4 py-3 text-right">{item.CGST}</td>
                    <td className="px-4 py-3 text-right">{item.SGST}</td>
                    <td className="px-4 py-3 text-right">{item.IGST}</td>
                    <td className="px-4 py-3 text-right">{item.Non_Taxable_Claim}</td>
                    <td className="px-4 py-3 text-right">{item.Total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={13} className="px-4 py-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GstSummaryReport;
