import React, { useState, ChangeEvent, useEffect } from 'react';

interface IcaiData {
  letterName: string;
  clientName: string;
  financialYear: string;
  noteX: string;
  frn: string;
  firmName: string;
  personForSign: string;
  dateOfSignature: string;
  placeOfSignature: string;
  designation: string;
  udinNumber: string;
}

const IcaiFormats = () => {
  const [selectedLetter, setSelectedLetter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<IcaiData>({
    letterName: '',
    clientName: '',
    financialYear: '',
    noteX: '',
    frn: '',
    firmName: '',
    personForSign: '',
    dateOfSignature: '',
    placeOfSignature: '',
    designation: '',
    udinNumber: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [tableData, setTableData] = useState<IcaiData[]>([]);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  const letters = [
    "Unqualified Review on Interim Financial Information consists of complete Set of General purpose FS Prepared in Accordance with a FRF as per SRE 241",
    "Accountant's Report on Compilation of unaudited FS (when such FS Comply with the Generally Accepted Accounting Practices in India) as per SRS 4410",
    "Adverse Report for a Departure from an Accounting Standard",
    "Audit Report on Audit of a balance sheet as per SA 805",
    "Audit Report on Audit of a statement of Cash Receipt and Disbursement as per SA 805",
    "Auditor's Report on Summary Financial Statements as per SA 805",
    "Certificate of Financial Statements: Non-Audit Case",
    "Certificate of Financial Statements: Audit Case",
    "Consent for adding CA Report",
    "Consent for ITR Report",
    "DSC Authority Letter"
  ];

  const handleGenerateClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setSelectedLetter('');
    setFormData({
      letterName: '',
      clientName: '',
      financialYear: '',
      noteX: '',
      frn: '',
      firmName: '',
      personForSign: '',
      dateOfSignature: '',
      placeOfSignature: '',
      designation: '',
      udinNumber: '',
    });
    setShowPopup(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    const dataToSave = {
      ...formData,
      letterName: letters[parseInt(selectedLetter.split('-')[1])],
    };

    fetch('http://localhost:5000/api/save-icai-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    })
    .then(response => response.json())
    .then(data => {
      // Show popup
      setShowPopup(true);
      // Fetch updated data
      fetchTableData();
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
  };

  const fetchTableData = () => {
    fetch(`http://localhost:5000/api/icai-data?letterName=${letters[parseInt(selectedLetter.split('-')[1])]}`)
      .then(response => response.json())
      .then((data: IcaiData[]) => {
        setTableData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    if (showForm) {
      fetchTableData();
    }
  }, [showForm, selectedLetter]);

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
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={handleGenerateClick}
          >
            Generate
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-2xl font-bold mb-4">
            {letters[parseInt(selectedLetter.split('-')[1])]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of Client<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Financial Year<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="financialYear"
                value={formData.financialYear}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note X<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="noteX"
                value={formData.noteX}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter detailed note"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                FRN<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="frn"
                value={formData.frn}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="FRN"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of the Firm<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firmName"
                value={formData.firmName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of Person For Sign<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="personForSign"
                value={formData.personForSign}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of signature<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfSignature"
                value={formData.dateOfSignature}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Place of signature<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="placeOfSignature"
                value={formData.placeOfSignature}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Place of signature"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UDIN Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="udinNumber"
                value={formData.udinNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="UDIN Number"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mb-6">
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg font-semibold">Letter saved successfully!</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => setShowPopup(false)}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Letter Name</th>
                  <th className="px-4 py-2 text-left">Client name</th>
                  <th className="px-4 py-2 text-left">Financial year</th>
                  <th className="px-4 py-2 text-left">Note X</th>
                  <th className="px-4 py-2 text-left">FRN</th>
                  <th className="px-4 py-2 text-left">Name of firm</th>
                  <th className="px-4 py-2 text-left">Name of Person For Sign</th>
                  <th className="px-4 py-2 text-left">Date of signature</th>
                  <th className="px-4 py-2 text-left">Place of signature</th>
                  <th className="px-4 py-2 text-left">Designation</th>
                  <th className="px-4 py-2 text-left">UDIN Number</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{item.letterName}</td>
                      <td className="px-4 py-2">{item.clientName}</td>
                      <td className="px-4 py-2">{item.financialYear}</td>
                      <td className="px-4 py-2">{item.noteX}</td>
                      <td className="px-4 py-2">{item.frn}</td>
                      <td className="px-4 py-2">{item.firmName}</td>
                      <td className="px-4 py-2">{item.personForSign}</td>
                      <td className="px-4 py-2">{formatDate(item.dateOfSignature)}</td>
                      <td className="px-4 py-2">{item.placeOfSignature}</td>
                      <td className="px-4 py-2">{item.designation}</td>
                      <td className="px-4 py-2">{item.udinNumber}</td>
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
      )}
    </div>
  );
};

export default IcaiFormats;
