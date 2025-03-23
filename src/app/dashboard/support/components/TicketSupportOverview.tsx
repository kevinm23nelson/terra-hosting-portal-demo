'use client';

import {
  Ticket as TicketIcon,
  Bot,
  Clock,
  AlertOctagon
} from 'lucide-react';

interface TicketSupportOverviewProps {
  stats: {
    total: number;
    open: number;
    inProgress: number;
    completed: number;
    closed: number;
    highPriority: number;
    avgResponseTime: string;
  };
}

export function TicketSupportOverview({ stats }: TicketSupportOverviewProps) {
  // Define the stats cards
  const statCards = [
    {
      title: 'Total Tickets',
      value: stats.total.toString(),
      subtitle: 'Active Tickets',
      subtitleValue: stats.open + stats.inProgress,
      icon: TicketIcon,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconBg: 'bg-blue-500 dark:bg-blue-600',
      valueColor: 'text-gray-900 dark:text-white',
      textColor: 'text-gray-700 dark:text-gray-200',
      subtitleColor: 'text-gray-600 dark:text-gray-300'
    },
    {
      title: 'Average Response',
      value: stats.avgResponseTime,
      subtitle: 'Response Time',
      subtitleValue: 'Time to First Reply',
      icon: Clock,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconBg: 'bg-green-500 dark:bg-green-600',
      valueColor: 'text-gray-900 dark:text-white',
      textColor: 'text-gray-700 dark:text-gray-200',
      subtitleColor: 'text-gray-600 dark:text-gray-300'
    },
    {
      title: 'High Priority',
      value: stats.highPriority.toString(),
      subtitle: 'Tickets',
      subtitleValue: 'Requires Attention',
      icon: AlertOctagon,
      bgColor: 'bg-orange-100 dark:bg-orange-900/30', // Changed from red to orange to match
      iconBg: 'bg-orange-500 dark:bg-orange-600',
      valueColor: 'text-gray-900 dark:text-white',
      textColor: 'text-gray-700 dark:text-gray-200',
      subtitleColor: 'text-gray-600 dark:text-gray-300'
    },
    {
      title: 'AI Assistant',
      value: 'Available',
      subtitle: '24/7 Support',
      subtitleValue: 'Automated Help',
      icon: Bot,
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconBg: 'bg-purple-500 dark:bg-purple-600',
      valueColor: 'text-gray-900 dark:text-white',
      textColor: 'text-gray-700 dark:text-gray-200',
      subtitleColor: 'text-gray-600 dark:text-gray-300'
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Support Overview
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Support Status & Statistics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`rounded-xl p-4 ${card.bgColor} transition-all duration-200 hover:shadow-md`}
              >
                <div className={`${card.iconBg} w-9 h-9 rounded-full flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                
                <div className="mt-3 mb-1">
                  <span className={`text-2xl font-bold ${card.valueColor}`}>
                    {card.value}
                  </span>
                </div>
                
                <p className={`text-sm font-semibold ${card.textColor}`}>
                  {card.title}
                </p>
                
                {typeof card.subtitleValue === 'number' ? (
                  <p className={`text-sm ${card.subtitleColor}`}>
                    {card.subtitleValue} {card.subtitle}
                  </p>
                ) : (
                  <>
                    <p className={`text-sm ${card.subtitleColor}`}>{card.subtitle}</p>
                    <p className={`text-sm ${card.subtitleColor}`}>{card.subtitleValue}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}