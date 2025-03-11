import React, { useState, useEffect } from 'react';

const AgewiseAnalysisOfOutstandingInvoices: React.FC = () => {
  const [branch, setBranch] = useState('Head Office');
  const [billingProfile, setBillingProfile] = useState('');
  const [asOnDate, setAsOnDate] = useState('');
  const [billingProfiles, setBillingProfiles] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch billing profiles
    fetch('http://localhost:5000/api/billing-firms')
      .then(response => response.json())
      .then(data => {
        setBillingProfiles(data.map((item: { Billing_Firm: string }) => item.Billing_Firm));
        if (data.length > 0) {
          setBillingProfile(data[0].Billing_Firm); // Set default billing profile
        }
      })
      .catch(error => console.error('Error fetching billing profiles:', error));
  }, []);

  const handleListClick = () => {
    // Fetch data from the backend based on selected criteria
    const queryParams = new URLSearchParams({
      branch,
      billingProfile,
      asOnDate,
    });

    fetch(`http://localhost:5000/api/agewise-analysis?${queryParams}`)
      .then(response => response.json())
      .then(data => {
        setFilteredData(data);
        setShowTable(true);
      })
      .catch(error => console.error('Error fetching agewise analysis:', error));
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Agewise Analysis of Outstanding Invoices</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            Billing Profile<span className="text-red-500">*</span>
          </label>
          <select
            value={billingProfile}
            onChange={(e) => setBillingProfile(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {billingProfiles.map((profile, index) => (
              <option key={index} value={profile}>{profile}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            As on<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={asOnDate}
            onChange={(e) => setAsOnDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end items-center mb-4">
        
        <div className="flex gap-2">
          <button onClick={handleListClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
        </div>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3 text-left">Invoice Date</th>
                <th className="px-4 py-3 text-left">Invoice Number</th>
                <th className="px-4 py-3 text-left">Billing Profile</th>
                <th className="px-4 py-3 text-left">Name of Client</th>
                <th className="px-4 py-3 text-left">Branch</th>
                <th className="px-4 py-3 text-right">Less than 30 days</th>
                <th className="px-4 py-3 text-right">30-60 days</th>
                <th className="px-4 py-3 text-right">61-90 days</th>
                <th className="px-4 py-3 text-right">91-180 days</th>
                <th className="px-4 py-3 text-right">More than 180 days</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">{formatDate(item.Invoice_Date)}</td>
                    <td className="px-4 py-3">{item.Invoice_Number}</td>
                    <td className="px-4 py-3">{item.Billing_Profile}</td>
                    <td className="px-4 py-3">{item.Name_of_Client}</td>
                    <td className="px-4 py-3">{item.Branch}</td>
                    <td className="px-4 py-3 text-right">{item.Less_than_30_days}</td>
                    <td className="px-4 py-3 text-right">{item.Days_30_60}</td>
                    <td className="px-4 py-3 text-right">{item.Days_61_90}</td>
                    <td className="px-4 py-3 text-right">{item.Days_91_180}</td>
                    <td className="px-4 py-3 text-right">{item.More_than_180_days}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
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

export default AgewiseAnalysisOfOutstandingInvoices;
