import React, { useState, useEffect } from 'react';

interface DummyData {
  clientName: string;
  totalTimeSpent: string;
  totalEmployeeCost: string;
  billableClaims: string;
  nonBillableClaims: string;
  totalCostToFirm: string;
  invoiceAmount: string;
  profitability: string;
  unbilledHours: string;
}

const AllClientProfitabilityReport = () => {
  const [branch, setBranch] = useState('head-office');
  const [displayType, setDisplayType] = useState('both');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dummyData, setDummyData] = useState<DummyData[]>([]);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const thresholdDate = new Date('2024-11-27');

    if (start <= thresholdDate && end > start) {
      setDummyData([
        {
          clientName: 'Dayal Raghuwanshi (Dayal Sukhumal Raghuwanshi)',
          totalTimeSpent: '01:30',
          totalEmployeeCost: '0',
          billableClaims: '0',
          nonBillableClaims: '0',
          totalCostToFirm: '0',
          invoiceAmount: '20000',
          profitability: '20000',
          unbilledHours: '00:00'
        },
        {
          clientName: 'Praveen Hazari (Praveen Tirathdas Hazari)(PARAS NOVELTY THE PARTY SHOP)',
          totalTimeSpent: '01:15',
          totalEmployeeCost: '0',
          billableClaims: '0',
          nonBillableClaims: '0',
          totalCostToFirm: '0',
          invoiceAmount: '7000',
          profitability: '7000',
          unbilledHours: '00:00'
        }
      ]);
    } else {
      setDummyData([]);
    }
  }, [startDate, endDate]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">All Client Profitability Report</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="head-office">Head Office</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Display Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="displayType"
                  value="completed"
                  checked={displayType === 'completed'}
                  onChange={(e) => setDisplayType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Completed</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="displayType"
                  value="incomplete"
                  checked={displayType === 'incomplete'}
                  onChange={(e) => setDisplayType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Incomplete</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="displayType"
                  value="both"
                  checked={displayType === 'both'}
                  onChange={(e) => setDisplayType(e.target.value)}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span>Both</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              From Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              To Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            List
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-success hover:bg-success-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success"
          >
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Client</th>
              <th className="px-6 py-3 text-left">Total Time Spent (HOURS)</th>
              <th className="px-6 py-3 text-left">Total Employee Cost</th>
              <th className="px-6 py-3 text-left">Claims / Expenses Billable</th>
              <th className="px-6 py-3 text-left">Claims / Expenses Non-billable</th>
              <th className="px-6 py-3 text-left">Total Cost to Firm (Employee Cost + Claim)</th>
              <th className="px-6 py-3 text-left">Invoice Amount (Basic Fees + Billable claims)</th>
              <th className="px-6 py-3 text-left">Profitability (Fees billed - Total cost to firm)</th>
              <th className="px-6 py-3 text-left">Unbilled Hours</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.length > 0 ? (
              dummyData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.totalTimeSpent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.totalEmployeeCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.billableClaims}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nonBillableClaims}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.totalCostToFirm}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.invoiceAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.profitability}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unbilledHours}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClientProfitabilityReport;
