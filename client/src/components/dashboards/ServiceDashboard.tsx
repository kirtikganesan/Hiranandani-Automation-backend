import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const ServiceDashboard = () => {
  const [teamWorkData, setTeamWorkData] = useState({
    labels: ['Services Triggered but Not Allotted', 'Completed Services'],
    datasets: [
      {
        data: [0, 0], // Placeholder values
        backgroundColor: ['#FDE047', '#06B6D4'],
        borderWidth: 0,
      },
    ],
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const [servicesTriggeredResponse, completedServicesResponse] = await Promise.all([
          axios.get('https://hiranandani-automation.onrender.com/api/services-triggered-but-not-allotted-count'),
          axios.get('https://hiranandani-automation.onrender.com/api/single-invoice-count')
        ]);

        const servicesTriggeredCount = servicesTriggeredResponse.data.count;
        const completedServicesCount = completedServicesResponse.data.count;

        setTeamWorkData({
          labels: ['Services Triggered but Not Allotted', 'Completed Services'],
          datasets: [
            {
              data: [servicesTriggeredCount, completedServicesCount],
              backgroundColor: ['#FDE047', '#06B6D4'],
              borderWidth: 0,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalTeamWork = teamWorkData.datasets[0].data.reduce((sum, value) => sum + value, 0);

  return (
    <div className="p-4 md:p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Services</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{totalTeamWork}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Services</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{teamWorkData.datasets[0].data[0]}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Services</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{teamWorkData.datasets[0].data[1]}</p>
        </div>
      </div>

      {/* Team Work Chart */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md relative">
        <h3 className="text-xl font-semibold mb-6">Team Work</h3>
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 relative">
            <Doughnut data={teamWorkData} options={options} />
            
          </div>
          <div className="mt-6 w-full space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></div>
                <span className="text-sm">Services Triggered but Not Allotted</span>
              </div>
              <span className="font-semibold">{teamWorkData.datasets[0].data[0]}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
                <span className="text-sm">Completed Services</span>
              </div>
              <span className="font-semibold">{teamWorkData.datasets[0].data[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDashboard;
