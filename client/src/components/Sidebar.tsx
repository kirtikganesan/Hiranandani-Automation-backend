// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, X } from 'lucide-react';
import logo from "../assets/newfavicon.jpg"

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-950 text-white transform transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="p-4">
        <div className="flex items-center mb-8 justify-center gap-6">
          <img src={logo} alt="" className="w-8 h-8" />
          <span className="text-xl font-semibold">Hiranandani</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-blue-700 md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav>
          <div className="mb-4">
            <div className="flex items-center px-4 py-2 text-gray-300">
              <LayoutDashboard className="h-5 w-5 mr-2" />
              <span>Dashboard</span>
            </div>
            <div className="ml-4">
              <Link
                to="/dashboard/service"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 rounded-md"
                onClick={() => window.innerWidth < 768 && onClose()}
              >
                Service Dashboard
              </Link>
              {/* Add other submenu items here */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;