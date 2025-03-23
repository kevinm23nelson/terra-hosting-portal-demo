import React, { useState } from 'react';
import { 
  Zap, 
  Cloud, 
  CloudLightning,
  Server,
  LineChart, 
  BarChart
} from 'lucide-react';
import { mockAccount } from '../mockBillingData';

const MockSubscriptionsList = () => {
  const [viewMode, setViewMode] = useState('subscriptions');
  
  // Extract data from mockBillingData
  const mainSubscription = mockAccount.subscriptions.find(sub => 
    sub.plan.code === 'ENTERPRISE-MINING-PLAN'
  );
  
  // Define node types with pricing
  const nodeTypes = [
    {
      key: 'flux',
      name: 'Flux Nodes',
      icon: <Zap className="h-4 w-4 text-white" />,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      iconBg: 'bg-yellow-500 dark:bg-yellow-500',
      value: 5
    },
    {
      key: 'cumulus',
      name: 'Cumulus Nodes',
      icon: <Cloud className="h-4 w-4 text-white" />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconBg: 'bg-blue-500 dark:bg-blue-500',
      value: 2
    },
    {
      key: 'nimbus',
      name: 'Nimbus Nodes',
      icon: <CloudLightning className="h-4 w-4 text-white" />,
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconBg: 'bg-purple-500 dark:bg-purple-500',
      value: 1
    },
    {
      key: 'r8',
      name: 'R8 Nodes',
      icon: <Server className="h-4 w-4 text-white" />,
      bgColor: 'bg-gray-50 dark:bg-gray-700/40',
      iconBg: 'bg-gray-500 dark:bg-gray-500',
      value: 2
    }
  ];

  // Calculate the total nodes to match main subscription quantity
  const totalNodesFromPlan = mainSubscription ? mainSubscription.quantity : 10;
  
  // Calculate individual node counts to match the total
  const totalNodes = nodeTypes.reduce((sum, type) => sum + type.value, 0);
  
  // Normalize the node values if they don't match the subscription quantity
  if (totalNodes !== totalNodesFromPlan) {
    const scaleFactor = totalNodesFromPlan / totalNodes;
    nodeTypes.forEach(type => {
      // Round to whole number but ensure minimum of 1
      type.value = Math.max(1, Math.round(type.value * scaleFactor));
    });
  }
  
  // Regenerate distribution data based on the normalized node types
  const regeneratedTotalNodes = nodeTypes.reduce((sum, type) => sum + type.value, 0);
  
  const distributionData = nodeTypes.map(type => {
    const nodePercentage = (type.value / regeneratedTotalNodes) * 100;
    
    return {
      key: type.key,
      name: type.name,
      subscriptionPercentage: nodePercentage,
      nodePercentage: nodePercentage,
      activeSubscriptions: type.value,
      totalSubscriptions: type.value,
      activeNodes: type.value,
      totalNodes: type.value
    };
  });

  const colors = [
    {
      bar: 'bg-yellow-100 dark:bg-yellow-900/30',
      fill: 'bg-yellow-500 dark:bg-yellow-400',
      badge: 'border-yellow-500 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400',
    },
    {
      bar: 'bg-blue-100 dark:bg-blue-900/30',
      fill: 'bg-blue-500 dark:bg-blue-400',
      badge: 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400',
    },
    {
      bar: 'bg-purple-100 dark:bg-purple-900/30',
      fill: 'bg-purple-500 dark:bg-purple-400',
      badge: 'border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400',
    },
    {
      bar: 'bg-gray-100 dark:bg-gray-700/50',
      fill: 'bg-gray-500 dark:bg-gray-400',
      badge: 'border-gray-500 dark:border-gray-400 bg-gray-50 dark:bg-gray-700/30 text-gray-500 dark:text-gray-400',
    }
  ];

  // Total counts for the view mode labels
  const totalActive = distributionData.reduce((sum, item) => sum + item.activeSubscriptions, 0);
  const totalNodeCount = distributionData.reduce((sum, item) => sum + item.activeNodes, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm h-full flex flex-col">
      <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Node Distribution</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overview of node types and subscriptions</p>
        </div>

        {/* Node Type Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {nodeTypes.map((nodeType) => (
            <div key={nodeType.key} className={`${nodeType.bgColor} p-3 rounded-xl`}>
              <div className="flex items-center gap-2">
                <div className={`${nodeType.iconBg} w-8 h-8 rounded-full flex items-center justify-center`}>
                  {nodeType.icon}
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{nodeType.value}</span>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{nodeType.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {viewMode === 'subscriptions'
              ? `${totalActive} active nodes`
              : `Distribution of ${totalNodeCount} active nodes`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('subscriptions')}
              className={`px-2 py-1 rounded-md text-sm flex items-center ${
                viewMode === 'subscriptions' 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Subscriptions
            </button>
            <button
              onClick={() => setViewMode('nodes')}
              className={`px-2 py-1 rounded-md text-sm flex items-center ${
                viewMode === 'nodes' 
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <LineChart className="h-4 w-4 mr-2" />
              Nodes
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-grow">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px-2 text-sm font-normal text-gray-600 dark:text-gray-400 text-left border-b border-gray-200 dark:border-gray-700">
                  Node Type
                </th>
                <th className="py-3 px-2 text-sm font-normal text-gray-600 dark:text-gray-400 text-left border-b border-gray-200 dark:border-gray-700 min-w-[140px]">
                  Distribution
                </th>
                <th className="py-3 px-2 text-sm font-normal text-gray-600 dark:text-gray-400 text-left border-b border-gray-200 dark:border-gray-700 w-[180px]">
                  {viewMode === 'subscriptions' ? 'Active/Total' : 'Active Nodes/Total'}
                </th>
              </tr>
            </thead>
            <tbody className="flex-grow">
              {distributionData.map((plan, index) => {
                const percentage = viewMode === 'subscriptions'
                  ? plan.subscriptionPercentage
                  : plan.nodePercentage;

                const ratio = viewMode === 'subscriptions'
                  ? `${plan.activeSubscriptions}/${plan.totalSubscriptions}`
                  : `${plan.activeNodes}/${plan.totalNodes}`;

                const color = colors[index % colors.length];

                return (
                  <tr key={plan.key}>
                    {/* Fix for node type names - use the same text color as headings */}
                    <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-900 dark:text-gray-100">
                        {plan.name}
                      </span>
                    </td>
                    <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                      <div className={`relative h-[5px] rounded-full overflow-hidden min-w-[140px] ${color.bar}`}>
                        <div
                          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${color.fill}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className={`inline-flex items-center justify-center px-2 py-1 rounded-md border whitespace-nowrap text-xs sm:text-sm ${color.badge}`}>
                          <span className="mr-1">{ratio}</span>
                          <span>({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {/* Add dummy rows to fill space if needed for consistent height */}
              {distributionData.length < 5 && (
                Array(5 - distributionData.length).fill(0).map((_, index) => (
                  <tr key={`dummy-${index}`}>
                    <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700 h-[52px]"></td>
                    <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700"></td>
                    <td className="py-3 px-2 border-b border-gray-100 dark:border-gray-700"></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MockSubscriptionsList;