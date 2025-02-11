import { useState } from 'react';
import logo from "../assets/newfavicon.png"
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Clock,
  Calendar,
  FileText,
  PenTool,
  Users,
  FileSpreadsheet,
  BookOpen,
  FileBarChart,
  Settings,
  ChevronDown,
  LogOut
} from 'lucide-react';

// Import Dashboard Components
import ServiceDashboard from '../components/dashboards/ServiceDashboard';
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard';
import ClientDashboard from '../components/dashboards/ClientDashboard';
import FinancialDashboard from '../components/dashboards/FinancialDashboard';

// Import Service Components
import AllServices from '../components/services/AllServices';
import ServicesTriggeredButNotAlloted from '../components/services/ServicesTriggeredButNotAlloted';

// Import Timesheet Components
import AddTimesheet from '../components/timesheet/AddTimesheet';
import TimesheetList from '../components/timesheet/TimesheetList';

// Import Other Components
import Appointment from '../components/appointment/Appointment';
import DocumentManagement from '../components/documents/DocumentManagement';
import DigitalSignature from '../components/signature/DigitalSignature';
import Leaves from '../components/leaves/Leaves';
import Notice from '../components/notice/Notice';
import Claims from '../components/claims/Claims';

// Import Financial Components
import Invoice from '../components/financial/Invoice';
import Receipt from '../components/financial/Receipt';
import TdsReconciliation from '../components/financial/TdsReconciliation';

// Import Resource Components
import KnowledgeBase from '../components/resources/KnowledgeBase';
import Library from '../components/resources/Library';

// Import Report Components
import ClientReport from '../components/reports/ClientReport';
import FinancialReport from '../components/reports/FinancialReport';
import ServiceReport from '../components/reports/ServiceReport';
import StaffReport from '../components/reports/StaffReport';

// Import Other Components
import IcaiFormats from '../components/icai/IcaiFormats';
import Campaign from '../components/campaign/Campaign';
import Employees from '../components/masters/Employees';
import Clients from '../components/masters/Clients';

