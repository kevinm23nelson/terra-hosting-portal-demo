"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "./components/DashboardLayout";
import LoginTracker from "./components/LoginTracker";
import MockMinersList from "./components/MockMinersList";
import MockSubscriptionsList from "./components/MockSubscriptionsList";
import StatsCards from "./components/StatsCards";
import { Monitor, Zap, Server, CreditCard } from "lucide-react";
import { mockMiners, minerStats } from "./mockData";
import { mockAccount, getBillingStats } from "./mockBillingData";
import { getQuickBooksStats } from "./mockQuickBooksData";

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Get client data from mock files
  const clientName = mockAccount?.first_name
    ? `${mockAccount.first_name} ${mockAccount.last_name}`
    : "Demo Client";

  // Get billing stats
  const billingStats = getBillingStats();

  // Get QuickBooks stats
  const quickbooksStats = getQuickBooksStats();

  // Combine stats from multiple sources
  const stats = {
    // Machine data from mockData.js
    totalMachines: minerStats.total,
    onlineMachines: minerStats.online,
    hashRate: minerStats.avgHashRate.toFixed(1),

    // Power data from mockData.js
    powerDraw: Math.round(mockMiners.length * 100), // Estimate based on number of machines
    curtailablePower: Math.round(mockMiners.length * 100 * 0.6), // Estimate 60% as curtailable

    // Billing data from mockBillingData.js
    totalNodes: billingStats.totalNodes,
    monthlyTotal: billingStats.monthlyTotal.toFixed(2),
    activeSubscriptions: billingStats.activeSubscriptionsCount,

    // Balance from QuickBooks mock data
    outstandingBalance: quickbooksStats.totalBalance,
    paidInvoices: quickbooksStats.paidInvoices,
    unpaidInvoices: quickbooksStats.unpaidInvoices,
  };

  // Generate stats cards with updated styling to match other components
  const statsCards = [
    {
      title: "Machine Overview",
      value: stats.totalMachines.toString(),
      subtitle: "Total Machines",
      subtitleValue: `${(
        (stats.onlineMachines / stats.totalMachines) *
        100
      ).toFixed(1)}% Online`,
      additionalInfo: `${stats.hashRate} GH/s Avg Hashrate`,
      icon: Server,
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-500",
      darkBgColor: "dark:bg-blue-900/30",
      darkIconBg: "dark:bg-blue-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300",
    },
    {
      title: "Power Management",
      value: `${stats.powerDraw}kW`,
      subtitle: "Total Power Draw",
      subtitleValue: `${stats.curtailablePower}kW Curtailable`,
      icon: Zap,
      bgColor: "bg-green-100",
      iconBg: "bg-green-500",
      darkBgColor: "dark:bg-green-900/30",
      darkIconBg: "dark:bg-green-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300",
    },
    {
      title: "Subscribed Nodes",
      value: stats.totalNodes.toString(),
      subtitle: "Active Subscriptions",
      subtitleValue: `${stats.activeSubscriptions} Total`,
      additionalInfo: `$${stats.monthlyTotal}/month`,
      icon: CreditCard,
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-500",
      darkBgColor: "dark:bg-purple-900/30",
      darkIconBg: "dark:bg-purple-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300",
    },
    {
      title: "Outstanding Balance",
      value: `$${stats.outstandingBalance.toFixed(2)}`,
      subtitle: "Invoice Status",
      subtitleValue: `${stats.paidInvoices} Paid / ${stats.unpaidInvoices} Unpaid`,
      additionalInfo: `${quickbooksStats.totalInvoices} Total Invoices`,
      icon: Monitor,
      bgColor: "bg-orange-100",
      iconBg: "bg-orange-500",
      darkBgColor: "dark:bg-orange-900/30",
      darkIconBg: "dark:bg-orange-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300",
    },
  ];

  // Trigger animations after component mount
  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation classes to be applied conditionally
  const fadeIn = "transition-all duration-500 ease-out";
  const hidden = "opacity-0 translate-y-6";
  const visible = "opacity-100 translate-y-0";

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Top Section: Stats Overview and Login Tracker */}
        <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 auto-rows-fr ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "100ms" }}>
          <div className="xl:col-span-2 min-h-0">
            <StatsCards
              cards={statsCards}
              title={`Welcome Back, ${clientName}`}
              subtitle="Current Terra Account Operations"
            />
          </div>
          <div className="xl:col-span-1 min-h-0">
            <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "250ms" }}>
              <LoginTracker />
            </div>
          </div>
        </div>

        {/* Main Content: Miners and Subscriptions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Miners List */}
          <div className={`xl:col-span-1 ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "400ms" }}>
            <MockMinersList />
          </div>

          {/* Subscriptions List */}
          <div className={`xl:col-span-1 ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "550ms" }}>
            <MockSubscriptionsList />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "700ms" }}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                date: "2025-03-19",
                event: "New mining rig deployed",
                type: "info",
              },
              {
                date: "2025-03-17",
                event: "Monthly maintenance completed",
                type: "success",
              },
              {
                date: "2025-03-15",
                event: "Power optimization performed",
                type: "info",
              },
              {
                date: "2025-03-12",
                event: "Alert: Machine B2 offline",
                type: "warning",
              },
              {
                date: "2025-03-10",
                event: "Subscription renewed",
                type: "info",
              },
            ].map((activity, index) => (
              <div 
                key={index} 
                className={`flex items-start ${fadeIn} ${isLoaded ? visible : hidden}`}
                style={{ transitionDelay: `${750 + index * 50}ms` }}
              >
                <div
                  className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${
                    activity.type === "info"
                      ? "bg-blue-500"
                      : activity.type === "success"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <div className="ml-4">
                  <p className="text-gray-900 dark:text-gray-100">
                    {activity.event}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}