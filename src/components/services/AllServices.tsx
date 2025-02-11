import { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  id: number;
  services: string;
  alloted_to: string;
  due_date: string;
  status: string;
  udin: string;
}

const AllServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/all-services")
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Services</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Service</th>
              <th className="px-4 py-2 border">Alloted To</th>
              <th className="px-4 py-2 border">Due Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">UDIN</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="text-center hover:bg-gray-100">
                <td className="px-4 py-2 border">{service.id}</td>
                <td className="px-4 py-2 border">{service.services}</td>
                <td className="px-4 py-2 border">{service.alloted_to}</td>
                <td className="px-4 py-2 border">{formatDate(service.due_date)}</td>
                <td className={`px-4 py-2 border ${service.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                  {service.status}
                </td>
                <td className="px-4 py-2 border">{service.udin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllServices;
