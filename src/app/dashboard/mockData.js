// src/app/dashboard/mockData.js
import { Activity, Clock, AlertTriangle, Wrench } from 'lucide-react';

// Generate a random hash rate between min and max
const generateHashRate = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mock miners data with hash rates
export const mockMiners = [
  { id: '1', name: 'Antminer S19k Pro (120T)', type: { id: '1', name: 'Antminer S19k Pro' }, seen: true, state: 'online', hashRate: generateHashRate(50, 70) },
  { id: '2', name: 'Antminer S19k Pro (120T)', type: { id: '1', name: 'Antminer S19k Pro' }, seen: true, state: 'online', hashRate: generateHashRate(50, 70) },
  { id: '3', name: 'Antminer L9 (17G)', type: { id: '2', name: 'Antminer L9' }, seen: true, state: 'online', hashRate: generateHashRate(50, 70) },
  { id: '4', name: 'Antminer L9 (17G)', type: { id: '2', name: 'Antminer L9' }, seen: true, state: 'online', hashRate: generateHashRate(50, 70) },
  { id: '5', name: 'Antminer L7 (9050)', type: { id: '3', name: 'Antminer L7 (9050)' }, seen: true, state: 'online', hashRate: generateHashRate(50, 70) },
  { id: '6', name: 'Antminer L7 (9050)', type: { id: '3', name: 'Antminer L7 (9050)' }, seen: false, state: 'offline', hashRate: 0 },
  { id: '7', name: 'Antminer L7 (8800)', type: { id: '4', name: 'Antminer L7 (8800)' }, seen: true, state: 'online', hashRate: generateHashRate(50, 70) },
  { id: '8', name: 'Antminer L7 (8800)', type: { id: '4', name: 'Antminer L7 (8800)' }, seen: false, state: 'maintenance', hashRate: 0 },
  { id: '9', name: 'Antminer KS3', type: { id: '5', name: 'Antminer KS3' }, seen: true, state: 'online', hashRate: generateHashRate(50, 70) },
  { id: '10', name: 'Antminer KS3', type: { id: '5', name: 'Antminer KS3' }, seen: false, state: 'sleeping', hashRate: 0 },
];

// Calculate total hash rate of online miners
const totalHashRate = mockMiners
  .filter(miner => miner.state === 'online')
  .reduce((sum, miner) => sum + miner.hashRate, 0);

// Calculate average hash rate of online miners
const onlineMiners = mockMiners.filter(miner => miner.state === 'online');
const avgHashRate = onlineMiners.length > 0 
  ? totalHashRate / onlineMiners.length 
  : 0;

// Calculated stats based on mockMiners
export const minerStats = {
  total: mockMiners.length,
  online: mockMiners.filter(m => m.seen).length,
  offline: mockMiners.filter(m => !m.seen).length,
  hashing: mockMiners.filter(m => m.state === 'online').length,
  inRepair: mockMiners.filter(m => m.state === 'maintenance').length,
  sleeping: mockMiners.filter(m => m.state === 'sleeping').length,
  totalHashRate: totalHashRate,
  avgHashRate: avgHashRate
};

// Get minerTypes from mockMiners
export const getMinerTypeDistribution = () => {
  const typeStats = mockMiners.reduce((acc, miner) => {
    const typeName = miner.type?.name || 'Unknown';
    if (!acc[typeName]) {
      acc[typeName] = { 
        name: typeName,
        total: 0, 
        online: 0, 
        offline: 0,
        color: getColorForType(typeName),
        totalHashRate: 0
      };
    }
    acc[typeName].total++;
    if (miner.seen) {
      acc[typeName].online++;
      acc[typeName].totalHashRate += miner.hashRate;
    } else {
      acc[typeName].offline++;
    }
    return acc;
  }, {});

  // Convert to array and calculate percentages
  return Object.values(typeStats).map(type => ({
    ...type,
    percentage: (type.total / mockMiners.length) * 100,
    active: type.online,
    avgTypeHashRate: type.online > 0 ? type.totalHashRate / type.online : 0
  }));
};

// Function to get consistent colors for types
function getColorForType(typeName) {
  if (typeName.includes('S19k')) return 'bg-blue-500';
  if (typeName.includes('L9')) return 'bg-green-500';
  if (typeName.includes('L7 (9050)')) return 'bg-violet-500';
  if (typeName.includes('L7 (8800)')) return 'bg-orange-500';
  if (typeName.includes('KS3')) return 'bg-blue-500';
  return 'bg-gray-500';
}

// Performance metrics
export const performanceMetrics = {
  hashRate: totalHashRate,
  powerCost: 0.08,
  powerRate: 1.0,
  powerDraw: 2771.63,
  avgHashRate: avgHashRate
};

// Status mapping for UI elements
export const statusVariants = {
  online: { 
    icon: <Activity className="h-4 w-4 text-green-500" />,
    badge: 'bg-green-100 text-green-800'
  },
  maintenance: { 
    icon: <Wrench className="h-4 w-4 text-blue-500" />,
    badge: 'bg-blue-100 text-blue-800'
  },
  offline: { 
    icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
    badge: 'bg-red-100 text-red-800'
  },
  sleeping: { 
    icon: <Clock className="h-4 w-4 text-orange-500" />,
    badge: 'bg-orange-100 text-orange-800'
  }
};