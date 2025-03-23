import React, { useState } from 'react';
import { mockMiners, statusVariants } from '../../mockData';
import { Grid, List, Search, SlidersHorizontal, RotateCw } from 'lucide-react';

export default function MockMachineGrid() {
  // State for view mode (default to list view)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Empty state - when no machines are found
  const noMachines = false;

  // Filter miners based on search and filters
  const filteredMiners = mockMiners.filter(miner => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      miner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      miner.type.name.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter === 'all' || miner.state === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === 'all' || miner.type.name === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  if (noMachines) {
    return (
      <div className="flex flex-col items-center justify-center py-20 dark:bg-gray-800">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
          <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">No machines found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      {/* Single control row with view toggles, search and filters */}
      <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid' 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            aria-label="Grid view"
          >
            <Grid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
        
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search machines by name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative">
            <select
              className="block w-32 pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="all" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">All Status</option>
              <option value="online" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Online</option>
              <option value="offline" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Offline</option>
              <option value="maintenance" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Maintenance</option>
              <option value="sleeping" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Sleeping</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SlidersHorizontal size={14} className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          
          <div className="relative">
            <select
              className="block w-32 pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by machine type"
            >
              <option value="all" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">All Types</option>
              <option value="Antminer S19k Pro" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Antminer S19k Pro</option>
              <option value="Antminer L9" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Antminer L9</option>
              <option value="Antminer L7 (9050)" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Antminer L7 (9050)</option>
              <option value="Antminer L7 (8800)" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Antminer L7 (8800)</option>
              <option value="Antminer KS3" className="text-gray-900 dark:text-gray-100 py-1 dark:bg-gray-700">Antminer KS3</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SlidersHorizontal size={14} className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          
          <button 
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            aria-label="Refresh"
          >
            <RotateCw size={18} />
          </button>
        </div>
      </div>
      
      {/* Results count */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-400">
        Showing 1 to {filteredMiners.length} of {mockMiners.length} miners
      </div>

      {/* Miners list or grid */}
      {viewMode === 'list' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-y border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Machine</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hash Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Power</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Temperature</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMiners.map((miner, index) => {
                const status = statusVariants[miner.state] || statusVariants.online;
                
                return (
                  <tr key={miner.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{miner.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{miner.type.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.badge}`}>
                        {status.icon}
                        <span className="ml-1 capitalize">{miner.state}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      192.168.1.{100 + index}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {(50 + Math.random() * 20).toFixed(1)} TH/s
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {(2000 + Math.random() * 500).toFixed(0)} W
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {(55 + Math.random() * 10).toFixed(1)}°C
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMiners.map((miner, index) => {
            const status = statusVariants[miner.state] || statusVariants.online;

            return (
              <div key={miner.id} className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{miner.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.badge}`}>
                    {status.icon}
                    <span className="ml-1 capitalize">{miner.state}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{miner.type.name}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <div>
                    <span className="block text-gray-500 dark:text-gray-400">IP Address</span>
                    <span>192.168.1.{100 + index}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 dark:text-gray-400">Hash Rate</span>
                    <span>{(50 + Math.random() * 20).toFixed(1)} TH/s</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 dark:text-gray-400">Power</span>
                    <span>{(2000 + Math.random() * 500).toFixed(0)} W</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 dark:text-gray-400">Temperature</span>
                    <span>{(55 + Math.random() * 10).toFixed(1)}°C</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}