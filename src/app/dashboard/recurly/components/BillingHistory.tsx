import React, { useState, useEffect } from 'react';
import { Download, Eye, ChevronDown, ChevronUp, Zap, Cloud, CloudLightning, Server } from 'lucide-react';

// Define TypeScript interfaces for the component
interface LineItem {
  description?: string;
  amount: number;
}

interface Account {
  id: string;
  code?: string;
  // Add other account properties as needed
}

interface Invoice {
  id: string;
  number: string;
  description?: string; // Make description optional
  state: string;
  total: number;
  paid: number;
  created_at: string;
  line_items: LineItem[];
  account?: Account;
}

interface BillingHistoryProps {
  invoices: Invoice[];
  accountId: string;
}

export function BillingHistory({ invoices = [], accountId }: BillingHistoryProps) {
  const [expandedInvoiceId, setExpandedInvoiceId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter invoices to only show those belonging to the current account
  const filteredInvoices = invoices
    .filter(invoice => invoice.account?.id === accountId)
    .filter(invoice => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'paid') return invoice.state.toLowerCase() === 'paid';
      if (statusFilter === 'unpaid') return ['pending', 'past_due'].includes(invoice.state.toLowerCase());
      return true;
    });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper to get status badge styling
  const getInvoiceStatus = (state: string) => {
    switch (state.toLowerCase()) {
      case 'paid':
        return {
          text: 'Paid',
          className: 'bg-green-200 text-green-950 dark:bg-green-900/50 dark:text-green-50 font-extrabold'
        };
      case 'pending':
        return {
          text: 'Pending',
          className: 'bg-amber-200 text-amber-950 dark:bg-amber-900/50 dark:text-amber-50 font-extrabold'
        };
      case 'past_due':
        return {
          text: 'Past Due',
          className: 'bg-rose-200 text-rose-950 dark:bg-rose-900/50 dark:text-rose-50 font-extrabold'
        };
      default:
        return {
          text: state || 'Unknown',
          className: 'bg-gray-200 text-gray-950 dark:bg-gray-900/50 dark:text-gray-50 font-extrabold'
        };
    }
  };

  const handleInvoiceClick = (invoiceId: string) => {
    setExpandedInvoiceId(expandedInvoiceId === invoiceId ? null : invoiceId);
    // Close filter dropdown when clicking on an invoice
    setIsFilterOpen(false);
  };

  // Helper to get node icon for line items
  const getNodeIconForDescription = (description: string | null | undefined) => {
    if (!description) return null;
    
    if (description.toLowerCase().includes('flux')) {
      return <Zap className="h-4 w-4 mr-2 text-yellow-500" />;
    } else if (description.toLowerCase().includes('cumulus')) {
      return <Cloud className="h-4 w-4 mr-2 text-blue-500" />;
    } else if (description.toLowerCase().includes('nimbus')) {
      return <CloudLightning className="h-4 w-4 mr-2 text-purple-500" />;
    } else if (description.toLowerCase().includes('r8')) {
      return <Server className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />;
    }
    return null;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.querySelector('.filter-dropdown');
      if (dropdown && !dropdown.contains(target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (filteredInvoices.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Billing History</h2>
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No invoices found for this account.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="flex flex-row items-center justify-between p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Billing History</h2>
        <div className="flex space-x-2">
          {/* Status filter dropdown with toggling functionality */}
          <div className="relative filter-dropdown">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                statusFilter === 'all'
                  ? 'bg-blue-200 text-blue-950 dark:bg-blue-900/60 dark:text-blue-50 border border-blue-300 dark:border-blue-700 font-bold'
                  : statusFilter === 'paid'
                    ? 'bg-green-200 text-green-950 dark:bg-green-900/60 dark:text-green-50 border border-green-300 dark:border-green-700 font-bold'
                    : 'bg-rose-200 text-rose-950 dark:bg-rose-900/60 dark:text-rose-50 border border-rose-300 dark:border-rose-700 font-bold'
              }`}
            >
              <span>
                {statusFilter === 'all'
                  ? 'All Invoices'
                  : statusFilter === 'paid'
                    ? 'Paid Only'
                    : 'Unpaid Only'}
              </span>
              {isFilterOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === 'all'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  All Invoices
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('paid');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === 'paid'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Paid Only
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('unpaid');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === 'unpaid'
                      ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Unpaid Only
                </button>
              </div>
            )}
          </div>

          {/* Export button with higher contrast */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-200 text-green-950 dark:bg-green-900/50 dark:text-green-50 border border-green-300 dark:border-green-700 rounded-lg hover:bg-green-300 dark:hover:bg-green-800 transition-colors font-bold">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Lighter header background */}
            <thead className="bg-blue-50 dark:bg-blue-900/20 border-y border-blue-200 dark:border-blue-700">
              <tr>
                <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                  Invoice #
                </th>
                <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                  Date
                </th>
                <th className="text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                  Description
                </th>
                <th className="text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                  Amount
                </th>
                <th className="text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                  Status
                </th>
                <th className="text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.map((invoice) => {
                const status = getInvoiceStatus(invoice.state);
                const isExpanded = expandedInvoiceId === invoice.id;
                
                return (
                  <React.Fragment key={invoice.id}>
                    {/* Main invoice row */}
                    <tr
                      className={`cursor-pointer ${
                        isExpanded
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => handleInvoiceClick(invoice.id)}
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                          #{invoice.number}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {formatDate(invoice.created_at)}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {invoice.description || 'Monthly Billing'}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-gray-100">
                        ${invoice.total.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}
                        >
                          {status.text}
                        </span>
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

                    {/* Expanded invoice details */}
                    {isExpanded && (
                      <tr>
                        <td
                          colSpan={6}
                          className="bg-blue-50 dark:bg-blue-900/20 p-4"
                        >
                          <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800">
                            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                              Line Items
                            </h4>
                            <div className="space-y-2 mb-4">
                              {invoice.line_items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between text-sm py-2 border-b border-blue-100 dark:border-blue-800 last:border-0"
                                >
                                  <span className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                                    {getNodeIconForDescription(item.description)}
                                    {item.description || `Item ${index + 1}`}
                                  </span>
                                  <span className="font-bold text-gray-900 dark:text-gray-100">
                                    ${item.amount.toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Totals with lighter, softer background color */}
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-700 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  Total
                                </span>
                                <span className="font-bold text-gray-900 dark:text-gray-100">
                                  ${invoice.total.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  Amount Paid
                                </span>
                                <span className="font-bold text-gray-900 dark:text-gray-100">
                                  ${invoice.paid.toFixed(2)}
                                </span>
                              </div>
                              
                              {invoice.total - invoice.paid > 0 && (
                                <div className="flex justify-between text-sm border-t pt-2 border-indigo-200 dark:border-indigo-700">
                                  <span className="font-medium text-gray-900 dark:text-gray-100">
                                    Balance
                                  </span>
                                  <span className="font-bold text-red-700 dark:text-red-300">
                                    ${(invoice.total - invoice.paid).toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Download button with lighter colors */}
                            <div className="flex justify-end mt-4">
                              <button className="px-3 py-1.5 text-sm bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center gap-1.5">
                                <Download
                                  size={14}
                                  className="text-green-800 dark:text-green-200"
                                />
                                <span className="font-bold text-green-800 dark:text-green-200">
                                  Download PDF
                                </span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillingHistory;