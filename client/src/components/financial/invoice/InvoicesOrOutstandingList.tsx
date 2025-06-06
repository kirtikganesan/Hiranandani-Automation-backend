import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import DeleteModal from './../../services/DeleteModal'; // Assuming DeleteModal is in the same directory

interface Client {
  client_name: string;
}

interface BillingFirm {
  billing_firm: string;
}

interface Invoice {
  id: number;
  Date: string;
  Invoice_No: string;
  Client: string;
  Gross_Amount: number;
  Discount_Amount: number;
  Service_Amount: number;
  Taxable_Claim_Amount: number;
  Total_Taxable_Amount: number;
  CGST: number;
  SGST: number;
  IGST: number;
  Non_Taxable_Amount: number;
  Total_Bill_Amount: number;
  Outstanding_Amount: number;
  Settled_Amount: number;
  Days_Overdue?: number;
}

const InvoiceList: React.FC = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    client: 'All',
    status: 'all',
    billingFirm: ''
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [billingFirms, setBillingFirms] = useState<BillingFirm[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteReasonModalOpen, setIsDeleteReasonModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Store client names

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch unique clients
    axios.get(`${backendUrl}/api/unique-invoice-clients`).then(response => {
      setClients([{ client_name: 'All' }, ...response.data]);
    }).catch(error => {
      console.error('Error fetching clients:', error);
    });

    // Fetch billing firms
    axios.get(`${backendUrl}/api/financial-billing-firms`).then(response => {
      setBillingFirms(response.data);
    }).catch(error => {
      console.error('Error fetching billing firms:', error);
    });
  }, []);

  const fetchInvoices = () => {
    axios.get(`${backendUrl}/api/invoices`, { params: filters }).then(response => {
      const updatedInvoices = response.data.map((invoice: Invoice) => {
        const today = new Date();
        const invoiceDate = new Date(invoice.Date);

        // Ensure both are valid Date objects
        if (!isNaN(today.getTime()) && !isNaN(invoiceDate.getTime())) {
          const timeDifference = today.getTime() - invoiceDate.getTime();
          const daysOverdue = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          return { ...invoice, Days_Overdue: daysOverdue };
        }

        // If invoiceDate is invalid, return the invoice without Days_Overdue
        return invoice;
      });
      setInvoices(updatedInvoices);
    }).catch(error => {
      console.error('Error fetching invoices:', error);
    });
  };

  const handleFilterClick = () => {
    fetchInvoices();
  };

  const handleResetClick = () => {
    setFilters({
      startDate: '',
      endDate: '',
      client: 'All',
      status: 'all',
      billingFirm: ''
    });
    setInvoices([]); // Clear the invoices list
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(invoices.map(item => ({
      ...item,
      Date: formatDate(item.Date)
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
    XLSX.writeFile(workbook, 'Invoices.xlsx');
  };

  const handleEdit = (invoice: Invoice) => {
    setSelectedInvoice({
      ...invoice,
      Date: invoice.Date.split('T')[0] // Format the date to YYYY-MM-DD
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (selectedInvoice) {
      axios.put(`${backendUrl}/api/invoices/${selectedInvoice.id}`, selectedInvoice)
        .then(response => {
          setInvoices(invoices.map(invoice =>
            invoice.id === selectedInvoice.id ? response.data : invoice
          ));
          setIsEditModalOpen(false);
        })
        .catch(error => {
          console.error('Error updating invoice:', error);
        });
    }
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleDelete = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setDeleteReason(''); // Reset the reason field
    setIsDeleteReasonModalOpen(true); // Open the reason modal first
  };

  const confirmDeleteReason = () => {
    if (deleteReason.trim() !== '') {
      setIsDeleteReasonModalOpen(false); // Close the reason modal
      setIsDeleteConfirmModalOpen(true); // Open the confirmation modal
    } else {
      alert('Reason is required');
    }
  };

  const confirmDelete = () => {
    if (selectedInvoice) {
      axios.delete(`${backendUrl}/api/invoices/${selectedInvoice.id}`, {
        data: { reason: deleteReason }
      })
        .then(() => {
          setInvoices(invoices.filter(invoice => invoice.id !== selectedInvoice.id));
          setIsDeleteConfirmModalOpen(false);
        })
        .catch(error => {
          console.error('Error deleting invoice:', error);
        });
    }
  };

  const cancelDelete = () => {
    setIsDeleteReasonModalOpen(false);
    setIsDeleteConfirmModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Invoices/Outstanding List</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.startDate}
            onChange={(e) => setFilters({...filters, startDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.endDate}
            onChange={(e) => setFilters({...filters, endDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clients
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.client}
            onChange={(e) => setFilters({...filters, client: e.target.value})}
          >
            {clients.map((client, index) => (
              <option key={index} value={client.client_name}>
                {client.client_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Billing Firm
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.billingFirm}
            onChange={(e) => setFilters({...filters, billingFirm: e.target.value})}
          >
            <option value="">Select</option>
            {billingFirms.map((firm, index) => (
              <option key={index} value={firm.billing_firm}>
                {firm.billing_firm}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            checked={filters.status === 'all'}
            onChange={() => setFilters({...filters, status: 'all'})}
          />
          <span className="ml-2">All</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            checked={filters.status === 'outstanding'}
            onChange={() => setFilters({...filters, status: 'outstanding'})}
          />
          <span className="ml-2">Outstanding</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            checked={filters.status === 'settled'}
            onChange={() => setFilters({...filters, status: 'settled'})}
          />
          <span className="ml-2">Settled</span>
        </label>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleFilterClick}
        >
          Filter
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          onClick={handleResetClick}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Invoice No</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Gross Amount</th>
              <th className="px-4 py-2 text-left">Disc. Amt.</th>
              <th className="px-4 py-2 text-left">Service Amount</th>
              <th className="px-4 py-2 text-left">Tax Claim Amt.</th>
              <th className="px-4 py-2 text-left">Total Tax Amt.</th>
              <th className="px-4 py-2 text-left">CGST</th>
              <th className="px-4 py-2 text-left">SGST</th>
              <th className="px-4 py-2 text-left">IGST</th>
              <th className="px-4 py-2 text-left">Non Tax Claim Amt</th>
              <th className="px-4 py-2 text-left">Total Bill Amount</th>
              <th className="px-4 py-2 text-left">Outstanding Amount</th>
              <th className="px-4 py-2 text-left">Settled Amount</th>
              <th className="px-4 py-2 text-left">Days O/s</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-300">
                <td className="px-4 py-2">{formatDate(item.Date)}</td>
                <td className="px-4 py-2">{item.Invoice_No}</td>
                <td className="px-4 py-2">{item.Client}</td>
                <td className="px-4 py-2">{item.Gross_Amount}</td>
                <td className="px-4 py-2">{item.Discount_Amount}</td>
                <td className="px-4 py-2">{item.Service_Amount}</td>
                <td className="px-4 py-2">{item.Taxable_Claim_Amount}</td>
                <td className="px-4 py-2">{item.Total_Taxable_Amount}</td>
                <td className="px-4 py-2">{item.CGST}</td>
                <td className="px-4 py-2">{item.SGST}</td>
                <td className="px-4 py-2">{item.IGST}</td>
                <td className="px-4 py-2">{item.Non_Taxable_Amount}</td>
                <td className="px-4 py-2">{item.Total_Bill_Amount}</td>
                <td className="px-4 py-2">{item.Outstanding_Amount}</td>
                <td className="px-4 py-2">{item.Settled_Amount}</td>
                <td className="px-4 py-2">{item.Days_Overdue}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Edit Invoice</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Date}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Date: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Invoice_No}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Invoice_No: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Client}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Client: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gross Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Gross_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Gross_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Discount_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Discount_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Service_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Service_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Taxable Claim Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Taxable_Claim_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Taxable_Claim_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Taxable Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Total_Taxable_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Total_Taxable_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">CGST</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.CGST}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, CGST: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">SGST</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.SGST}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, SGST: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">IGST</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.IGST}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, IGST: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Non Taxable Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Non_Taxable_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Non_Taxable_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Bill Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Total_Bill_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Total_Bill_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Outstanding_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Outstanding_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Settled Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedInvoice.Settled_Amount}
                onChange={(e) => setSelectedInvoice({...selectedInvoice, Settled_Amount: parseFloat(e.target.value)})}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reason Modal */}
      <DeleteModal
        isOpen={isDeleteReasonModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDeleteReason}
        reasonInput={
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Enter Reason"
            />
          </div>
        }
      />

      {/* Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        reasonInput={
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Are you sure you want to delete this invoice?</p>
          </div>
        }
      />
    </div>
  );
};

export default InvoiceList;
