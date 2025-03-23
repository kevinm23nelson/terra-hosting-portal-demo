'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function AppBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  
  // Get page title based on current path
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Client Dashboard';
    if (pathname.includes('/machines')) return 'My Machines';
    if (pathname.includes('/recurly')) return 'Cloud Services';
    if (pathname.includes('/billing')) return 'Billing';
    if (pathname.includes('/support')) return 'Support';
    if (pathname.includes('/settings')) return 'Settings';
    return 'Client Dashboard';
  };
  
  // Mock user data for the demo
  const user = {
    email: 'demo@terraclient.com',
    profile: {
      firstName: 'Demo',
      lastName: 'Client'
    },
    role: 'client'
  };

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Helper functions for name display
  const getFirstName = () => {
    if (user?.profile?.firstName) return user.profile.firstName;
    return user?.email?.split('@')[0] || 'Client';
  };

  const getFullName = () => {
    if (user?.profile?.firstName && user?.profile?.lastName) {
      return `${user.profile.firstName} ${user.profile.lastName}`;
    }
    return user?.email?.split('@')[0] || 'Client';
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg m-4 p-4 md:p-6">
      <div className="flex items-center justify-between flex-wrap">
        {/* Title */}
        <div className="flex items-center space-x-3">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {getPageTitle()}
          </h3>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Notification Button */}
          <button className="relative flex items-center justify-center w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30">
            <Bell className="w-5 h-5 text-orange-400 dark:text-orange-300" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-3 focus:outline-none"
            >
              {/* Custom profile image */}
              <div className="w-11 h-11 lg:w-[45px] lg:h-[45px] rounded-full overflow-hidden bg-white dark:bg-gray-700">
                <Image 
                  src="/images/face-with-cowboy-hat.svg"
                  alt="Profile"
                  width={45}
                  height={45}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex flex-col min-w-[80px]">
                <span className="font-semibold text-gray-700 dark:text-gray-200 truncate">
                  {getFirstName()}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.role || 'Client'}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isProfileOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-100 dark:border-gray-700"
                >
                  {/* Profile Popup Content */}
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* Also update the larger profile image in dropdown */}
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-700">
                        <Image 
                          src="/images/face-with-cowboy-hat.svg"
                          alt="Profile"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {getFullName()}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Theme Mode</span>
                          <span className="text-gray-900 dark:text-white">System</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Role</span>
                          <span className="text-gray-900 dark:text-white capitalize">
                            {user?.role || 'Client'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Last Active</span>
                          <span className="text-gray-900 dark:text-white">Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}