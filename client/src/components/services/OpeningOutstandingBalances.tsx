import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
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
    invoiceNo: 'OB-',
    invoiceDate: new Date().toISOString().split('T')[0],
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
  const [billingFirms, setBillingFirms] = useState<string[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const [selectedBillingFirm, setSelectedBillingFirm] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [gstAvailable, setGstAvailable] = useState<boolean>(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    fetchData();
    fetchBillingFirms();
    fetchUniqueClients();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/opening-invoices`);
      setListEntries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchBillingFirms = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/financial-billing-firms`);
      setBillingFirms(response.data.map((firm: { billing_firm: string }) => firm.billing_firm));
    } catch (error) {
      console.error('Error fetching billing firms:', error);
    }
  };

  const fetchUniqueClients = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/opening-balance-clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching unique clients:', error);
    }
  };

  const addEntry = () => {
    setEntries([...entries, {
      branch: '',
      billingFirm: '',
      invoiceNo: 'OB-',
      invoiceDate: new Date().toISOString().split('T')[0],
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

  const safeParseFloat = (value: string | number): number => {
    if (value === '' || value === null || value === undefined) {
      return 0;
    }

    const parsed = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleInputChange = (index: number, field: keyof BalanceEntry, value: string | number) => {
    const newEntries = [...entries];

    const numericFields = ['basicAmount', 'taxableClaim', 'cgst', 'sgst', 'igst', 'nonTaxableClaim', 'totalAmount'];

    if (numericFields.includes(field as string)) {
      newEntries[index] = {
        ...newEntries[index],
        [field]: safeParseFloat(value)
      };
    } else {
      newEntries[index] = {
        ...newEntries[index],
        [field]: value
      };
    }

    if (field === 'billingFirm') {
      fetchGstAvailable(value as string);
    }

    if (field === 'basicAmount' && gstAvailable) {
      const basicAmount = safeParseFloat(value);
      newEntries[index].cgst = basicAmount * 0.09;
      newEntries[index].sgst = basicAmount * 0.09;
    }

    newEntries[index].totalAmount = calculateTotalAmount(newEntries[index]);

    setEntries(newEntries);
  };

  const fetchGstAvailable = async (billingFirm: string) => {
    try {
      const response = await axios.get(`${backendUrl}/api/gst-available/${billingFirm}`);
      setGstAvailable(response.data.gst_available === 'Yes');
    } catch (error) {
      console.error('Error fetching GST availability:', error);
    }
  };

  const calculateTotalAmount = (entry: BalanceEntry): number => {
    return entry.basicAmount + entry.taxableClaim + entry.cgst + entry.sgst + entry.igst + entry.nonTaxableClaim;
  };

  const handleSave = async () => {
    try {
      for (const entry of entries) {
        if (entry.invoiceNo) {
          await axios.post(`${backendUrl}/api/opening-invoices`, {
            ...entry,
            date: entry.invoiceDate
          });
        }
      }
      alert('Saved successfully');
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleFilter = () => {
    fetchData();
  };

  const filteredListEntries = listEntries.filter(entry => {
    const matchesBillingFirm = selectedBillingFirm ? entry.Billing_Firm === selectedBillingFirm : true;
    const matchesClient = selectedClient ? entry.Client === selectedClient : true;
    return matchesBillingFirm && matchesClient;
  });

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
                    {billingFirms.map((firm, idx) => (
                      <option key={idx} value={firm}>{firm}</option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.invoiceNo}
                    onChange={(e) => handleInputChange(index, 'invoiceNo', `OB-${e.target.value.replace('OB-', '')}`)}
                    placeholder="OB-"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="date"
                    className="w-full p-1 border rounded"
                    value={entry.invoiceDate}
                    onChange={(e) => handleInputChange(index, 'invoiceDate', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <select
                    className="w-full p-1 border rounded"
                    value={entry.clientName}
                    onChange={(e) => handleInputChange(index, 'clientName', e.target.value)}
                  >
                    <option value="">Select</option>
                    {clients.map((client, idx) => (
                      <option key={idx} value={client}>{client}</option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.basicAmount === 0 ? '' : entry.basicAmount}
                    onChange={(e) => handleInputChange(index, 'basicAmount', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.taxableClaim === 0 ? '' : entry.taxableClaim}
                    onChange={(e) => handleInputChange(index, 'taxableClaim', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.cgst === 0 ? '' : entry.cgst}
                    onChange={(e) => handleInputChange(index, 'cgst', e.target.value)}
                    disabled={gstAvailable}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.sgst === 0 ? '' : entry.sgst}
                    onChange={(e) => handleInputChange(index, 'sgst', e.target.value)}
                    disabled={gstAvailable}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.igst === 0 ? '' : entry.igst}
                    onChange={(e) => handleInputChange(index, 'igst', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.nonTaxableClaim === 0 ? '' : entry.nonTaxableClaim}
                    onChange={(e) => handleInputChange(index, 'nonTaxableClaim', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={entry.totalAmount === 0 ? '' : entry.totalAmount}
                    onChange={(e) => handleInputChange(index, 'totalAmount', e.target.value)}
                    disabled
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
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 overflow-x-auto">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Billing Profile</label>
            <select
              className="p-2 border rounded min-w-[200px]"
              value={selectedBillingFirm}
              onChange={(e) => setSelectedBillingFirm(e.target.value)}
            >
              <option value="">Select Billing...</option>
              {billingFirms.map((firm, idx) => (
                <option key={idx} value={firm}>{firm}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Client</label>
            <select
              className="p-2 border rounded min-w-[200px]"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="">Select client</option>
              {clients.map((client, idx) => (
                <option key={idx} value={client}>{client}</option>
              ))}
            </select>
          </div>
        </div>
        {/* <div className="flex gap-2 mt-4 md:mt-0 md:ml-auto">
          <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded">List</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Export</button>
        </div> */}
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
            </tr>
          </thead>
          <tbody>
            {filteredListEntries.map((entry, index) => (
              <tr key={index}>
                <td className="border p-2">{formatDate(entry.Date)}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpeningOutstandingBalances;
