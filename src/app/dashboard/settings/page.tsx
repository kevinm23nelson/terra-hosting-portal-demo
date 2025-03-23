'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Appearance</h2>
            
            <div className="flex flex-col space-y-4">
              <div>
                <label className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-2 block">
                  Theme Mode
                </label>
                <div className="flex space-x-4 mt-2">
                  <ThemeButton 
                    active={theme === 'light'}
                    onClick={() => setTheme('light')}
                    icon={<Sun className="w-5 h-5" />}
                    label="Light"
                  />
                  <ThemeButton 
                    active={theme === 'dark'}
                    onClick={() => setTheme('dark')}
                    icon={<Moon className="w-5 h-5" />}
                    label="Dark"
                  />
                  <ThemeButton 
                    active={theme === 'system'}
                    onClick={() => setTheme('system')}
                    icon={<Monitor className="w-5 h-5" />}
                    label="System"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional settings sections can be added here */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Notifications</h2>
            
            <div className="flex flex-col space-y-4">
              <ToggleSetting 
                label="Email Notifications" 
                description="Receive email notifications for important updates"
                defaultChecked={true}
              />
              <ToggleSetting 
                label="Push Notifications" 
                description="Receive push notifications in the browser"
                defaultChecked={false}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Account</h2>
            
            <div className="flex flex-col space-y-4">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-fit transition-colors">
                Change Password
              </button>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md w-fit transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ThemeButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center flex-col py-3 px-6 rounded-lg transition-all duration-200
        ${active 
          ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white shadow-md' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
        }
      `}
    >
      {icon}
      <span className="mt-1 text-sm">{label}</span>
    </button>
  );
}

// Toggle setting component for boolean settings
function ToggleSetting({ label, description, defaultChecked = false }) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-700 dark:text-gray-200 font-medium">{label}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <div className={`
          w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer 
          peer-checked:after:translate-x-full 
          peer-checked:after:border-white 
          after:content-[''] 
          after:absolute 
          after:top-[2px] 
          after:left-[2px] 
          after:bg-white 
          after:border-gray-300 
          after:border 
          after:rounded-full 
          after:h-5 
          after:w-5 
          after:transition-all
          dark:border-gray-600 
          peer-checked:bg-gradient-to-r 
          peer-checked:from-purple-600
          peer-checked:via-purple-500
          peer-checked:to-cyan-500
        `}></div>
      </label>
    </div>
  );
}