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
import ServiceMainCategory from '../components/services/ServiceMainCategory';
import GstBillingCategories from '../components/services/GstBillingCategories';
import BillingProfile from '../components/services/BillingProfile';
import ModifyServices from '../components/services/ModifyServices';
import OpeningOutstandingBalances from '../components/services/OpeningOutstandingBalances';
import ServicesTriggeredButNotAlloted from '../components/services/ServicesTriggeredButNotAlloted';
import ManualAssignment from '../components/services/ManualAssignment';

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
import SingleInvoice from '../components/financial/invoice/SingleInvoice';
import BulkInvoice from '../components/financial/invoice/BulkInvoice';
import InvoicesOrOutstandingList from '../components/financial/invoice/InvoicesOrOutstandingList';
import BilledButNotReceived from '../components/financial/invoice/BilledButNotReceived';
import CancelledInvoiceList from '../components/financial/invoice/CancelledInvoiceList';
import NonBillableServices from '../components/financial/invoice/NonBillableServices';

import Generate from '../components/financial/receipt/Generate';
import List from '../components/financial/receipt/List';
import AdvanceList from '../components/financial/receipt/AdvanceList';
import CancelledReceiptList from '../components/financial/receipt/CancelledReceiptList';

import TdsReconciliation from '../components/financial/TdsReconciliation';

// Import Resource Components
import KnowledgeBase from '../components/resources/KnowledgeBase';
import Library from '../components/resources/Library';

// Import Report Components
import AllClientProfitabilityReport from '../components/reports/client reports/AllClientProfitabilityReport';
import BirthdayReport from '../components/reports/client reports/BirthdayReport';
import ClientHealthReport from '../components/reports/client reports/ClientHealthReport';
import ClientProfitabilityReport from '../components/reports/client reports/ClientProfitabilityReport';
import ClientwiseWorkPosition from '../components/reports/client reports/ClientwiseWorkPosition';
import ClientListReport from '../components/reports/client reports/ClientListReport';
import DscExpiryReport from '../components/reports/client reports/DscExpiryReport';
import DocumentMovementReport from '../components/reports/client reports/DocumentMovementReport';
import TelephoneList from '../components/reports/client reports/TelephoneList';

import AllClientOutstandingReport from '../components/reports/financial reports/AllClientOutstandingReport';
import AgewiseAnalysisOfOutstandingInvoices from '../components/reports/financial reports/AgewiseAnalysisOfOutstandingInvoices';
import AnalysisOfUnbilledServiceReport from '../components/reports/financial reports/AnalysisOfUnbilledServiceReport';
import ClientLedgerReport from '../components/reports/financial reports/ClientLedgerReport';
import ClaimReport from '../components/reports/financial reports/ClaimReport';
import GstSummaryReport from '../components/reports/financial reports/GstSummaryReport';
import SacCodeSummaryReport from '../components/reports/financial reports/SacCodeSummaryReport';
import TdsReconciliationReport from '../components/reports/financial reports/TdsReconciliationReport';

import ServicewiseReportOfStaffs from '../components/reports/service reports/ServicewiseReportOfStaffs';
import ServicewiseWorkPositionReport from '../components/reports/service reports/ServicewiseWorkPositionReport';
import ServicewiseRevenueAnalysisReport from '../components/reports/service reports/ServicewiseRevenueAnalysisReport';
import UdinReport from '../components/reports/service reports/UdinReport';

