import React from 'react';

interface DashboardPlaceholderProps {
  title: string;
}

const DashboardPlaceholder: React.FC<DashboardPlaceholderProps> = ({ title }) => {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Clients</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">256</p>
          <div className="mt-2 text-sm text-green-600">+12% from last month</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Projects</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">48</p>
          <div className="mt-2 text-sm text-green-600">+5% from last month</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">$52.5K</p>
          <div className="mt-2 text-sm text-green-600">+8% from last month</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Tasks Completed</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">189</p>
          <div className="mt-2 text-sm text-green-600">+15% from last month</div>
        </div>
      </div>

      {/* Recent Activity and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">New client file uploaded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Tax filing deadline</p>
                  <p className="text-xs text-gray-500">Tomorrow at 5:00 PM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPlaceholder;