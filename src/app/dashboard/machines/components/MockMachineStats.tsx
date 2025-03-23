// src/app/dashboard/machines/components/MockMachineStats.tsx
import React from 'react';
import { Users, Activity, Wrench, Power, Zap, DollarSign, Gauge } from 'lucide-react';
import { minerStats, performanceMetrics } from '../../mockData';

export default function MockMachineStats() {
  // Convert the power cost from decimal dollars to cents
  const powerCostInCents = Math.round(performanceMetrics.powerCost * 1000) / 10; // Convert to cents with one decimal place
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Machine Overview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">John Smith, Machine Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current machine status</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 rounded-full p-2 text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{minerStats.online}/{minerStats.total}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Machines</div>
                  <div className="flex items-center text-xs mt-0.5">
                    <span className="text-green-600 dark:text-green-400 font-medium">{minerStats.online} Online</span>
                    <span className="mx-1 text-gray-400 dark:text-gray-500">/</span>
                    <span className="text-gray-500 dark:text-gray-400">{minerStats.offline} Offline</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-2 text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{minerStats.hashing}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Hashing Status</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {((minerStats.hashing / minerStats.total) * 100).toFixed(1)}% of Total
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 rounded-full p-2 text-white">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{minerStats.inRepair}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">In Repair</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {((minerStats.inRepair / minerStats.total) * 100).toFixed(1)}% of Total
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 rounded-full p-2 text-white">
                  <Power className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{minerStats.sleeping}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Sleeping</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {((minerStats.sleeping / minerStats.total) * 100).toFixed(1)}% of Total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Performance Metrics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Real-time performance overview</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 rounded-full p-2 text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{minerStats.totalHashRate.toFixed(2)} GH/s</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total Hash Rate</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Current Mining Power</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-2 text-white">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {powerCostInCents}¢
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Power Cost</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rate: {performanceMetrics.powerRate.toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 rounded-full p-2 text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{performanceMetrics.powerDraw.toFixed(2)} kW</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Power Draw</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Current Power Usage</div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 rounded-full p-2 text-white">
                  <Gauge className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{minerStats.avgHashRate.toFixed(2)} GH/s</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Average Hash Rate</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Per Online Machine</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}