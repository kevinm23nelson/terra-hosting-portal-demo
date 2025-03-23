// components/StatsCards.tsx
'use client';

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  cards: Array<{
    title: string;
    value: string;
    subtitle: string;
    subtitleValue?: string;
    additionalInfo?: string;
    icon: LucideIcon;
    bgColor: string;
    iconBg: string;
    darkBgColor: string;
    darkIconBg: string;
    valueColor?: string;
    textColor?: string;
    subtitleColor?: string;
  }>;
  title: string;
  subtitle: string;
}

export default function StatsCards({ cards, title, subtitle }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`rounded-xl p-4 ${card.bgColor} ${card.darkBgColor} transition-all duration-200 hover:shadow-md`}
              >
                <div className={`${card.iconBg} ${card.darkIconBg} w-9 h-9 rounded-full flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                
                <div className="mt-3 mb-1">
                  <span className={`text-2xl font-bold ${card.valueColor || 'text-gray-900 dark:text-gray-100'}`}>
                    {card.value}
                  </span>
                </div>
                
                <p className={`text-sm font-semibold ${card.textColor || 'text-gray-800 dark:text-gray-200'}`}>
                  {card.title}
                </p>
                
                <p className={`text-sm ${card.subtitleColor || 'text-gray-600 dark:text-gray-400'}`}>{card.subtitleValue}</p>
                <p className={`text-sm ${card.subtitleColor || 'text-gray-600 dark:text-gray-400'}`}>{card.subtitle}</p>
                
                {card.additionalInfo && (
                  <p className={`text-sm ${card.subtitleColor || 'text-gray-600 dark:text-gray-400'} mt-1`}>
                    {card.additionalInfo}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}