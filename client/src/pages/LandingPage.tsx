import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import logo from "../assets/newfavicon.png"
import landingbg from "../assets/landingbg.avif"

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${landingbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="bg-transparent py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* <Building2 className="h-8 w-8 text-white" /> */}
                <img src={logo} alt="" className="h-8 w-8"/>
                <span className="text-white text-xl font-bold">Hiranandani Automation</span>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                <Link to="/about" className="text-white hover:text-gray-300">About Us</Link>
                <Link to="/features" className="text-white hover:text-gray-300">Features</Link>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 bg-blue-900/90 rounded-lg p-4">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                  <Link to="/about" className="text-white hover:text-gray-300">About Us</Link>
                  <Link to="/features" className="text-white hover:text-gray-300">Features</Link>
                  <Link
                    to="/login"
                    className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-32 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Streamline Your Office Automation
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 max-w-2xl mx-auto">
            Comprehensive automation solutions for Chartered Accountants, Cost Accountants,
            Company Secretaries, and Tax Consultants
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;