import StaffAttendanceReport from '../components/reports/staff reports/StaffAttendanceReport';
import StaffwiseBillingReport from '../components/reports/staff reports/StaffwiseBillingReport';
import StaffLeaveReport from '../components/reports/staff reports/StaffLeaveReport';
import StaffProfitabilityReport from '../components/reports/staff reports/StaffProfitabilityReport';
import StaffOccupancyReport from '../components/reports/staff reports/StaffOccupancyReport';
import TimesheetSummaryReport from '../components/reports/staff reports/TimesheetSummaryReport';


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
    clientReport: false,
    financialReport: false,
    serviceReport: false,
    staffReport: false,
    masters: false,
    invoice: false,   // Invoice menu inside Financial
    receipt: false,   // Receipt menu inside Financial
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
          <img src={logo} alt="" className='h-8 w-8' />
          <span className="text-xl font-bold">Hiranandani</span>
        </div>

        <nav className="mt-4">
          {/* Dashboard Menu */}
          <div>
            <button
              onClick={() => toggleMenu('dashboard')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${isActive('/dashboard') ? 'bg-gray-800' : ''
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
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${isActive('/services') ? 'bg-gray-800' : ''
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
                <Link to="/dashboard/services/service-main-category" className="block py-2 px-4 hover:bg-gray-700">
                  Service Main Category
                </Link>
                <Link to="/dashboard/services/gst-billing-categories" className="block py-2 px-4 hover:bg-gray-700">
                  GST Billing Categories
                </Link>
                <Link to="/dashboard/services/billing-profile" className="block py-2 px-4 hover:bg-gray-700">
                  Billing Profile
                </Link>
                <Link to="/dashboard/services/modify-services" className="block py-2 px-4 hover:bg-gray-700">
                  Modify Services
                </Link>
                <Link to="/dashboard/services/opening-outstanding" className="block py-2 px-4 hover:bg-gray-700">
                  Opening Outstanding Balances
                </Link>
                <Link to="/dashboard/services/triggered-but-not-alloted" className="block py-2 px-4 hover:bg-gray-700">
                  Triggered but Not Alloted
                </Link>
                <Link to="/dashboard/services/manual-assignment" className="block py-2 px-4 hover:bg-gray-700">
                  Manual Assignment
                </Link>

              </div>
            )}
          </div>

          {/* Timesheet Menu */}
          <div>
            <button
              onClick={() => toggleMenu('timesheet')}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${isActive('/timesheet') ? 'bg-gray-800' : ''
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
    className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${isActive('/financial') ? 'bg-gray-800' : ''}`}
  >
    <div className="flex items-center space-x-2">
      <FileBarChart className="h-5 w-5" />
      <span>Financial</span>
    </div>
    <ChevronDown className={`h-4 w-4 transform ${openMenus.financial ? 'rotate-180' : ''}`} />
  </button>

  {openMenus.financial && (
    <div className="bg-gray-800 pl-8">
      {/* Invoice */}
      <button onClick={() => toggleMenu('invoice')} className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-700">
        <span>Invoice</span>
        <ChevronDown className={`h-4 w-4 transform ${openMenus.invoice ? 'rotate-180' : ''}`} />
      </button>
      {openMenus.invoice && (
        <div className="bg-gray-700 pl-4">
          <Link to="/dashboard/financial/invoice/single-invoice" className="block py-2 px-4 hover:bg-gray-600">Single Invoice</Link>
          <Link to="/dashboard/financial/invoice/bulk-invoice" className="block py-2 px-4 hover:bg-gray-600">Bulk Invoice</Link>
          <Link to="/dashboard/financial/invoice/invoices-or-outstanding-list" className="block py-2 px-4 hover:bg-gray-600">Invoices/Outstanding List</Link>
          <Link to="/dashboard/financial/invoice/billed-but-not-received" className="block py-2 px-4 hover:bg-gray-600">Billed But Not Received</Link>
          <Link to="/dashboard/financial/invoice/cancelled-invoice-list" className="block py-2 px-4 hover:bg-gray-600">Cancelled Invoice List</Link>
          <Link to="/dashboard/financial/invoice/non-billable-services" className="block py-2 px-4 hover:bg-gray-600">Non-Billable Services</Link>

        </div>
      )}

      {/* Receipt */}
      <button onClick={() => toggleMenu('receipt')} className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-700">
        <span>Receipt</span>
        <ChevronDown className={`h-4 w-4 transform ${openMenus.receipt ? 'rotate-180' : ''}`} />
      </button>
      {openMenus.receipt && (
        <div className="bg-gray-700 pl-4">
          <Link to="/dashboard/financial/receipt/generate" className="block py-2 px-4 hover:bg-gray-600">Generate</Link>
          <Link to="/dashboard/financial/receipt/list" className="block py-2 px-4 hover:bg-gray-600">List</Link>
          <Link to="/dashboard/financial/receipt/advance-list" className="block py-2 px-4 hover:bg-gray-600">Advance List</Link>
          <Link to="/dashboard/financial/receipt/cancelled-receipt-list" className="block py-2 px-4 hover:bg-gray-600">Cancelled Receipt List</Link>
        </div>
      )}

      {/* TDS Reconciliation */}
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
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${isActive('/resources') ? 'bg-gray-800' : ''
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
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${isActive('/reports') ? 'bg-gray-800' : ''
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
      {/* Client Reports */}
      <button onClick={() => toggleMenu('clientReport')} className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-700">
        <span>Client Report</span>
        <ChevronDown className={`h-4 w-4 transform ${openMenus.clientReport ? 'rotate-180' : ''}`} />
      </button>
      {openMenus.clientReport && (
        <div className="bg-gray-700 pl-4">
          <Link to="/dashboard/reports/client/all-client-profitability-report" className="block py-2 px-4 hover:bg-gray-600">All Client Profitability Report</Link>
          <Link to="/dashboard/reports/client/birthday-report" className="block py-2 px-4 hover:bg-gray-600">Birthday Report</Link>
          <Link to="/dashboard/reports/client/client-health-report" className="block py-2 px-4 hover:bg-gray-600">Client Health Report</Link>
          <Link to="/dashboard/reports/client/client-profitability-report" className="block py-2 px-4 hover:bg-gray-600">Client Profitability Report</Link>
          <Link to="/dashboard/reports/client/client-wise-work-position" className="block py-2 px-4 hover:bg-gray-600">Client-wise Work Position</Link>
          <Link to="/dashboard/reports/client/client-list-report" className="block py-2 px-4 hover:bg-gray-600">Client List Report</Link>
          <Link to="/dashboard/reports/client/dsc-expiry-report" className="block py-2 px-4 hover:bg-gray-600">DSC Expiry Report</Link>
          <Link to="/dashboard/reports/client/document-movement-report" className="block py-2 px-4 hover:bg-gray-600">Document Movement Report</Link>
          <Link to="/dashboard/reports/client/telephone-list" className="block py-2 px-4 hover:bg-gray-600">Telephone List</Link>
        </div>
      )}

      {/* Financial Reports */}
      <button onClick={() => toggleMenu('financialReport')} className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-700">
        <span>Financial Reports</span>
        <ChevronDown className={`h-4 w-4 transform ${openMenus.financialReport ? 'rotate-180' : ''}`} />
      </button>
      {openMenus.financialReport && (
        <div className="bg-gray-700 pl-4">
          <Link to="/dashboard/reports/financial/all-client-outstanding-report" className="block py-2 px-4 hover:bg-gray-600">All Client Outstanding Report</Link>
          <Link to="/dashboard/reports/financial/age-wise-analysis-of-outstanding-invoices" className="block py-2 px-4 hover:bg-gray-600">Age-wise Analysis of Outstanding Invoices</Link>
          <Link to="/dashboard/reports/financial/analysis-of-unbilled-service-report" className="block py-2 px-4 hover:bg-gray-600">Analysis of Unbilled Service Report</Link>
          <Link to="/dashboard/reports/financial/client-ledger-report" className="block py-2 px-4 hover:bg-gray-600">Client Ledger Report</Link>
          <Link to="/dashboard/reports/financial/claim-report" className="block py-2 px-4 hover:bg-gray-600">Claim Report</Link>
          <Link to="/dashboard/reports/financial/gst-summary-report" className="block py-2 px-4 hover:bg-gray-600">GST Summary Report</Link>
          <Link to="/dashboard/reports/financial/sac-code-summary-report" className="block py-2 px-4 hover:bg-gray-600">SAC Code Summary Report</Link>
          <Link to="/dashboard/reports/financial/tds-reconciliation-report" className="block py-2 px-4 hover:bg-gray-600">TDS Reconciliation Report</Link>
        </div>
      )}

      {/* Service Reports */}
      <button onClick={() => toggleMenu('serviceReport')} className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-700">
        <span>Service Report</span>
        <ChevronDown className={`h-4 w-4 transform ${openMenus.serviceReport ? 'rotate-180' : ''}`} />
      </button>
      {openMenus.serviceReport && (
        <div className="bg-gray-700 pl-4">
          <Link to="/dashboard/reports/service/service-wise-report-of-staff" className="block py-2 px-4 hover:bg-gray-600">Service-wise Report of Staff</Link>
          <Link to="/dashboard/reports/service/service-wise-work-position-report" className="block py-2 px-4 hover:bg-gray-600">Service-wise Work Position Report</Link>
          <Link to="/dashboard/reports/service/service-wise-revenue-analysis-report" className="block py-2 px-4 hover:bg-gray-600">Service-wise Revenue Analysis Report</Link>
          <Link to="/dashboard/reports/service/udin-report" className="block py-2 px-4 hover:bg-gray-600">UDIN Report</Link>
        </div>
      )}

      {/* Staff Reports */}
      <button onClick={() => toggleMenu('staffReport')} className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-700">
        <span>Staff Report</span>
        <ChevronDown className={`h-4 w-4 transform ${openMenus.staffReport ? 'rotate-180' : ''}`} />
      </button>
      {openMenus.staffReport && (
        <div className="bg-gray-700 pl-4">
          <Link to="/dashboard/reports/staff/staff-attendance-report" className="block py-2 px-4 hover:bg-gray-600">Staff Attendance Report</Link>
          <Link to="/dashboard/reports/staff/staff-wise-billing-report" className="block py-2 px-4 hover:bg-gray-600">Staff-wise Billing Report</Link>
          <Link to="/dashboard/reports/staff/staff-leave-report" className="block py-2 px-4 hover:bg-gray-600">Staff Leave Report</Link>
          <Link to="/dashboard/reports/staff/staff-profitability-report" className="block py-2 px-4 hover:bg-gray-600">Staff Profitability Report</Link>
          <Link to="/dashboard/reports/staff/staff-occupancy-report" className="block py-2 px-4 hover:bg-gray-600">Staff Occupancy Report</Link>
          <Link to="/dashboard/reports/staff/timesheet-summary-report" className="block py-2 px-4 hover:bg-gray-600">Timesheet Summary Report</Link>
        </div>
      )}
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
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-800 ${isActive('/masters') ? 'bg-gray-800' : ''
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
          <Link to="/" className="flex items-center space-x-2 p-4 hover:bg-gray-800 mt-4">
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
          <Route path="services/service-main-category" element={<ServiceMainCategory />} />
          <Route path="services/gst-billing-categories" element={<GstBillingCategories />} />
          <Route path="services/billing-profile" element={<BillingProfile />} />
          <Route path="services/modify-services" element={<ModifyServices />} />
          <Route path="services/opening-outstanding" element={<OpeningOutstandingBalances />} />
          <Route path="services/triggered-but-not-alloted" element={<ServicesTriggeredButNotAlloted />} />
          <Route path="services/manual-assignment" element={<ManualAssignment />} />

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
          <Route path="financial/invoice/single-invoice" element={<SingleInvoice />} />
          <Route path="financial/invoice/bulk-invoice" element={<BulkInvoice />} />
          <Route path="financial/invoice/invoices-or-outstanding-list" element={<InvoicesOrOutstandingList />} />
          <Route path="financial/invoice/billed-but-not-received" element={<BilledButNotReceived />} />
          <Route path="financial/invoice/cancelled-invoice-list" element={<CancelledInvoiceList />} />
          <Route path="financial/invoice/non-billable-services" element={<NonBillableServices />} />

          <Route path="financial/receipt/generate" element={<Generate />} />
          <Route path="financial/receipt/list" element={<List />} />
          <Route path="financial/receipt/advance-list" element={<AdvanceList />} />
          <Route path="financial/receipt/cancelled-receipt-list" element={<CancelledReceiptList />} />

          <Route path="financial/tds" element={<TdsReconciliation />} />

          {/* Resources Routes */}
          <Route path="resources/knowledge" element={<KnowledgeBase />} />
          <Route path="resources/library" element={<Library />} />

          {/* Reports Routes */}
          <Route path="reports/client/all-client-profitability-report" element={<AllClientProfitabilityReport />} />
          <Route path="reports/client/birthday-report" element={<BirthdayReport />} />
          <Route path="reports/client/client-health-report" element={<ClientHealthReport />} />
          <Route path="reports/client/client-profitability-report" element={<ClientProfitabilityReport />} />
          <Route path="reports/client/client-wise-work-position" element={<ClientwiseWorkPosition />} />
          <Route path="reports/client/client-list-report" element={<ClientListReport />} />
          <Route path="reports/client/dsc-expiry-report" element={<DscExpiryReport />} />
          <Route path="reports/client/document-movement-report" element={<DocumentMovementReport />} />
          <Route path="reports/client/telephone-list" element={<TelephoneList />} />

          <Route path="reports/financial/all-client-outstanding-report" element={<AllClientOutstandingReport />} />
          <Route path="reports/financial/age-wise-analysis-of-outstanding-invoices" element={<AgewiseAnalysisOfOutstandingInvoices />} />
          <Route path="reports/financial/analysis-of-unbilled-service-report" element={<AnalysisOfUnbilledServiceReport />} />
          <Route path="reports/financial/client-ledger-report" element={<ClientLedgerReport />} />
          <Route path="reports/financial/claim-report" element={<ClaimReport />} />
          <Route path="reports/financial/gst-summary-report" element={<GstSummaryReport />} />
          <Route path="reports/financial/sac-code-summary-report" element={<SacCodeSummaryReport />} />
          <Route path="reports/financial/tds-reconciliation-report" element={<TdsReconciliationReport />} />

          <Route path="reports/service/service-wise-report-of-staff" element={<ServicewiseReportOfStaffs />} />
          <Route path="reports/service/service-wise-work-position-report" element={<ServicewiseWorkPositionReport />} />
          <Route path="reports/service/service-wise-revenue-analysis-report" element={<ServicewiseRevenueAnalysisReport />} />
          <Route path="reports/service/udin-report" element={<UdinReport />} />

          <Route path="reports/staff/staff-attendance-report" element={<StaffAttendanceReport />} />
          <Route path="reports/staff/staff-wise-billing-report" element={<StaffwiseBillingReport />} />
          <Route path="reports/staff/staff-leave-report" element={<StaffLeaveReport />} />
          <Route path="reports/staff/staff-profitability-report" element={<StaffProfitabilityReport />} />
          <Route path="reports/staff/staff-occupancy-report" element={<StaffOccupancyReport />} />
          <Route path="reports/staff/timesheet-summary-report" element={<TimesheetSummaryReport />} />

          
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