import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Upload } from 'lucide-react';
import axios from 'axios';
import NoticeList from './NoticeList';

interface FormData {
  client_name: string;
  notice_no: string;
  financial_year: string;
  notice_date: string;
  act: string;
  date_of_receipt: string;
  section: string;
  date_submitted: string;
  title: string;
  submission_mode: string;
  assessing_officer: string;
  brief_issues: string;
  hearing_date: string;
  hearing_time: string;
  required_documents: string;
  service_category: string;
  service_name: string;
  letter_of_authority: 'yes' | 'no';
  fees: string;
  document: File | null;
}

interface Client {
  client_name: string;
}

export default function Notice() {
  const [formData, setFormData] = useState<FormData>({
    client_name: '',
    notice_no: '',
    financial_year: '',
    notice_date: '',
    act: '',
    date_of_receipt: '',
    section: '',
    date_submitted: '',
    title: '',
    submission_mode: '',
    assessing_officer: '',
    brief_issues: '',
    hearing_date: '',
    hearing_time: '',
    required_documents: '',
    service_category: '',
    service_name: '',
    letter_of_authority: 'no',
    fees: '',
    document: null,
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    // Fetch client names from the API when the component mounts
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clients');
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setClients(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        document: files[0],
      });
      setFileName(files[0].name); // Set the file name to display
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/notices', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error saving notice:', error);
      alert('Error saving notice');
    }
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the form from submitting
    document.getElementById('noticeUpload')?.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notice</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Client Name <span className="text-red-500">*</span>
          </label>
          <select
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            {clients.map((client, index) => (
              <option key={index} value={client.client_name}>
                {client.client_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Notice No <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="notice_no"
            placeholder="Notice No"
            value={formData.notice_no}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            F.Y. <span className="text-red-500">*</span>
          </label>
          <select
            name="financial_year"
            value={formData.financial_year}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="select">Select</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2020-2021">2020-2021</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2018-2019">2018-2019</option>
            <option value="2017-2018">2017-2018</option>
            <option value="2016-2017">2016-2017</option>
            <option value="2015-2016">2015-2016</option>
            <option value="2014-2015">2014-2015</option>
            <option value="2013-2014">2013-2014</option>
            <option value="2012-2013">2012-2013</option>

          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Notice Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="notice_date"
            value={formData.notice_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Act <span className="text-red-500">*</span>
          </label>
          <select
            name="act"
            value={formData.act}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="act1">Companies Act</option>
            <option value="act2">Customs Act</option>
            <option value="act3">EPF & MP Act</option>
            <option value="act4">ESIC Act</option>
            <option value="act5">Excise Act</option>
            <option value="act6">GST Act</option>
            <option value="act7">IT Act</option>
            <option value="act8">Local Body Tax / Octroi</option>
            <option value="act9">Partnership Act</option>
            <option value="act10">Profession Tax Act</option>
            <option value="act11">RERA</option>
            <option value="act12">Service Tax Act</option>
            <option value="act13">Trust Act</option>
            <option value="act14">VAT Act</option>


          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date of receipt to client <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date_of_receipt"
            value={formData.date_of_receipt}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            u/s. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="section"
            placeholder="u/s."
            value={formData.section}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date submitted to us <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date_submitted"
            value={formData.date_submitted}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Submission Mode <span className="text-red-500">*</span>
          </label>
          <select
            name="submission_mode"
            value={formData.submission_mode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="mode1">Hardcopy - Original</option>
            <option value="mode2">Hardcopy - Photocopy</option>
            <option value="mode3">Email</option>
            <option value="mode4">Whatsapp | Telegram</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Assessing Officer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="assessing_officer"
            placeholder="Assessing Officer"
            value={formData.assessing_officer}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Brief issues of the case <span className="text-red-500">*</span>
          </label>
          <textarea
            name="brief_issues"
            placeholder="Brief Issues of the Case"
            value={formData.brief_issues}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date & Time of hearing <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="hearing_date"
              value={formData.hearing_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              name="hearing_time"
              value={formData.hearing_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Document Required to be Submitted <span className="text-red-500">*</span>
          </label>
          <textarea
            name="required_documents"
            placeholder="Document Required to be Submitted"
            value={formData.required_documents}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Service Main Category <span className="text-red-500">*</span>
          </label>
          <select
            name="service_category"
            value={formData.service_category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="cat1">Representation and Litigation (Corporate)</option>
            <option value="cat2">Representation and Litigation (Non-Corporate)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Service Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="service_name"
            placeholder="Service Name"
            value={formData.service_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Letter of Authority Obtained <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="letter_of_authority"
                value="yes"
                checked={formData.letter_of_authority === 'yes'}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="letter_of_authority"
                value="no"
                checked={formData.letter_of_authority === 'no'}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Notice
          </label>
          <div className="mt-1">
            <input
              type="file"
              id="noticeUpload"
              onChange={handleFileChange}
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <button
              type="button" // Ensure this button does not submit the form
              onClick={handleUploadClick}
              className="w-full px-4 py-2 border-2 border-dashed rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </button>
            {fileName && (
              <p className="text-xs text-gray-500 mt-1">Selected file: {fileName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Fees
          </label>
          <input
            type="number"
            name="fees"
            placeholder="Notice Fees"
            value={formData.fees}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
      <NoticeList />
    </div>
  );
}
