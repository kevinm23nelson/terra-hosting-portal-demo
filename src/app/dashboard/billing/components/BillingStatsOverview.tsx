// app/(dashboard)/dashboard/quickbooks/components/BillingStatsOverview.tsx
'use client';

import { DollarSign, FileText, Clock, History } from 'lucide-react';

interface BillingStatsOverviewProps {
  customer: {
    DisplayName: string;
    Balance: number;
  };
  invoices: Array<{
    Balance: number;
    TotalAmt: number;
    DueDate?: string;
    TxnDate?: string;
  }>;
}

export function BillingStatsOverview({ customer, invoices }: BillingStatsOverviewProps) {
  const totalBalance = customer?.Balance || 0;
  const totalInvoices = invoices?.length || 0;
  const unpaidInvoices = invoices?.filter(inv => inv.Balance > 0).length || 0;

  // Calculate payment history stats
  const paidInvoices = invoices.filter(inv => inv.Balance === 0);
  const onTimePayments = paidInvoices.filter(inv => {
    if (!inv.DueDate || !inv.TxnDate) return false;
    return new Date(inv.TxnDate) <= new Date(inv.DueDate);
  });
  const paymentHistory = paidInvoices.length > 0
    ? Math.round((onTimePayments.length / paidInvoices.length) * 100)
    : 0;

  const statsCards = [
    {
      title: "Current Balance",
      value: `$${totalBalance.toFixed(2)}`,
      subtitle: "Outstanding Amount",
      subtitleValue: unpaidInvoices > 0 ? `${unpaidInvoices} Unpaid Invoices` : "All Invoices Paid",
      icon: DollarSign,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconBg: "bg-blue-500 dark:bg-blue-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300"
    },
    {
      title: "Total Invoices",
      value: totalInvoices.toString(),
      subtitle: "Invoice Status",
      subtitleValue: `${totalInvoices - unpaidInvoices} Paid / ${unpaidInvoices} Unpaid`,
      icon: FileText,
      bgColor: "bg-green-100 dark:bg-green-900/30",
      iconBg: "bg-green-500 dark:bg-green-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300"
    },
    {
      title: "Unpaid Invoices",
      value: unpaidInvoices.toString(),
      subtitle: "Pending Payments",
      subtitleValue: unpaidInvoices > 0 ? "Requires Attention" : "All Clear",
      icon: Clock,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconBg: "bg-purple-500 dark:bg-purple-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300"
    },
    {
      title: "Payment History",
      value: `${paymentHistory}%`,
      subtitle: "On-Time Payments",
      subtitleValue: `${onTimePayments.length} of ${paidInvoices.length} Invoices`,
      icon: History,
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      iconBg: "bg-orange-500 dark:bg-orange-600",
      valueColor: "text-gray-900 dark:text-white",
      textColor: "text-gray-700 dark:text-gray-200",
      subtitleColor: "text-gray-600 dark:text-gray-300"
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Miners Financial Overview
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Financial Status and Payment History
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <span className="text-sm font-semibold dark:text-gray-300">Refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`rounded-xl p-4 ${card.bgColor} transition-all duration-200 hover:shadow-md`}
              >
                <div
                  className={`${card.iconBg} w-9 h-9 rounded-full flex items-center justify-center`}
                >
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

                <p className={`text-sm ${card.subtitleColor}`}>{card.subtitle}</p>
                <p className={`text-sm ${card.subtitleColor}`}>{card.subtitleValue}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}