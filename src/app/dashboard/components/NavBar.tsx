// src/app/dashboard/components/NavBar.tsx
'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Monitor,
  Settings,
  LogOut,
  Menu,
  X,
  Receipt,
  Server,
  MessageCircle
} from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    // Clear the demo-auth cookie
    document.cookie = "demo-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to login page
    router.push('/dashboard/login');
  };

  const menuItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      text: 'Dashboard',
      href: `/dashboard`,
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      text: 'My Machines',
      href: `/dashboard/machines`,
    },
    {
      icon: <Server className="w-5 h-5" />,
      text: 'Cloud Services',
      href: `/dashboard/recurly`,
    },
    {
      icon: <Receipt className="w-5 h-5" />,
      text: 'Billing',
      href: `/dashboard/billing`,
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      text: 'Support',
      href: `/dashboard/support`,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      text: 'Settings',
      href: `/dashboard/settings`,
    },
  ];

  // Function to check if a menu item is active
  const isActive = (href) => {
    if (href === '/dashboard' && pathname === '/dashboard') {
      return true;
    }
    if (href !== '/dashboard' && pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  return (
    <aside
      className={`
        h-screen bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900
        transition-all duration-500 ease-in-out will-change-transform
        fixed md:sticky top-0 left-0
        ${isOpen ? 'w-64 translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:w-20 md:flex md:flex-col
        lg:w-20 lg:hover:w-64
        xl:w-64
        z-40
        rounded-tr-xl rounded-br-xl
        group
      `}
    >
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg md:hidden"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>

      {/* Logo with increased padding and size */}
      <div className="flex items-center justify-between pt-10 pb-6 px-5 mb-8">
        <div className="flex items-center justify-center w-full">
          {/* Larger logo image with more padding */}
          <div className="flex-shrink-0 relative">
            <Image 
              src="/images/terra-logo-1.png" 
              alt="Terra Hosting Logo" 
              width={200} 
              height={48} 
              className="object-contain w-auto h-14 md:h-12 lg:h-14" 
            />
          </div>
        </div>
        <button
          className="text-gray-700 dark:text-gray-200 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1.5 px-3">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.text}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center space-x-3.5 px-5 py-2.5 rounded-md
                    relative overflow-hidden
                    transition-all duration-300 ease-out
                    ${
                      active
                        ? 'bg-[#7FD1DB]/20' /* Light blue background for active items */
                        : 'hover:bg-[#E06CB0]/10' /* Pink background for hover state */
                    }
                    transform-gpu hover:translate-x-1
                    active:scale-[0.98] active:translate-x-0
                  `}
                >
                  <span
                    className={`
                      transform-gpu transition-all duration-300 ease-out
                      ${active ? 'text-[#7FD1DB] translate-x-0.5' : 'text-gray-700 dark:text-gray-200 hover:text-[#E06CB0]'}
                      group-hover:scale-105 group-hover:text-[#E06CB0]
                    `}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`
                      whitespace-nowrap transform-gpu
                      transition-all duration-500 ease-out
                      ${active ? 'text-[#7FD1DB] font-semibold' : 'text-gray-700 dark:text-gray-200 hover:text-[#E06CB0]'}
                      group-hover:text-[#E06CB0]
                      lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:translate-x-[-10px]
                      xl:opacity-100 xl:translate-x-0
                      hidden lg:block
                    `}
                  >
                    {item.text}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* Sign Out Button */}
          <li className="mt-8">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3.5 px-5 py-2.5 rounded-md w-full
                hover:bg-[#E06CB0]/10 group/logout"
            >
              <span className="text-gray-700 dark:text-gray-200 group-hover/logout:text-[#E06CB0]">
                <LogOut className="w-5 h-5" />
              </span>
              <span className="text-gray-700 dark:text-gray-200 group-hover/logout:text-[#E06CB0] hidden lg:block whitespace-nowrap transform-gpu transition-all duration-500 ease-out lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:translate-x-[-10px] xl:opacity-100 xl:translate-x-0">
                Sign Out
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}