// components/LoginTracker.tsx
import React from 'react';
import { Check, X } from 'lucide-react';

const LoginTracker = () => {
  const weeklyLogins = [
    { day: 'S', logged: true },
    { day: 'M', logged: true },
    { day: 'T', logged: false },
    { day: 'W', logged: true },
    { day: 'T', logged: true },
    { day: 'F', logged: true },
    { day: 'S', logged: false },
  ];

  const monthlyLogins = 18;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden h-full">
      <div className="p-8 h-full flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Login Activity
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Track your daily platform engagement
            </p>
          </div>
        </div>

        {/* Weekly Login Tracker */}
        <div className="flex justify-between items-center mb-5">
          {weeklyLogins.map((login, index) => (
            <div 
              key={index}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-50 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {login.day}
                </span>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                login.logged 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {login.logged ? (
                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Stats */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center mt-auto">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">This Month</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">
              {monthlyLogins}
            </span>
            <span className="text-base text-blue-600 dark:text-blue-400">
              days logged in
            </span>
          </div>
          <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
            Keep up the great work!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginTracker;