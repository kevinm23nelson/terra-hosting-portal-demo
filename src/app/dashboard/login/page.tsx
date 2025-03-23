'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock client data for demo
const clients = [
  { id: 'demo', name: 'Demo Client' },
  { id: 'client-1', name: 'Crypto Mining Corp' },
  { id: 'client-2', name: 'BlockChain Solutions' },
  { id: 'client-3', name: 'HashRate Ventures' }
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedClient, setSelectedClient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClient) {
      setError('Please select a client');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    // Simulate login delay
    setTimeout(() => {
      // Store the selected client in localStorage
      localStorage.setItem('selectedClient', selectedClient);
      
      // Set a cookie for the middleware
      document.cookie = "demo-auth=true; path=/";
      
      // Navigate to the dashboard
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="mb-8 text-center">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-cyan-400" />
                <span className="text-white font-bold text-4xl relative z-10">T</span>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Terra Hosting Portal</h2>
            <p className="mt-2 text-gray-300">
              Sign in to access your client dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-200 border border-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-200">
                Select Client
              </label>
              <div className="mt-1">
                <select
                  id="client"
                  name="client"
                  className="block w-full pl-3 pr-10 py-2 text-gray-900 bg-gray-100 border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  <option value="">Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value="demo-password"
                  disabled
                  className="block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-400">
                  For the demo, password is pre-filled and not required
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-900 text-gray-400">Demo Information</span>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-gray-400">
              <p>This is a demonstration version of the Terra Hosting Portal.</p>
              <p className="mt-1">Select any client and click - Sign in - to view the dashboard.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-white">
        <p>© {new Date().getFullYear()} Terra Hosting. All rights reserved.</p>
        <p className="mt-1">Demo Version for Presentation Purposes Only</p>
      </div>
    </div>
  );
}