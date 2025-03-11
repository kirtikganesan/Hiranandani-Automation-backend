import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Notice {
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
  documents_required: string;
  service_category: string;
  service_name: string;
  letter_of_authority: string;
  fees: string;
  document_path: string;
}

export default function NoticeList() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch notices from the API when the component mounts
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notices');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Notice List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className="py-2 px-4 border-b">Client Name</th>
            <th className="py-2 px-4 border-b">Notice No</th>
            <th className="py-2 px-4 border-b">Financial Year</th>
            <th className="py-2 px-4 border-b">Notice Date</th>
            <th className="py-2 px-4 border-b">Act</th>
            <th className="py-2 px-4 border-b">Date of Receipt</th>
            <th className="py-2 px-4 border-b">Section</th>
            <th className="py-2 px-4 border-b">Date Submitted</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Submission Mode</th>
            <th className="py-2 px-4 border-b">Assessing Officer</th>
            <th className="py-2 px-4 border-b">Brief Issues</th>
            <th className="py-2 px-4 border-b">Hearing Date</th>
            <th className="py-2 px-4 border-b">Hearing Time</th>
            <th className="py-2 px-4 border-b">Documents Required</th>
            <th className="py-2 px-4 border-b">Service Category</th>
            <th className="py-2 px-4 border-b">Service Name</th>
            <th className="py-2 px-4 border-b">Letter of Authority</th>
            <th className="py-2 px-4 border-b">Fees</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{notice.client_name}</td>
              <td className="py-2 px-4 border-b">{notice.notice_no}</td>
              <td className="py-2 px-4 border-b">{notice.financial_year}</td>
              <td className="py-2 px-4 border-b">{formatDate(notice.notice_date)}</td>
              <td className="py-2 px-4 border-b">{notice.act}</td>
              <td className="py-2 px-4 border-b">{formatDate(notice.date_of_receipt)}</td>
              <td className="py-2 px-4 border-b">{notice.section}</td>
              <td className="py-2 px-4 border-b">{formatDate(notice.date_submitted)}</td>
              <td className="py-2 px-4 border-b">{notice.title}</td>
              <td className="py-2 px-4 border-b">{notice.submission_mode}</td>
              <td className="py-2 px-4 border-b">{notice.assessing_officer}</td>
              <td className="py-2 px-4 border-b">{notice.brief_issues}</td>
              <td className="py-2 px-4 border-b">{formatDate(notice.hearing_date)}</td>
              <td className="py-2 px-4 border-b">{notice.hearing_time}</td>
              <td className="py-2 px-4 border-b">{notice.documents_required}</td>
              <td className="py-2 px-4 border-b">{notice.service_category}</td>
              <td className="py-2 px-4 border-b">{notice.service_name}</td>
              <td className="py-2 px-4 border-b">{notice.letter_of_authority}</td>
              <td className="py-2 px-4 border-b">{notice.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
