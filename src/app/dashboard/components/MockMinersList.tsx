import React, { useState, useMemo } from "react";
import { ListFilter, Check, XCircle, BarChart, PieChart } from "lucide-react";
import {
  mockMiners,
  statusVariants,
  getMinerTypeDistribution,
} from "../mockData";

const MockMinersList = () => {
  const [filter, setFilter] = useState("online");
  const [viewMode, setViewMode] = useState("type");

  // Filter miners based on selected filter
  const filteredMiners = useMemo(() => {
    return mockMiners.filter((miner) => {
      if (filter === "online") return miner.seen;
      if (filter === "offline") return !miner.seen;
      return true;
    });
  }, [filter]);

  // Memoize calculations and data processing
  const { stats, minerTypes, stateStats } = useMemo(() => {
    // Basic stats
    const stats = {
      total: mockMiners.length,
      online: mockMiners.filter((m) => m.seen).length,
      offline: mockMiners.filter((m) => !m.seen).length,
    };

    // Calculate miner state distribution
    const stateStats = mockMiners.reduce((acc, miner) => {
      const state = miner.state || "unknown";
      if (!acc[state]) {
        acc[state] = { total: 0, percentage: 0 };
      }
      acc[state].total++;
      return acc;
    }, {});

    // Calculate percentages for states
    Object.values(stateStats).forEach((state) => {
      state.percentage =
        stats.total > 0 ? (state.total / stats.total) * 100 : 0;
    });

    // Get minerTypes from mockData helper
    const minerTypes = getMinerTypeDistribution();

    return { stats, minerTypes, stateStats: Object.entries(stateStats) };
  }, []);

  // Color schemes for visualization with dark mode support
  const colors = [
    {
      bar: "bg-blue-100 dark:bg-blue-900/30",
      fill: "bg-blue-500 dark:bg-blue-400",
      badge:
        "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400",
    },
    {
      bar: "bg-emerald-100 dark:bg-emerald-900/30",
      fill: "bg-emerald-500 dark:bg-emerald-400",
      badge:
        "border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400",
    },
    {
      bar: "bg-violet-100 dark:bg-violet-900/30",
      fill: "bg-violet-500 dark:bg-violet-400",
      badge:
        "border-violet-500 dark:border-violet-400 bg-violet-50 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400",
    },
    {
      bar: "bg-orange-100 dark:bg-orange-900/30",
      fill: "bg-orange-500 dark:bg-orange-400",
      badge:
        "border-orange-500 dark:border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400",
    },
  ];

  // Get appropriate icon for miner state
  const getStateIcon = (state) => {
    return statusVariants[state]?.icon || statusVariants.online.icon;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Active Miners
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Overview of all mining machines
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-2 py-1 rounded-md text-sm flex items-center ${
                filter === "all"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <ListFilter className="h-4 w-4 mr-2" />
              All
            </button>
            <button
              onClick={() => setFilter("online")}
              className={`px-2 py-1 rounded-md text-sm flex items-center ${
                filter === "online"
                  ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Check className="h-4 w-4 mr-2" />
              Online
            </button>
            <button
              onClick={() => setFilter("offline")}
              className={`px-2 py-1 rounded-md text-sm flex items-center ${
                filter === "offline"
                  ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Offline
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
                <ListFilter className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.total}
                </span>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Machines
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.online}
                </span>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Online
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
                <XCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.offline}
                </span>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Offline
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {viewMode === "status"
              ? `Status distribution of ${filteredMiners.length} miners`
              : `Type distribution of ${filteredMiners.length} miners`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("status")}
              className={`px-2 py-1 rounded-md text-sm flex items-center ${
                viewMode === "status"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Status View
            </button>
            <button
              onClick={() => setViewMode("type")}
              className={`px-2 py-1 rounded-md text-sm flex items-center ${
                viewMode === "type"
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <PieChart className="h-4 w-4 mr-2" />
              Type View
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px-2 text-sm font-normal text-gray-600 dark:text-gray-400 text-left border-b border-gray-200 dark:border-gray-700">
                  {viewMode === "status" ? "Status/State" : "Machine Type"}
                </th>
                <th className="py-3 px-2 text-sm font-normal text-gray-600 dark:text-gray-400 text-left border-b border-gray-200 dark:border-gray-700 min-w-[140px]">
                  Distribution
                </th>
                <th className="py-3 px-2 text-sm font-normal text-gray-600 dark:text-gray-400 text-left border-b border-gray-200 dark:border-gray-700 w-[180px]">
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
              {viewMode === "status"
                ? // Status View
                  stateStats.map(([state, data], index) => {
                    const color = colors[index % colors.length];
                    return (
                      <tr key={state}>
                        <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            {getStateIcon(state)}
                            <span className="capitalize text-gray-900 dark:text-gray-100">
                              {state}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                          <div
                            className={`relative h-[5px] rounded-full overflow-hidden min-w-[140px] ${color.bar}`}
                          >
                            <div
                              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${color.fill}`}
                              style={{ width: `${data.percentage}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center">
                            <div
                              className={`inline-flex items-center justify-center px-2 py-1 rounded-md border whitespace-nowrap text-xs sm:text-sm ${color.badge}`}
                            >
                              <span className="mr-1">{data.total}</span>
                              <span>({data.percentage.toFixed(1)}%)</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : // Type View
                  minerTypes.map((type, index) => {
                    const color = colors[index % colors.length];
                    const displayPercentage =
                      filter === "online"
                        ? (type.online / stats.online) * 100
                        : filter === "offline"
                        ? (type.offline / stats.offline) * 100
                        : type.percentage;
                    const count =
                      filter === "online"
                        ? `${type.online} online`
                        : filter === "offline"
                        ? `${type.offline} offline`
                        : `${type.total} (${type.online} online)`;

                    return (
                      <tr key={type.name}>
                        {/* FIXING THIS - using exact same styles as "Active Miners" title */}
                        <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-900 dark:text-gray-100">
                            {type.name}
                          </span>
                        </td>
                        <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                          <div
                            className={`relative h-[5px] rounded-full overflow-hidden min-w-[140px] ${color.bar}`}
                          >
                            <div
                              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${color.fill}`}
                              style={{ width: `${displayPercentage}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center">
                            <div
                              className={`inline-flex items-center justify-center px-2 py-1 rounded-md border whitespace-nowrap text-xs sm:text-sm ${color.badge}`}
                            >
                              <span className="mr-1">{count}</span>
                              <span>({displayPercentage.toFixed(1)}%)</span>
                            </div>
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
};

export default MockMinersList;