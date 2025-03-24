import React, { useState, useEffect } from 'react';
import { mockMiners } from '../../mockData';
import { Grid, List, Search, RotateCw, ChevronDown, ChevronUp, Download, Eye } from 'lucide-react';

export default function MachineGrid() {
  // State for view mode (default to list view)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);

  // State for expanded miner details
  const [expandedMinerId, setExpandedMinerId] = useState<string | number | null>(null);
  
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

  const handleMinerClick = (minerId: string | number) => {
    setExpandedMinerId(expandedMinerId === minerId ? null : minerId);
    // Close filter dropdowns when clicking on a miner
    setIsStatusFilterOpen(false);
    setIsTypeFilterOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const statusDropdown = document.querySelector('.status-filter-dropdown');
      const typeDropdown = document.querySelector('.type-filter-dropdown');
      
      if (statusDropdown && !statusDropdown.contains(event.target as Node)) {
        setIsStatusFilterOpen(false);
      }
      
      if (typeDropdown && !typeDropdown.contains(event.target as Node)) {
        setIsTypeFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get status label and color class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-200 text-green-950 dark:bg-green-900/50 dark:text-green-50 font-extrabold';
      case 'offline':
        return 'bg-rose-200 text-rose-950 dark:bg-rose-900/50 dark:text-rose-50 font-extrabold';
      case 'maintenance':
        return 'bg-amber-200 text-amber-950 dark:bg-amber-900/50 dark:text-amber-50 font-extrabold';
      case 'sleeping':
        return 'bg-blue-200 text-blue-950 dark:bg-blue-900/50 dark:text-blue-50 font-extrabold';
      default:
        return 'bg-gray-200 text-gray-950 dark:bg-gray-900/50 dark:text-gray-50 font-extrabold';
    }
  };

  // Status filter button styles
  const getStatusFilterButtonClass = () => {
    switch (statusFilter) {
      case 'all':
        return 'bg-blue-200 text-blue-950 dark:bg-blue-900/60 dark:text-blue-50 border border-blue-300 dark:border-blue-700 font-bold';
      case 'online':
        return 'bg-green-200 text-green-950 dark:bg-green-900/60 dark:text-green-50 border border-green-300 dark:border-green-700 font-bold';
      case 'offline':
        return 'bg-rose-200 text-rose-950 dark:bg-rose-900/60 dark:text-rose-50 border border-rose-300 dark:border-rose-700 font-bold';
      case 'maintenance':
        return 'bg-amber-200 text-amber-950 dark:bg-amber-900/60 dark:text-amber-50 border border-amber-300 dark:border-amber-700 font-bold';
      case 'sleeping':
        return 'bg-blue-200 text-blue-950 dark:bg-blue-900/60 dark:text-blue-50 border border-blue-300 dark:border-blue-700 font-bold';
      default:
        return 'bg-blue-200 text-blue-950 dark:bg-blue-900/60 dark:text-blue-50 border border-blue-300 dark:border-blue-700 font-bold';
    }
  };

  if (noMachines) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
        <div className="flex flex-row items-center justify-between p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Miners</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
              <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Miners Found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              You do not have any miners available at the moment. Try adjusting your search or filters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="flex flex-row items-center justify-between p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Miners</h2>
        <div className="flex space-x-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mr-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              aria-label="List view"
            >
              <List size={16} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </button>
          </div>

          {/* Status filter dropdown with toggling functionality */}
          <div className="relative status-filter-dropdown">
            <button
              onClick={() => {
                setIsStatusFilterOpen(!isStatusFilterOpen);
                setIsTypeFilterOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${getStatusFilterButtonClass()}`}
            >
              <span>
                {statusFilter === 'all'
                  ? 'All Status'
                  : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </span>
              {isStatusFilterOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {isStatusFilterOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setIsStatusFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === 'all'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  All Status
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('online');
                    setIsStatusFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === 'online'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('offline');
                    setIsStatusFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === 'offline'
                      ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Offline
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('maintenance');
                    setIsStatusFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === 'maintenance'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Maintenance
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('sleeping');
                    setIsStatusFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === 'sleeping'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Sleeping
                </button>
              </div>
            )}
          </div>

          {/* Type filter dropdown */}
          <div className="relative type-filter-dropdown">
            <button
              onClick={() => {
                setIsTypeFilterOpen(!isTypeFilterOpen);
                setIsStatusFilterOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-200 text-blue-950 dark:bg-blue-900/60 dark:text-blue-50 border border-blue-300 dark:border-blue-700 rounded-lg transition-colors font-bold"
            >
              <span>
                {typeFilter === 'all'
                  ? 'All Types'
                  : typeFilter}
              </span>
              {isTypeFilterOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {isTypeFilterOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                <button
                  onClick={() => {
                    setTypeFilter('all');
                    setIsTypeFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    typeFilter === 'all'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => {
                    setTypeFilter('Antminer S19k Pro');
                    setIsTypeFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    typeFilter === 'Antminer S19k Pro'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Antminer S19k Pro
                </button>
                <button
                  onClick={() => {
                    setTypeFilter('Antminer L9');
                    setIsTypeFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    typeFilter === 'Antminer L9'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Antminer L9
                </button>
                <button
                  onClick={() => {
                    setTypeFilter('Antminer L7 (9050)');
                    setIsTypeFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    typeFilter === 'Antminer L7 (9050)'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Antminer L7 (9050)
                </button>
                <button
                  onClick={() => {
                    setTypeFilter('Antminer L7 (8800)');
                    setIsTypeFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    typeFilter === 'Antminer L7 (8800)'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Antminer L7 (8800)
                </button>
                <button
                  onClick={() => {
                    setTypeFilter('Antminer KS3');
                    setIsTypeFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    typeFilter === 'Antminer KS3'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Antminer KS3
                </button>
              </div>
            )}
          </div>

          {/* Refresh button */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-200 text-green-950 dark:bg-green-900/50 dark:text-green-50 border border-green-300 dark:border-green-700 rounded-lg hover:bg-green-300 dark:hover:bg-green-800 transition-colors font-bold">
            <RotateCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      <div className="relative mx-6 mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search miners by name or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {viewMode === 'list' ? (
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Lighter header background */}
              <thead className="bg-blue-50 dark:bg-blue-900/20 border-y border-blue-200 dark:border-blue-700">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                    Miner
                  </th>
                  <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                    Type
                  </th>
                  <th className="text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                    Status
                  </th>
                  <th className="text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                    Hash Rate
                  </th>
                  <th className="text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                    Power
                  </th>
                  <th className="text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMiners.map((miner, index) => {
                  const statusClass = getStatusBadgeClass(miner.state);
                  const isExpanded = expandedMinerId === miner.id;
                  
                  return (
                    <React.Fragment key={miner.id}>
                      {/* Main miner row */}
                      <tr
                        className={`cursor-pointer ${
                          isExpanded
                            ? 'bg-blue-50 dark:bg-blue-900/20'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                        onClick={() => handleMinerClick(miner.id)}
                      >
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="font-bold text-gray-900 dark:text-gray-100">
                            {miner.name}
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {miner.type.name}
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-center">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}
                          >
                            {miner.state.charAt(0).toUpperCase() + miner.state.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-gray-100">
                          {(50 + Math.random() * 20).toFixed(1)} TH/s
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-gray-100">
                          {(2000 + Math.random() * 500).toFixed(0)} W
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-right text-sm">
                          <div className="flex justify-end items-center">
                            {/* Action buttons */}
                            <button className="p-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 mr-1">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30 mr-1">
                              <Download size={16} />
                            </button>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Animated expanded content container */}
                      <tr className={isExpanded ? "expanded-row" : "collapsed-row"}>
                        <td colSpan={6} className="p-0 bg-blue-50 dark:bg-blue-900/20">
                          <div 
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            {/* Only render the content when expanded for performance */}
                            {isExpanded && (
                              <div className="p-4">
                                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800">
                                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    Miner Details
                                  </h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="space-y-1">
                                      <p className="text-xs text-gray-500 dark:text-gray-400">IP Address</p>
                                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">192.168.1.{100 + index}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Hash Rate</p>
                                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{(50 + Math.random() * 20).toFixed(1)} TH/s</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Power</p>
                                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{(2000 + Math.random() * 500).toFixed(0)} W</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Temperature</p>
                                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{(55 + Math.random() * 10).toFixed(1)}°C</p>
                                    </div>
                                  </div>

                                  {/* Additional stats with lighter, softer background color */}
                                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-700 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="font-medium text-gray-900 dark:text-gray-100">
                                        Efficiency
                                      </span>
                                      <span className="font-bold text-gray-900 dark:text-gray-100">
                                        {(32 + Math.random() * 8).toFixed(2)} J/TH
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="font-medium text-gray-900 dark:text-gray-100">
                                        Daily Earnings
                                      </span>
                                      <span className="font-bold text-gray-900 dark:text-gray-100">
                                        ${(10 + Math.random() * 5).toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="font-medium text-gray-900 dark:text-gray-100">
                                        Uptime
                                      </span>
                                      <span className="font-bold text-gray-900 dark:text-gray-100">
                                        {(90 + Math.random() * 9.9).toFixed(1)}%
                                      </span>
                                    </div>
                                  </div>

                                  {/* Action buttons */}
                                  <div className="flex justify-end mt-4 gap-2">
                                    <button className="px-3 py-1.5 text-sm bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1.5">
                                      <Eye
                                        size={14}
                                        className="text-indigo-800 dark:text-indigo-200"
                                      />
                                      <span className="font-bold text-indigo-800 dark:text-indigo-200">
                                        View Details
                                      </span>
                                    </button>
                                    <button className="px-3 py-1.5 text-sm bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center gap-1.5">
                                      <Download
                                        size={14}
                                        className="text-green-800 dark:text-green-200"
                                      />
                                      <span className="font-bold text-green-800 dark:text-green-200">
                                        Export Stats
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMiners.map((miner, index) => {
            const statusClass = getStatusBadgeClass(miner.state);
            const isExpanded = expandedMinerId === miner.id;

            return (
              <div key={miner.id} className={`bg-white dark:bg-gray-750 border ${isExpanded ? 'border-blue-300 dark:border-blue-600 shadow-md' : 'border-gray-200 dark:border-gray-700 shadow-sm'} rounded-lg hover:shadow-md transition-shadow overflow-hidden`}>
                {/* Miner card header - always visible */}
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => handleMinerClick(miner.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{miner.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                      {miner.state.charAt(0).toUpperCase() + miner.state.slice(1)}
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
                  <div className="flex justify-between mt-3">
                    <div className="flex gap-1">
                      <button className="p-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30">
                        <Download size={16} />
                      </button>
                    </div>
                    <button 
                      className="p-1 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMinerClick(miner.id);
                      }}
                    >
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable content section with animation */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {isExpanded && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-700">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-700 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            Efficiency
                          </span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            {(32 + Math.random() * 8).toFixed(2)} J/TH
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            Daily Earnings
                          </span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            ${(10 + Math.random() * 5).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            Uptime
                          </span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            {(90 + Math.random() * 9.9).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 gap-2">
                        <button className="px-3 py-1.5 text-sm bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1.5">
                          <Eye
                            size={14}
                            className="text-indigo-800 dark:text-indigo-200"
                          />
                          <span className="font-bold text-indigo-800 dark:text-indigo-200">
                            View Details
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Global styles for animations */}
      <style jsx global>{`
        /* Add smooth transition for expanding/collapsing rows */
        .expanded-row, .collapsed-row {
          transition: all 0.3s ease-in-out;
        }
        
        /* Ensure content slides in smoothly */
        .expanded-row td > div {
          animation: slideDown 0.3s ease forwards;
        }
        
        .collapsed-row td > div {
          animation: slideUp 0.3s ease forwards;
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-10px);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}