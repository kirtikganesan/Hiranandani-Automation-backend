import React, { useState, useEffect } from 'react';
import { Plus, X, Edit } from 'lucide-react';
import axios from 'axios';

interface BalanceEntry {
  branch: string;
  billingFirm: string;
  invoiceNo: string;
  invoiceDate: string;
  clientName: string;
  basicAmount: number;
  taxableClaim: number;
  cgst: number;
  sgst: number;
  igst: number;
  nonTaxableClaim: number;
  totalAmount: number;
}

interface ListEntry {
  Date: string;
  Invoice_No: string;
  Client: string;
  Billing_Firm: string;
  Service_Amount: number;
  Taxable_Claim_Amount: number;
  CGST: number;
  SGST: number;
  IGST: number;
  Non_Taxable_Amount: number;
  Total_Bill_Amount: number;
  Outstanding_Amount: number;
}

const OpeningOutstandingBalances: React.FC = () => {
  const [entries, setEntries] = useState<BalanceEntry[]>([{
    branch: '',
    billingFirm: '',
    invoiceNo: '',
    invoiceDate: '',
    clientName: '',
    basicAmount: 0,
    taxableClaim: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    nonTaxableClaim: 0,
    totalAmount: 0
  }]);

  const [listEntries, setListEntries] = useState<ListEntry[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/opening-invoices`);
      setListEntries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addEntry = () => {
    setEntries([...entries, {
      branch: '',
      billingFirm: '',
      invoiceNo: '',
      invoiceDate: '',
      clientName: '',
      basicAmount: 0,
      taxableClaim: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      nonTaxableClaim: 0,
      totalAmount: 0
    }]);
  };

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleInputChange = (index: number, field: keyof BalanceEntry, value: string | number) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: value
    };
    setEntries(newEntries);
  };

  const handleSave = async () => {
    try {
      for (const entry of entries) {
        if (entry.invoiceNo) {
          await axios.post(`${backendUrl}/api/opening-invoices`, {
            ...entry,
            date: new Date().toISOString().split('T')[0] // Add current date
          });
        }
      }
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Opening Outstanding Balances</h1>

      {/* Entry Form */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border p-2">Branch</th>
              <th className="border p-2">Billing Firm</th>
              <th className="border p-2">Invoice No</th>
              <th className="border p-2">Invoice Date</th>
              <th className="border p-2">Client Name</th>
              <th className="border p-2">Basic Amount</th>
              <th className="border p-2">Taxable Claim</th>
              <th className="border p-2">CGST</th>
              <th className="border p-2">SGST</th>
              <th className="border p-2">IGST</th>
              <th className="border p-2">Non Taxable Claim</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">
                <button onClick={addEntry} className="bg-green-500 p-1 rounded">
                  <Plus size={16} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <select
                    className="w-full p-1 border rounded"
                    value={entry.branch}
                    onChange={(e) => handleInputChange(index, 'branch', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="head">Head Office</option>
                    <option value="varsha">Varsha Badlani Office</option>
                  </select>
                </td>
                <td className="border p-2">
                  <select
                    className="w-full p-1 border rounded"
                    value={entry.billingFirm}
                    onChange={(e) => handleInputChange(index, 'billingFirm', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="ria">RIA ENTERPRISES</option>
                    <option value="hiranandani">HIRANANDANI & ASSOCIATES</option>
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.invoiceNo}
                    onChange={(e) => handleInputChange(index, 'invoiceNo', e.target.value)}
                    placeholder="OB-"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.invoiceDate}
                    onChange={(e) => handleInputChange(index, 'invoiceDate', e.target.value)}
                    placeholder="DD/MM/YYYY"
                  />
                </td>
                <td className="border p-2">
                  <select
                    className="w-full p-1 border rounded"
                    value={entry.clientName}
                    onChange={(e) => handleInputChange(index, 'clientName', e.target.value)}
                  >
                    <option value="">Select</option>
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={entry.basicAmount}
                    onChange={(e) => handleInputChange(index, 'basicAmount', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={entry.taxableClaim}
                    onChange={(e) => handleInputChange(index, 'taxableClaim', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={entry.cgst}
                    onChange={(e) => handleInputChange(index, 'cgst', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={entry.sgst}
                    onChange={(e) => handleInputChange(index, 'sgst', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={entry.igst}
                    onChange={(e) => handleInputChange(index, 'igst', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={entry.nonTaxableClaim}
                    onChange={(e) => handleInputChange(index, 'nonTaxableClaim', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={entry.totalAmount}
                    onChange={(e) => handleInputChange(index, 'totalAmount', parseFloat(e.target.value))}
                  />
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => removeEntry(index)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    <X size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-2 mb-8">
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>

      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Billing Profile</label>
          <select className="p-2 border rounded min-w-[200px]">
            <option value="">Select Billing...</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Client</label>
          <select className="p-2 border rounded min-w-[200px]">
            <option value="">Select client</option>
          </select>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">List</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Export</button>
        </div>
      </div>

      {/* List Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border p-2">Date</th>
              <th className="border p-2">Invoice No</th>
              <th className="border p-2">Client</th>
              <th className="border p-2">Billing Firm</th>
              <th className="border p-2">Service Amount</th>
              <th className="border p-2">Taxable Claim</th>
              <th className="border p-2">CGST</th>
              <th className="border p-2">SGST</th>
              <th className="border p-2">IGST</th>
              <th className="border p-2">Non Taxable Claim</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Outstanding Amount</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {listEntries.map((entry, index) => (
              <tr key={index}>
                <td className="border p-2">{entry.Date}</td>
                <td className="border p-2">{entry.Invoice_No}</td>
                <td className="border p-2">{entry.Client}</td>
                <td className="border p-2">{entry.Billing_Firm}</td>
                <td className="border p-2">{entry.Service_Amount}</td>
                <td className="border p-2">{entry.Taxable_Claim_Amount}</td>
                <td className="border p-2">{entry.CGST}</td>
                <td className="border p-2">{entry.SGST}</td>
                <td className="border p-2">{entry.IGST}</td>
                <td className="border p-2">{entry.Non_Taxable_Amount}</td>
                <td className="border p-2">{entry.Total_Bill_Amount}</td>
                <td className="border p-2">{entry.Outstanding_Amount}</td>
                <td className="border p-2">
                  <div className="flex gap-1">
                    <button className="bg-red-500 text-white p-1 rounded">
                      <X size={16} />
                    </button>
                    <button className="bg-blue-500 text-white p-1 rounded">
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpeningOutstandingBalances;
