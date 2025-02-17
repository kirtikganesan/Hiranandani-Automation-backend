import React, { useState } from 'react';

const IcaiFormats = () => {
  const [selectedLetter, setSelectedLetter] = useState('');
  
  const letters = [
    "Unqualified Review on Interim Financial Information consists of complete Set of General purpose FS Prepared in Accordance with a FRF as per SRE 241",
    "Accountant's Report on Compilation of unaudited FS (when such FS Comply with the Generally Accepted Accounting Practices in India) as per SRS 4410",
    "Adverse Report for a Departure from an Accounting Standard",
    "Audit Report on Audit of a balance sheet as per SA 805",
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-navy">ICAI Format Letters</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="space-y-4">
          <label className="block text-base font-medium text-gray-700">
            Letter<span className="text-error">*</span>
          </label>
          <select
            value={selectedLetter}
            onChange={(e) => setSelectedLetter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          >
            <option value="">Select letter format</option>
            {letters.map((letter, index) => (
              <option key={index} value={`letter-${index}`}>
                {letter}
              </option>
            ))}
          </select>
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
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};
export default IcaiFormats;