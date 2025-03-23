'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Lock, UserX } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

// Define types for component props
interface ThemeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

interface ToggleSettingProps {
  label: string;
  description: string;
  defaultChecked?: boolean;
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation setup
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation classes
  const fadeIn = "transition-all duration-500 ease-out";
  const hidden = "opacity-0 translate-y-6";
  const visible = "opacity-100 translate-y-0";

  if (!mounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700 px-8 py-5">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
          </div>
          
          {/* Appearance Section */}
          <div className={`px-8 py-6 border-b border-gray-100 dark:border-gray-700 ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "100ms" }}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">Appearance</h2>
            
            <div className="mb-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Theme Mode
              </label>
              <div className="flex gap-4 mt-3">
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
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className={`px-8 py-6 border-b border-gray-100 dark:border-gray-700 ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "250ms" }}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">Notifications</h2>
            
            <div className="space-y-5">
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

          {/* Account Section */}
          <div className={`px-8 py-6 ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "400ms" }}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">Account</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </button>
              <button className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center">
                <UserX className="w-4 h-4 mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ThemeButton({ active, onClick, icon, label }: ThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-3 px-5 py-3 rounded-lg transition-all
        ${active 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
        }
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {active && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
      )}
    </button>
  );
}

function ToggleSetting({ label, description, defaultChecked = false }: ToggleSettingProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-800 dark:text-gray-200 font-medium">{label}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <div className={`
          w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer
          peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
          peer-checked:after:translate-x-6
          after:content-[''] 
          after:absolute 
          after:top-[2px] 
          after:left-[2px] 
          after:bg-white 
          after:rounded-full 
          after:h-5 
          after:w-5 
          after:transition-all
          peer-checked:bg-blue-500
        `}></div>
      </label>
    </div>
  );
}