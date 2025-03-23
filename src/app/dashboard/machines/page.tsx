"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import MockMachineStats from "./components/MockMachineStats";
import MockMachineTypeDistribution from "./components/MockMachineTypeDistribution";
import MockMachineGrid from "./components/MockMachineGrid";
import { HashrateTrendChart } from "./components/HashrateTrendChart";
import { PowerDrawChart } from "./components/PowerDrawChart";
import { minerStats, getMinerTypeDistribution } from "../mockData";

export default function MachinesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get miner type distribution from mockData
  const minerTypeDistribution = getMinerTypeDistribution();
  const uniqueTypes = minerTypeDistribution.length;

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

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Machine Overview and Performance Metrics */}
        <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "100ms" }}>
          <MockMachineStats />
        </div>

        {/* Trend Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "250ms" }}>
            <HashrateTrendChart />
          </div>
          <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "350ms" }}>
            <PowerDrawChart />
          </div>
        </div>

        {/* Machine Distribution Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "450ms" }}>
            <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Machine Statistics
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Overview of machine types and performance
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div 
                  className={`bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 ${fadeIn} ${isLoaded ? visible : hidden}`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white rounded-full p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {minerStats.total}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Total Machines
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {minerStats.online} Active / {minerStats.offline}{" "}
                        Inactive
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className={`bg-green-50 dark:bg-green-900/20 rounded-xl p-4 ${fadeIn} ${isLoaded ? visible : hidden}`}
                  style={{ transitionDelay: "550ms" }}
                >
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white rounded-full p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {uniqueTypes}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Unique Machine Types
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Different Models
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className={`bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 ${fadeIn} ${isLoaded ? visible : hidden}`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <div className="flex items-center">
                    <div className="bg-purple-500 text-white rounded-full p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        100%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Share Acceptance Rate
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        0 Accepted / 0 Rejected
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        0 Stale Shares
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "500ms" }}>
            <MockMachineTypeDistribution />
          </div>
        </div>

        {/* Machine List/Grid Section */}
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "650ms" }}>
          <MockMachineGrid />
        </div>
      </div>
    </DashboardLayout>
  );
}