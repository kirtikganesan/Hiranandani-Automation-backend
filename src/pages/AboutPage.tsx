import React from 'react';
import { Building2, Target, Users, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import logo from "../assets/newfavicon.png"


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Hiranandani Automation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing financial practices through intelligent automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2024, Hiranandani Automation emerged from a vision to transform how financial
              professionals work. We understand the complexities and challenges faced by Chartered
              Accountants, Cost Accountants, Company Secretaries, and Tax Consultants in their daily
              operations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to empower financial professionals with cutting-edge automation tools
              that streamline workflows, reduce errors, and increase productivity. We're committed
              to innovation and excellence in every solution we provide.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading provider of automation solutions in the financial sector.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Team</h3>
            <p className="text-gray-600">
              A dedicated group of experts committed to your success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
            <p className="text-gray-600">
              Innovation, integrity, and excellence in everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;