const Dashboard = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    dashboard: true,
    services: false,
    timesheet: false,
    financial: false,
    resources: false,
    reports: false,
    masters: false
  });

  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white overflow-y-auto">
        <div className="p-4 flex items-center gap-3 space-x-2">
          <img src={logo} alt="" className='h-8 w-8'/>
          <span className="text-xl font-bold">Hiranandani</span>
        </div>

        <nav className="mt-4">
          {/* Dashboard Menu */}
          <div>
            <button
              onClick={() => toggleMenu('dashboard')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${
                isActive('/dashboard') ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform ${openMenus.dashboard ? 'rotate-180' : ''}`} />
            </button>
            {openMenus.dashboard && (
              <div className="bg-gray-800 pl-8">
                <Link to="/dashboard/service" className="block py-2 px-4 hover:bg-gray-700">
                  Service Dashboard
                </Link>
                <Link to="/dashboard/employee" className="block py-2 px-4 hover:bg-gray-700">
                  Employee Dashboard
                </Link>
                <Link to="/dashboard/client" className="block py-2 px-4 hover:bg-gray-700">
                  Client Dashboard
                </Link>
                <Link to="/dashboard/financial" className="block py-2 px-4 hover:bg-gray-700">
                  Financial Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Services Menu */}
          <div>
            <button
              onClick={() => toggleMenu('services')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${
                isActive('/services') ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5" />
                <span>Services</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform ${openMenus.services ? 'rotate-180' : ''}`} />
            </button>
            {openMenus.services && (
              <div className="bg-gray-800 pl-8">
                <Link to="/dashboard/services/all-services" className="block py-2 px-4 hover:bg-gray-700">
                  All Services
                </Link>
                <Link to="/dashboard/services/triggered-but-not-alloted" className="block py-2 px-4 hover:bg-gray-700">
                  Triggered but Not Alloted
                </Link>
                
              </div>
            )}
          </div>

          {/* Timesheet Menu */}
          <div>
            <button
              onClick={() => toggleMenu('timesheet')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${
                isActive('/timesheet') ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Timesheet</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform ${openMenus.timesheet ? 'rotate-180' : ''}`} />
            </button>
            {openMenus.timesheet && (
              <div className="bg-gray-800 pl-8">
                <Link to="/dashboard/timesheet/add" className="block py-2 px-4 hover:bg-gray-700">
                  Add Timesheet
                </Link>
                <Link to="/dashboard/timesheet/list" className="block py-2 px-4 hover:bg-gray-700">
                  Timesheet List
                </Link>
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          <Link to="/dashboard/appointment" className="flex items-center space-x-2 p-4 hover:bg-gray-800">
            <Calendar className="h-5 w-5" />
            <span>Appointment</span>
          </Link>

          <Link to="/dashboard/documents" className="flex items-center space-x-2 p-4 hover:bg-gray-800">
            <FileText className="h-5 w-5" />
            <span>Document Management</span>
          </Link>

          <Link to="/dashboard/signature" className="flex items-center space-x-2 p-4 hover:bg-gray-800">
            <PenTool className="h-5 w-5" />
            <span>Digital Signature</span>
          </Link>

          <Link to="/dashboard/leaves" className="flex items-center space-x-2 p-4 hover:bg-gray-800">
            <Users className="h-5 w-5" />
            <span>Leaves</span>
          </Link>

          <Link to="/dashboard/notice" className="flex items-center space-x-2 p-4 hover:bg-gray-800">
            <FileText className="h-5 w-5" />
            <span>Notice</span>
          </Link>

          <Link to="/dashboard/claims" className="flex items-center space-x-2 p-4 hover:bg-gray-800">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Claims</span>
          </Link>

          {/* Financial Menu */}
          <div>
            <button
              onClick={() => toggleMenu('financial')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${
                isActive('/financial') ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5" />
                <span>Financial</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform ${openMenus.financial ? 'rotate-180' : ''}`} />
            </button>
            {openMenus.financial && (
              <div className="bg-gray-800 pl-8">
                <Link to="/dashboard/financial/invoice" className="block py-2 px-4 hover:bg-gray-700">
                  Invoice
                </Link>
                <Link to="/dashboard/financial/receipt" className="block py-2 px-4 hover:bg-gray-700">
                  Receipt
                </Link>
                <Link to="/dashboard/financial/tds" className="block py-2 px-4 hover:bg-gray-700">
                  TDS Reconciliation
                </Link>
              </div>
            )}
          </div>

          {/* Resources Menu */}
          <div>
            <button
              onClick={() => toggleMenu('resources')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${
                isActive('/resources') ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Resources</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform ${openMenus.resources ? 'rotate-180' : ''}`} />
            </button>
            {openMenus.resources && (
              <div className="bg-gray-800 pl-8">
                <Link to="/dashboard/resources/knowledge" className="block py-2 px-4 hover:bg-gray-700">
                  Knowledge Base
                </Link>
                <Link to="/dashboard/resources/library" className="block py-2 px-4 hover:bg-gray-700">
                  Library
                </Link>
              </div>
            )}
          </div>

          {/* Reports Menu */}
          <div>
            <button
              onClick={() => toggleMenu('reports')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${
                isActive('/reports') ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileBarChart className="h-5 w-5" />
                <span>Reports</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform ${openMenus.reports ? 'rotate-180' : ''}`} />
            </button>
            {openMenus.reports && (
              <div className="bg-gray-800 pl-8">
                <Link to="/dashboard/reports/client" className="block py-2 px-4 hover:bg-gray-700">
                  Client Report
                </Link>
                <Link to="/dashboard/reports/financial" className="block py-2 px-4 hover:bg-gray-700">
                  Financial Reports
                </Link>
                <Link to="/dashboard/reports/service" className="block py-2 px-4 hover:bg-gray-700">
                  Service Report
                </Link>
                <Link to="/dashboard/reports/staff" className="block py-2 px-4 hover:bg-gray-700">
                  Staff Report
                </Link>
              </div>
            )}
          </div>

          <Link to="/dashboard/icai" className="flex items-center space-x-2 p-4 hover:bg-gray-800">
            <FileText className="h-5 w-5" />
            <span>ICAI Formats and Letters</span>
          </Link>

          {/* Masters Menu */}
          <div>
            <button
              onClick={() => toggleMenu('masters')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${
                isActive('/masters') ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Masters</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform ${openMenus.masters ? 'rotate-180' : ''}`} />
            </button>
            {openMenus.masters && (
              <div className="bg-gray-800 pl-8">
                <Link to="/dashboard/masters/employees" className="block py-2 px-4 hover:bg-gray-700">
                  Employees
                </Link>
                <Link to="/dashboard/masters/clients" className="block py-2 px-4 hover:bg-gray-700">
                  Clients
                </Link>
              </div>
            )}
          </div>

          <Link to="/dashboard/campaign" className="flex items-center space-x-2 p-4 hover:bg-gray-800">
            <FileBarChart className="h-5 w-5" />
            <span>Campaign</span>
          </Link>

          {/* Logout */}
          <Link to="/login" className="flex items-center space-x-2 p-4 hover:bg-gray-800 mt-4">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/service" replace />} />
          
          {/* Dashboard Routes */}
          <Route path="service" element={<ServiceDashboard />} />
          <Route path="employee" element={<EmployeeDashboard />} />
          <Route path="client" element={<ClientDashboard />} />
          <Route path="financial" element={<FinancialDashboard />} />
          
          {/* Services Routes */}
          <Route path="services/all-services" element={<AllServices />} />
          <Route path="services/triggered-but-not-alloted" element={<ServicesTriggeredButNotAlloted />} />
          
          {/* Timesheet Routes */}
          <Route path="timesheet/add" element={<AddTimesheet />} />
          <Route path="timesheet/list" element={<TimesheetList />} />
          
          {/* Other Routes */}
          <Route path="appointment" element={<Appointment />} />
          <Route path="documents" element={<DocumentManagement />} />
          <Route path="signature" element={<DigitalSignature />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="notice" element={<Notice />} />
          <Route path="claims" element={<Claims />} />
          
          {/* Financial Routes */}
          <Route path="financial/invoice" element={<Invoice />} />
          <Route path="financial/receipt" element={<Receipt />} />
          <Route path="financial/tds" element={<TdsReconciliation />} />
          
          {/* Resources Routes */}
          <Route path="resources/knowledge" element={<KnowledgeBase />} />
          <Route path="resources/library" element={<Library />} />
          
          {/* Reports Routes */}
          <Route path="reports/client" element={<ClientReport />} />
          <Route path="reports/financial" element={<FinancialReport />} />
          <Route path="reports/service" element={<ServiceReport />} />
          <Route path="reports/staff" element={<StaffReport />} />
          
          {/* Other Routes */}
          <Route path="icai" element={<IcaiFormats />} />
          <Route path="masters/employees" element={<Employees />} />
          <Route path="masters/clients" element={<Clients />} />
          <Route path="campaign" element={<Campaign />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;