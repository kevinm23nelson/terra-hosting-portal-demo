// app/(dashboard)/dashboard/billing/components/BillingStatsOverview.tsx
'use client';

import { CreditCard, Calendar, DollarSign, Receipt } from 'lucide-react';

interface BillingStatsOverviewProps {
  account: {
    id: string;
    subscriptions: Array<{
      total: number;
      state: string;
      current_period_ends_at: string;
      quantity: number;
      node_distribution?: Array<{
        type: string;
        name: string;
        price: number;
        count: number;
      }>;
    }>;
    has_active_subscription: boolean;
  };
  invoices: Array<{
    total: number;
    paid: number;
    state: string;
    account: {
      id: string;
      code: string;
    };
  }>;
}

export function BillingStatsOverview({ account, invoices = [] }: BillingStatsOverviewProps) {
  // Filter invoices for current account
  const clientInvoices = invoices.filter(invoice => 
    invoice.account?.id === account.id
  );

  // Calculate stats
  const activeSubscriptions = account.subscriptions?.filter(sub => sub.state === 'active') || [];
  
  // Calculate total nodes from node_distribution
  const mainSubscription = activeSubscriptions.find(sub => sub.node_distribution);
  const nodeDistribution = mainSubscription?.node_distribution || [];
  const totalNodes = nodeDistribution.reduce((sum, node) => sum + node.count, 0);
  
  const monthlyTotal = activeSubscriptions.reduce((sum, sub) => sum + sub.total, 0);
  
  const totalBilled = clientInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = clientInvoices.reduce((sum, inv) => sum + inv.paid, 0);
  const outstandingBalance = totalBilled - totalPaid;
  
  const nextPaymentDate = activeSubscriptions[0]
    ? new Date(activeSubscriptions[0].current_period_ends_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : 'N/A';

  const paidInvoices = clientInvoices.filter(inv => inv.state === 'paid').length;
  const unpaidInvoices = clientInvoices.filter(inv => inv.state !== 'paid').length;

  // Count node types
  const nodeTypeCount = nodeDistribution.length;
  
  const stats = [
    {
      title: "Monthly Subscription",
      value: `$${monthlyTotal.toFixed(2)}`,
      subtitle: "Active Nodes",
      subtitleValue: `${totalNodes} Nodes (${nodeTypeCount} types)`,
      additionalInfo: `Billed monthly`,
      icon: CreditCard,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconBg: "bg-blue-500 dark:bg-blue-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300"
    },
    {
      title: "Outstanding Balance",
      value: `$${outstandingBalance.toFixed(2)}`,
      subtitle: "Invoice Status",
      subtitleValue: `${paidInvoices} Paid / ${unpaidInvoices} Unpaid`,
      additionalInfo: `${clientInvoices.length} Total Invoices`,
      icon: DollarSign,
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      iconBg: "bg-orange-500 dark:bg-orange-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300"
    },
    {
      title: "Next Payment",
      value: nextPaymentDate,
      subtitle: "Due Date",
      subtitleValue: activeSubscriptions.length > 0 ? "Active Subscription" : "No Active Subscription",
      icon: Calendar,
      bgColor: "bg-green-100 dark:bg-green-900/30",
      iconBg: "bg-green-500 dark:bg-green-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300"
    },
    {
      title: "Total Paid",
      value: `$${totalPaid.toFixed(2)}`,
      subtitle: "Lifetime Payments",
      subtitleValue: `${paidInvoices} Completed Invoices`,
      icon: Receipt,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconBg: "bg-purple-500 dark:bg-purple-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200", 
      subtitleColor: "text-gray-600 dark:text-gray-300"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Node Billing Overview
            </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Node Subscription Summary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((card, index) => {
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
                
                <p className={`text-sm ${card.subtitleColor}`}>{card.subtitleValue}</p>
                <p className={`text-sm ${card.subtitleColor}`}>{card.subtitle}</p>
                
                {card.additionalInfo && (
                  <p className={`text-sm ${card.subtitleColor} mt-1`}>
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