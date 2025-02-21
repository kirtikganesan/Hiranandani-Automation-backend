import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Claim {
  id: number;
  claim_date: string;
  travel_from: string;
  bill_no: string;
  claim_type: string;
  travel_to: string;
  bill_date: string;
  nature_of_claim: string;
  kms: number;
  claim_amount: number;
  particulars: string;
  challan_no: string;
  claim_submitted_for: string;
  bill_upload_path: string;
}

export default function ClaimList() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    // Fetch claims from the API when the component mounts
    const fetchClaims = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/claims');
        setClaims(response.data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Claim List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Claim Date</th>
            <th className="py-2 px-4 border-b">Travel From</th>
            <th className="py-2 px-4 border-b">Bill No.</th>
            <th className="py-2 px-4 border-b">Claim Type</th>
            <th className="py-2 px-4 border-b">Travel To</th>
            <th className="py-2 px-4 border-b">Bill Date</th>
            <th className="py-2 px-4 border-b">Nature of Claim</th>
            <th className="py-2 px-4 border-b">KMS</th>
            <th className="py-2 px-4 border-b">Claim Amount</th>
            <th className="py-2 px-4 border-b">Particulars</th>
            <th className="py-2 px-4 border-b">Challan No.</th>
            <th className="py-2 px-4 border-b">Claim Submitted For</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{claim.id}</td>
              <td className="py-2 px-4 border-b">{formatDate(claim.claim_date)}</td>
              <td className="py-2 px-4 border-b">{claim.travel_from}</td>
              <td className="py-2 px-4 border-b">{claim.bill_no}</td>
              <td className="py-2 px-4 border-b">{claim.claim_type}</td>
              <td className="py-2 px-4 border-b">{claim.travel_to}</td>
              <td className="py-2 px-4 border-b">{formatDate(claim.bill_date)}</td>
              <td className="py-2 px-4 border-b">{claim.nature_of_claim}</td>
              <td className="py-2 px-4 border-b">{claim.kms}</td>
              <td className="py-2 px-4 border-b">{claim.claim_amount}</td>
              <td className="py-2 px-4 border-b">{claim.particulars}</td>
              <td className="py-2 px-4 border-b">{claim.challan_no}</td>
              <td className="py-2 px-4 border-b">{claim.claim_submitted_for}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
