import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ServiceDashboard = () => {
  const ownWorkData = {
    labels: ['Allotted but not started', 'Started but not completed', 'Completed but UDIN pending'],
    datasets: [
      {
        data: [8, 12, 5],
        backgroundColor: ['#4B5563', '#6B7280', '#9CA3AF'],
        borderWidth: 0,
      },
    ],
  };

  const teamWorkData = {
    labels: [
      'Service triggered but not allotted',
      'Allotted but not started',
      'Started but not completed',
      'Completed but UDIN pending',
      'Completed but not billed',
    ],
    datasets: [
      {
        data: [865, 106, 27, 0, 1095],
        backgroundColor: ['#FDE047', '#FDE047', '#FDE047', '#4B5563', '#06B6D4'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="p-4 md:p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Services</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">2,093</p>
          <div className="mt-2 text-sm text-green-600">+15% from last month</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Services</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">148</p>
          <div className="mt-2 text-sm text-green-600">+8% from last month</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Services</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">1,095</p>
          <div className="mt-2 text-sm text-green-600">+12% from last month</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending UDIN</h3>
          <p className="text-2xl md:text-3xl font-bold text-yellow-600">5</p>
          <div className="mt-2 text-sm text-yellow-600">Action required</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Own Work */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-6">Own Work</h3>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 relative">
              <Doughnut data={ownWorkData} options={options} />
            </div>
            <div className="mt-6 w-full space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                  <span className="text-sm">Allotted but not started</span>
                </div>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  <span className="text-sm">Started but not completed</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-sm">Completed but UDIN pending</span>
                </div>
                <span className="font-semibold">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Work */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-6">Team Work</h3>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 relative">
              <Doughnut data={teamWorkData} options={options} />
            </div>
            <div className="mt-6 w-full space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></div>
                  <span className="text-sm">Service triggered but not allotted</span>
                </div>
                <span className="font-semibold">865</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></div>
                  <span className="text-sm">Allotted but not started</span>
                </div>
                <span className="font-semibold">106</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></div>
                  <span className="text-sm">Started but not completed</span>
                </div>
                <span className="font-semibold">27</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  <span className="text-sm">Completed but UDIN pending</span>
                </div>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
                  <span className="text-sm">Completed but not billed</span>
                </div>
                <span className="font-semibold">1,095</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDashboard;