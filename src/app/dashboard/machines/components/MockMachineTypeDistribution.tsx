import React, { useState } from 'react';
import { BarChart, PieChart } from 'lucide-react';
import { getMinerTypeDistribution } from '../../mockData';

export default function MockMachineTypeDistribution() {
  // Set default view mode to 'active'
  const [viewMode, setViewMode] = useState<'all' | 'active'>('active');
  
  // Use the shared data function to get miner type distribution
  const minerTypes = getMinerTypeDistribution();
  
  // Calculate total counts for percentage calculations
  const totalMachines = minerTypes.reduce((sum, type) => sum + type.total, 0);
  const totalActive = minerTypes.reduce((sum, type) => sum + type.online, 0);
  
  // Define color schemes like in MachineTypeStats with dark mode support
  const colors = [
    {
      bar: 'bg-blue-100 dark:bg-blue-900/30',
      fill: 'bg-blue-500 dark:bg-blue-400',
      badge: 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400',
    },
    {
      bar: 'bg-emerald-100 dark:bg-emerald-900/30',
      fill: 'bg-emerald-500 dark:bg-emerald-400',
      badge: 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400',
    },
    {
      bar: 'bg-violet-100 dark:bg-violet-900/30',
      fill: 'bg-violet-500 dark:bg-violet-400',
      badge: 'border-violet-500 dark:border-violet-400 bg-violet-50 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400',
    },
    {
      bar: 'bg-orange-100 dark:bg-orange-900/30',
      fill: 'bg-orange-500 dark:bg-orange-400',
      badge: 'border-orange-500 dark:border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Machine Type Distribution</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Detailed breakdown by machine type</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('all')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
                viewMode === 'all' 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <BarChart className="h-4 w-4" />
              <span>All Machines</span>
            </button>
            <button 
              onClick={() => setViewMode('active')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
                viewMode === 'active' 
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <PieChart className="h-4 w-4" />
              <span>Active Only</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-0">
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 text-sm font-medium text-gray-600 dark:text-gray-400 text-left w-[22%]">
                  Machine Type
                </th>
                <th className="py-3 text-sm font-medium text-gray-600 dark:text-gray-400 text-left w-[50%]">
                  Distribution
                </th>
                <th className="py-3 text-sm font-medium text-gray-600 dark:text-gray-400 text-left w-[28%]">
                  Count
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      
      <div className="px-6 py-0">
        <div className="overflow-y-auto max-h-[300px]">
          <table className="w-full">
            <tbody>
              {minerTypes.map((minerType, index) => {
                const color = colors[index % colors.length];
                
                // Calculate total percentage for reference
                const totalPercentage = (minerType.total / totalMachines) * 100;
                
                // Calculate display percentage based on view mode
                const displayPercentage = viewMode === 'active' 
                  ? (minerType.online / totalActive) * 100
                  : totalPercentage;
                
                return (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                    {/* Fixed machine type name styling to match heading */}
                    <td className="py-6 align-middle w-[22%]">
                      <span className="text-gray-900 dark:text-gray-100">
                        {minerType.name}
                      </span>
                    </td>
                    <td className="py-6 align-middle w-[50%] pr-8">
                      <div
                        className={`relative h-[5px] rounded-full overflow-hidden ${color.bar}`}
                      >
                        <div
                          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${color.fill}`}
                          style={{ width: `${displayPercentage}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-6 align-middle w-[28%]">
                      <div
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-md border whitespace-nowrap text-sm ${color.badge}`}
                      >
                        {minerType.total} ({minerType.online} active) ({displayPercentage.toFixed(1)}%)
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}