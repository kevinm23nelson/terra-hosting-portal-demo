import React, { useState } from "react";
import { Download, Eye, ChevronDown, ChevronUp, Calendar } from "lucide-react";

interface InvoicesListProps {
  invoices: Array<{
    Id: string;
    DocNumber: string;
    TxnDate: string;
    DueDate: string;
    TotalAmt: number;
    Balance: number;
    CustomerRef?: {
      value: string;
      name: string;
    };
    Line: Array<{
      Amount: number;
      Description?: string;
    }>;
  }>;
}

export function InvoicesList({ invoices }: InvoicesListProps) {
  const [expandedInvoiceId, setExpandedInvoiceId] = useState<string | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "unpaid">(
    "all"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper to get status based on balance - earthly pastel colors with more contrast
  const getInvoiceStatus = (totalAmt: number, balance: number) => {
    if (balance === 0)
      return {
        text: "Paid",
        className:
          "bg-green-200 text-green-950 dark:bg-green-900/50 dark:text-green-50 font-extrabold",
      };
    if (balance === totalAmt)
      return {
        text: "Unpaid",
        className:
          "bg-rose-200 text-rose-950 dark:bg-rose-900/50 dark:text-rose-50 font-extrabold",
      };
    if (balance > 0)
      return {
        text: "Partial",
        className:
          "bg-amber-200 text-amber-950 dark:bg-amber-900/50 dark:text-amber-50 font-extrabold",
      };
    return {
      text: "Unknown",
      className:
        "bg-gray-200 text-gray-950 dark:bg-gray-900/50 dark:text-gray-50 font-extrabold",
    };
  };
  const sortedInvoices = [...invoices].sort(
    (a, b) => new Date(b.TxnDate).getTime() - new Date(a.TxnDate).getTime()
  );
  const handleInvoiceClick = (invoiceId: string) => {
    setExpandedInvoiceId(expandedInvoiceId === invoiceId ? null : invoiceId);
    // Close filter dropdown when clicking on an invoice
    setIsFilterOpen(false);
  };

  // Add click outside handler to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.querySelector(".filter-dropdown");
      if (dropdown && !dropdown.contains(target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter invoices based on status
  const filteredInvoices = sortedInvoices.filter((invoice) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "paid") return invoice.Balance === 0;
    if (statusFilter === "unpaid") return invoice.Balance > 0;
    return true;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden">
      <div className="flex flex-row items-center justify-between p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Invoice History
        </h2>
        <div className="flex space-x-2">
          {/* Status filter dropdown with toggling functionality */}
          <div className="relative filter-dropdown">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                statusFilter === "all"
                  ? "bg-blue-200 text-blue-950 dark:bg-blue-900/60 dark:text-blue-50 border border-blue-300 dark:border-blue-700 font-bold"
                  : statusFilter === "paid"
                  ? "bg-green-200 text-green-950 dark:bg-green-900/60 dark:text-green-50 border border-green-300 dark:border-green-700 font-bold"
                  : "bg-rose-200 text-rose-950 dark:bg-rose-900/60 dark:text-rose-50 border border-rose-300 dark:border-rose-700 font-bold"
              }`}
            >
              <span>
                {statusFilter === "all"
                  ? "All Invoices"
                  : statusFilter === "paid"
                  ? "Paid Only"
                  : "Unpaid Only"}
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
                    setStatusFilter("all");
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === "all"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  All Invoices
                </button>
                <button
                  onClick={() => {
                    setStatusFilter("paid");
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === "paid"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  Paid Only
                </button>
                <button
                  onClick={() => {
                    setStatusFilter("unpaid");
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusFilter === "unpaid"
                      ? "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200"
                      : "text-gray-800 dark:text-gray-200"
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
                  Due Date
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
                const status = getInvoiceStatus(
                  invoice.TotalAmt,
                  invoice.Balance
                );
                const isExpanded = expandedInvoiceId === invoice.Id;

                return (
                  <React.Fragment key={invoice.Id}>
                    {/* Lighter colors for expanded rows */}
                    <tr
                      className={`cursor-pointer ${
                        isExpanded
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                      onClick={() => handleInvoiceClick(invoice.Id)}
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                          #{invoice.DocNumber}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {formatDate(invoice.TxnDate)}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
                          <Calendar className="h-4 w-4 mr-1.5 text-gray-700 dark:text-gray-300" />
                          {formatDate(invoice.DueDate)}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-gray-100">
                        ${invoice.TotalAmt.toFixed(2)}
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
                          {/* Lighter action buttons */}
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

                    {/* Animated expanded row with invoice details */}
                    <tr className={isExpanded ? "expanded-row" : "collapsed-row"}>
                      <td colSpan={6} className="p-0 bg-blue-50 dark:bg-blue-900/20">
                        <div 
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {/* Only render the content when expanded for performance */}
                          {isExpanded && (
                            <div className="p-4">
                              <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800">
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                                  Line Items
                                </h4>
                                <div className="space-y-2 mb-4">
                                  {invoice.Line.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between text-sm py-2 border-b border-blue-100 dark:border-blue-800 last:border-0"
                                    >
                                      <span className="font-medium text-gray-900 dark:text-gray-100">
                                        {item.Description || `Item ${index + 1}`}
                                      </span>
                                      <span className="font-bold text-gray-900 dark:text-gray-100">
                                        ${item.Amount.toFixed(2)}
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
                                      ${invoice.TotalAmt.toFixed(2)}
                                    </span>
                                  </div>

                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                      Balance
                                    </span>
                                    <span
                                      className={
                                        invoice.Balance > 0
                                          ? "font-bold text-red-700 dark:text-red-300"
                                          : "font-bold text-green-700 dark:text-green-300"
                                      }
                                    >
                                      ${invoice.Balance.toFixed(2)}
                                    </span>
                                  </div>
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
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        /* Add smooth transition for expanding/collapsing rows */
        .expanded-row, .collapsed-row {
          transition: all 0.3s ease-in-out;
        }
        
        /* Ensure content slides in smoothly */
        .expanded-row td > div {
          animation: slideDown 0.3s ease forwards;
        }
        
        .collapsed-row td > div {
          animation: slideUp 0.3s ease forwards;
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-10px);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}