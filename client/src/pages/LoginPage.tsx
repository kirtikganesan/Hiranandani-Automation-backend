import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import logo from "../assets/newfavicon.png"
import loginbg from "../assets/loginbg.avif"
import axios from 'axios';

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the login request to the backend
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log(response.status);
      
      // Check if the response is successful (status 200)
      if (response.status === 200) {
        // If login is successful, navigate to the dashboard
        navigate('/dashboard/');
      }
    } catch (err) {
      // Handle errors, such as invalid credentials
      setError('Invalid email or password');
    }
  };
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <nav className="bg-transparent py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="" className='h-8 w-8'/>
                <span className="text-white text-xl font-bold">Hiranandani Automation</span>
              </Link>

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
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 bg-blue-900/90 rounded-lg p-4">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                  <Link to="/about" className="text-white hover:text-gray-300">About Us</Link>
                  <Link to="/features" className="text-white hover:text-gray-300">Features</Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Login Form */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="" className='h-14 w-14'/>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;