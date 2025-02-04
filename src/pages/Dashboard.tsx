import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, HelpCircle, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import ServiceDashboard from '../components/ServiceDashboard';
import EmployeeDashboard from '../components/EmployeeDashboard';
import ClientDashboard from '../components/ClientDashboard';
import FinancialDashboard from '../components/FinancialDashboard';
import logo from "../assets/newfavicon.png"

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to service dashboard if at root dashboard path
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      navigate('/dashboard/service');
    }

    // Handle responsive sidebar
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname, navigate]);

  const getCurrentTitle = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'service':
        return 'Service Dashboard';
      case 'employee':
        return 'Employee Dashboard';
      case 'client':
        return 'Client Dashboard';
      case 'financial':
        return 'Financial Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-4">
          <div className="flex items-center justify-center mb-8 gap-4">
            <img src={logo} alt="" className='w-8 h-8'/>
            <span className="text-xl font-semibold">Hiranandani</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-blue-700 md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav>
            {/* Dashboard Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => setDashboardMenuOpen(!dashboardMenuOpen)}
                className="w-full flex items-center justify-start gap-6 px-4 py-2 text-gray-300 hover:bg-blue-700 rounded-md"
              >
                <div className="flex items-center">
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  <span>Dashboard</span>
                </div>
                {dashboardMenuOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {dashboardMenuOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link
                    to="/dashboard/service"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 rounded-md"
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    Service Dashboard
                  </Link>
                  <Link
                    to="/dashboard/employee"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 rounded-md"
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    Employee Dashboard
                  </Link>
                  <Link
                    to="/dashboard/client"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 rounded-md"
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    Client Dashboard
                  </Link>
                  <Link
                    to="/dashboard/financial"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 rounded-md"
                    onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  >
                    Financial Dashboard
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-200 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800 ml-2 md:ml-0">{getCurrentTitle()}</h1>
            </div>
            <div className="flex items-center space-x-4">
              
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/service" replace />} />
          <Route path="service" element={<ServiceDashboard />} />
          <Route path="employee" element={<EmployeeDashboard />} />
          <Route path="client" element={<ClientDashboard />} />
          <Route path="financial" element={<FinancialDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;