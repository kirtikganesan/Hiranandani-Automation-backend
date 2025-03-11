import React from 'react';
import { 
  BarChart3, FileSpreadsheet, Users2, Calculator,
  Clock, Shield, Cloud, Bot
} from 'lucide-react';
import Navbar from '../components/Navbar';
import {Link} from 'react-router-dom';

const features = [
  {
    icon: BarChart3,
    title: 'Financial Analytics',
    description: 'Advanced analytics and reporting tools for better decision making'
  },
  {
    icon: FileSpreadsheet,
    title: 'Automated Compliance',
    description: 'Stay compliant with automated regulatory reporting and updates'
  },
  {
    icon: Users2,
    title: 'Client Management',
    description: 'Efficiently manage client relationships and communications'
  },
  {
    icon: Calculator,
    title: 'Tax Automation',
    description: 'Streamline tax calculations and filing processes'
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Track time and manage projects efficiently'
  },
  {
    icon: Shield,
    title: 'Secure Data',
    description: 'Enterprise-grade security for your sensitive data'
  },
  {
    icon: Cloud,
    title: 'Cloud Storage',
    description: 'Secure cloud storage for all your documents'
  },
  {
    icon: Bot,
    title: 'AI Assistance',
    description: 'AI-powered insights and automation'
  }
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Features</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our comprehensive suite of features can transform your financial practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Practice?</h2>
          <p className="mb-6">Join thousands of professionals who trust Hiranandani Automation</p>
          <Link
                  to="/login"
                  className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started Now
                </Link>
          {/* <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Get Started Today
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;