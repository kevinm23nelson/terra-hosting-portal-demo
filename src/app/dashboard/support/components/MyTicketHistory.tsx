"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle2,
  XCircle,
  CheckCircle,
  Info,
  TicketIcon,
  History,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TicketDetails } from "./TicketDetails";
// Import the shared types
import { Ticket } from "../../../types";

interface MyTicketHistoryProps {
  tickets: Ticket[];
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function MyTicketHistory({
  tickets,
  activeTab = "history",
  setActiveTab = () => {},
}: MyTicketHistoryProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Status badges with higher contrast
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "to do":
        return "bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-500 font-medium";
      case "in progress":
        return "bg-sky-200 dark:bg-sky-700 text-sky-800 dark:text-white border border-sky-300 dark:border-sky-600 font-medium";
      case "completed":
        return "bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-white border border-emerald-300 dark:border-emerald-600 font-medium";
      case "closed":
        return "bg-violet-200 dark:bg-violet-700 text-violet-800 dark:text-white border border-violet-300 dark:border-violet-600 font-medium";
      default:
        return "bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-500 font-medium";
    }
  };

  // Priority badges with higher contrast
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "border-2 border-rose-400 text-rose-800 dark:text-rose-100 bg-rose-100 dark:bg-rose-800";
      case "medium":
        return "border-2 border-amber-400 text-amber-800 dark:text-amber-100 bg-amber-100 dark:bg-amber-800";
      case "low":
        return "border-2 border-teal-400 text-teal-800 dark:text-teal-100 bg-teal-100 dark:bg-teal-800";
      default:
        return "border-2 border-slate-400 text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800";
    }
  };

  // Category badges with higher contrast
  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case "foreman":
        return "bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-white border border-indigo-300 dark:border-indigo-600 hover:bg-indigo-300 dark:hover:bg-indigo-600 font-medium";
      case "cloud nodes":
        return "bg-cyan-200 dark:bg-cyan-700 text-cyan-800 dark:text-white border border-cyan-300 dark:border-cyan-600 hover:bg-cyan-300 dark:hover:bg-cyan-600 font-medium";
      case "billing":
        return "bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-white border border-amber-300 dark:border-amber-600 hover:bg-amber-300 dark:hover:bg-amber-600 font-medium";
      case "general":
        return "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium";
      default:
        return "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium";
    }
  };

  const getActionButtonStyles = () => {
    return "px-2 py-1 h-auto text-xs bg-teal-100 hover:bg-teal-200 text-teal-700 border border-teal-300 hover:border-teal-400 dark:bg-teal-800 dark:hover:bg-teal-700 dark:text-white dark:border-teal-600 font-medium";
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        );
      case "closed":
        return (
          <XCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        );
      default:
        return <Info className="h-5 w-5 text-slate-600 dark:text-slate-400" />;
    }
  };

  // Sort tickets by resolution date (most recently closed first)
  const sortedTickets = [...tickets].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (tickets.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No Ticket History
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              You do not have any completed or closed tickets yet. They will
              appear here once resolved.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-row justify-between items-center">
          {/* Left side - Card title only */}
          <CardTitle className="text-lg font-semibold">
            {activeTab === "active" ? "Active Tickets" : "Ticket History"}
          </CardTitle>

          {/* Right side - Tabs */}
          <div className="flex items-center gap-3">
            {/* Tabs */}
            <TabsList className="bg-gray-100 dark:bg-gray-700 rounded-lg">
              <TabsTrigger
                value="active"
                onClick={() => setActiveTab("active")}
                className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white hover:bg-rose-200 hover:text-rose-700 dark:hover:bg-rose-800 dark:hover:text-rose-200 rounded-md"
              >
                <TicketIcon className="h-4 w-4" />
                <span>Active Tickets</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                onClick={() => setActiveTab("history")}
                className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white hover:bg-rose-200 hover:text-rose-700 dark:hover:bg-rose-800 dark:hover:text-rose-200 rounded-md"
              >
                <History className="h-4 w-4" />
                <span>Ticket History</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                  Ticket
                </th>
                <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                  Status
                </th>
                <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                  Priority
                </th>
                <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                  Category
                </th>
                <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Closed On</span>
                  </div>
                </th>
                <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                  Resolution
                </th>
                <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  <td className="py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-2 mt-1">
                        {getStatusIcon(ticket.status)}
                      </div>
                      <div>
                        <div className="font-medium">{ticket.title}</div>
                        <div className="text-gray-500 dark:text-gray-400 truncate max-w-md">
                          {ticket.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge
                      className={`${getStatusColor(
                        ticket.status
                      )} rounded-lg`}
                    >
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant="outline"
                      className={`${getCategoryBadge(
                        ticket.category
                      )} rounded-lg`}
                    >
                      {ticket.category}
                    </Badge>
                  </td>
                  <td className="py-4">{formatDate(ticket.updatedAt)}</td>
                  <td className="py-4">
                    <div className="truncate max-w-[150px]">
                      {ticket.resolution || "No resolution provided"}
                    </div>
                  </td>
                  <td className="py-4">
                    <Button
                      onClick={() => setSelectedTicket(ticket)}
                      size="sm"
                      variant="outline"
                      className={`${getActionButtonStyles()} rounded-lg`}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* Ticket Details Modal */}
      <TicketDetails
        ticket={selectedTicket}
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </Card>
  );
}