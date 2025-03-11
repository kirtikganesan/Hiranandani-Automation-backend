import React, { useState, useEffect } from 'react';

const AllClientOutstandingReport: React.FC = () => {
  const [billingFirm, setBillingFirm] = useState('');
  const [branch, setBranch] = useState('Head Office');
  const [outstandingDate, setOutstandingDate] = useState('');
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState<any[]>([]);

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
    // Fetch data from the backend based on the selected billing firm
    const queryParams = new URLSearchParams({
      billingFirm,
    });

    fetch(`http://localhost:5000/api/all-client-outstanding?${queryParams}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setShowTable(true);
      })
      .catch(error => console.error('Error fetching client outstanding data:', error));
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">All Client Outstanding Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            Outstanding as on<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={outstandingDate}
            onChange={(e) => setOutstandingDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button onClick={handleListClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">List</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Reset</button>
        </div>
      </div>

      {showTable && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3 text-left">Client Code</th>
                <th className="px-4 py-3 text-left">Client Name</th>
                <th className="px-4 py-3 text-left">Billing Firm</th>
                <th className="px-4 py-3 text-right">Outstanding Amt</th>
                <th className="px-4 py-3 text-right">Unadjust Advance Amount</th>
                <th className="px-4 py-3 text-right">Total Outstanding Amt</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">{item.Client_Code}</td>
                    <td className="px-4 py-3">{item.Client_Name}</td>
                    <td className="px-4 py-3">{item.Billing_Firm}</td>
                    <td className="px-4 py-3 text-right">{Math.round(item.Outstanding_Amt)}</td>
                    <td className="px-4 py-3 text-right">{Math.round(item.Unadjusted_Advance_Amount)}</td>
                    <td className="px-4 py-3 text-right">{Math.round(item.Total_Outstanding_Amt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
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

export default AllClientOutstandingReport;
