import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define an interface for the receipt data
interface Receipt {
  Receipt_No: string;
  Date: string;
  Type: string;
  Client_Name: string;
  Amount: number;
  TDS: number;
  Discount: number;
  Mode: string;
  Mode_Details: string;
  Reason: string;
  Billing_Firm: string;
}

const CancelledReceipts: React.FC = () => {
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<Receipt[]>([]);
  const [selectedBillingFirm, setSelectedBillingFirm] = useState<string>('');
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch unique billing firms
    const fetchData = async () => {
      try {
        const billingFirmsResponse = await axios.get<{ billing_firm: string }[]>('https://hiranandani-automation.onrender.com/api/financial-billing-firms');

        // Log the data to inspect its structure
        console.log('Billing Firms Response:', billingFirmsResponse.data);

        // Ensure you're setting arrays of strings
        const firmNames = billingFirmsResponse.data.map(firm => firm.billing_firm);

        console.log('Firm Names:', firmNames);

        setBillingFirms(firmNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleListClick = async () => {
    try {
      const response = await axios.get<{ data: Receipt[] }>('https://hiranandani-automation.onrender.com/api/cancelled-receipts');

      // Log the response data to inspect its structure
      console.log('API Response Data:', response.data);

      // Ensure response.data is defined and is an array
      const allData: Receipt[] = Array.isArray(response.data) ? response.data : [];

      // Filter data based on selected billing firm
      const filtered = allData.filter((item: Receipt) => {
        return selectedBillingFirm === '' || item.Billing_Firm === selectedBillingFirm;
      });

      setFilteredData(filtered);
    } catch (error) {
      console.error('Error fetching cancelled receipts:', error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Cancelled Receipt List</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Billing Firm</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedBillingFirm}
          onChange={(e) => setSelectedBillingFirm(e.target.value)}
        >
          <option value="">All Billing Firms</option>
          {billingFirms.map((firm, index) => (
            <option key={index} value={firm}>
              {firm}
            </option>
          ))}
        </select>
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleListClick}
      >
        List
      </button>

      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Receipt No</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Client Name</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">TDS</th>
                <th className="px-4 py-2 text-left">Discount</th>
                <th className="px-4 py-2 text-left">Mode</th>
                <th className="px-4 py-2 text-left">Mode Details</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Billing Firm</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((receipt, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{receipt.Receipt_No}</td>
                    <td className="px-4 py-2">{formatDate(receipt.Date)}</td>
                    <td className="px-4 py-2">{receipt.Type}</td>
                    <td className="px-4 py-2">{receipt.Client_Name}</td>
                    <td className="px-4 py-2">{receipt.Amount}</td>
                    <td className="px-4 py-2">{receipt.TDS}</td>
                    <td className="px-4 py-2">{receipt.Discount}</td>
                    <td className="px-4 py-2">{receipt.Mode}</td>
                    <td className="px-4 py-2">{receipt.Mode_Details}</td>
                    <td className="px-4 py-2">{receipt.Reason}</td>
                    <td className="px-4 py-2">{receipt.Billing_Firm}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center" colSpan={11}>
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CancelledReceipts;
