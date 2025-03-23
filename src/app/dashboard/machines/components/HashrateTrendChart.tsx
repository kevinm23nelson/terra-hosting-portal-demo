// src/app/dashboard/machines/components/HashrateTrendChart.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  TooltipProps,
} from 'recharts';

interface ChartData {
  month: string;
  hashrate: number;
}

interface PayloadItem {
  name: string;
  value: number;
  stroke: string;
  fill: string;
  dataKey: string;
}

// Custom tooltip component
interface CustomTooltipProps extends Omit<TooltipProps<number, string>, 'payload'> {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
      <p className="font-medium text-sm mb-1 text-gray-800 dark:text-gray-200">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm font-medium" style={{ color: entry.stroke }}>
          {entry.value.toFixed(2)} GH/s
        </p>
      ))}
    </div>
  );
};

export function HashrateTrendChart() {
  // Theme detection for dark mode
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const calculatedTheme = theme === 'system' ? systemTheme : theme;
    setCurrentTheme(calculatedTheme as 'light' | 'dark');
  }, [theme, systemTheme]);

  // Generate mock data for the past 6 months
  const generateMockData = (): ChartData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const currentYear = new Date().getFullYear();
    
    // Start with a base hashrate and slightly increase it each month (with some randomness)
    let baseHashrate = 50;
    
    return months.map((month) => {
      // Increase base hashrate each month (between 2-5 GH/s) with some randomness
      baseHashrate += Math.random() * 3 + 2;
      
      // Add some randomness to each month's value
      const monthHashrate = baseHashrate + (Math.random() * 5 - 2.5);
      
      return {
        month: `${month} ${currentYear}`,
        hashrate: parseFloat(monthHashrate.toFixed(2))
      };
    });
  };

  const chartData = generateMockData();

  // Dark mode color adjustments
  const chartColors = {
    text: currentTheme === 'dark' ? '#e5e7eb' : '#3F4759',
    grid: currentTheme === 'dark' ? '#374151' : '#f0f0f0',
    stroke: currentTheme === 'dark' ? '#60a5fa' : '#3b82f6', // Lighter blue in dark mode
    gradientStart: currentTheme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
    gradientEnd: 'rgba(59, 130, 246, 0)',
  };

  if (!mounted) {
    // Return a skeleton to avoid hydration mismatch
    return (
      <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="h-8 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
          <div className="h-[220px] w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Average Hashrate Per Machine</h2>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHashrate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors.stroke} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={chartColors.stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke={chartColors.grid}
                horizontal={true}
                vertical={false}
                strokeDasharray="3 0"
              />
              <XAxis
                dataKey="month"
                tickSize={0}
                axisLine={false}
                padding={{ left: 20, right: 20 }}
                tick={{
                  fontSize: 11,
                  fill: chartColors.text,
                }}
                tickMargin={8}
              />
              <YAxis
                tickSize={0}
                axisLine={false}
                tick={{
                  fontSize: 11,
                  fill: chartColors.text,
                }}
                tickFormatter={(value) => `${value}`}
                width={45}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="hashrate"
                name="Average Hashrate"
                stroke={chartColors.stroke}
                fillOpacity={1}
                fill="url(#colorHashrate)"
                strokeWidth={2.5}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}