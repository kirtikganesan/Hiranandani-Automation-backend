// TopBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
const navigate=useNavigate();

interface TopBarProps {
  onMenuClick: () => void;
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick, title }) => {
  return (
    <div className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md hover:bg-gray-100 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 ml-2 md:ml-0">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/contact"
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <HelpCircle className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Support</span>
          </Link>
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <LogOut className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;