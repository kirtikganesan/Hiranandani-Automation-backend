import React, { useState, useEffect } from 'react';

const ClientLedgerReport: React.FC = () => {
  const [billingFirm, setBillingFirm] = useState('');
  const [branch, setBranch] = useState('Head Office');
  const [clientName, setClientName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);

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

    // Fetch clients
    fetch('http://localhost:5000/api/clients')
      .then(response => response.json())
      .then(data => {
        setClients(data.map((item: { client_name: string }) => item.client_name));
        if (data.length > 0) {
          setClientName(data[0].client_name); // Set default client
        }
      })
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  const handleListClick = () => {
    setShowTable(true);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Client Ledger</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
            Client Name<span className="text-red-500">*</span>
          </label>
          <select
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {clients.map((client, index) => (
              <option key={index} value={client}>{client}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            From Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            To Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
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
                <th className="px-4 py-3 text-left">Sr. No.</th>
                <th className="px-4 py-3 text-left">Billing Firm</th>
                <th className="px-4 py-3 text-left">Date of Invoice/Receipt/TDS</th>
                <th className="px-4 py-3 text-left">Particular (Invoice Number / Receipt Number)</th>
                <th className="px-4 py-3 text-right">Invoice Amount</th>
                <th className="px-4 py-3 text-right">Advance Amount</th>
                <th className="px-4 py-3 text-right">Receipt Amount</th>
                <th className="px-4 py-3 text-right">TDS</th>
                <th className="px-4 py-3 text-right">Discount</th>
                <th className="px-4 py-3 text-right">Balance</th>
                <th className="px-4 py-3 text-right">Days Since Outstanding</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center">Opening Balance</td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center"></td>
                <td className="px-4 py-3 text-center">0</td>
                <td className="px-4 py-3 text-center"></td>

              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientLedgerReport;
