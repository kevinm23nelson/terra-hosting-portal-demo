'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  Clock, 
  TicketIcon,
  History,
  Filter,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TicketDetails } from './TicketDetails';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  createdBy: {
    id: string;
    email: string;
    profile: {
      firstName: string;
      lastName: string;
      profilePicture?: string;
    };
  };
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  dueDate: string;
  resolution: string | null;
  clientId: any;
  assignedTo: any;
  createdBy: any;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
}

interface FilterOptions {
  search: string;
  status: string | null;
  category: string | null;
  priority: string | null;
  sortBy: string;
}

interface MyTicketsProps {
  tickets: Ticket[];
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function MyTickets({
  tickets,
  activeTab = 'active',
  setActiveTab = () => {},
}: MyTicketsProps) {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: null,
    category: null,
    priority: null,
    sortBy: 'newest',
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const getActionButtonStyles = () => {
    return "px-2 py-1 h-auto text-xs bg-teal-100 hover:bg-teal-200 text-teal-700 border border-teal-300 hover:border-teal-400 dark:bg-teal-800 dark:hover:bg-teal-700 dark:text-white dark:border-teal-600 font-medium";
  };
  
  // Status badges with higher contrast
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'to do':
        return 'bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-500 font-medium';
      case 'in progress':
        return 'bg-sky-200 dark:bg-sky-700 text-sky-800 dark:text-white border border-sky-300 dark:border-sky-600 font-medium';
      case 'completed':
        return 'bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-white border border-emerald-300 dark:border-emerald-600 font-medium';
      case 'closed':
        return 'bg-violet-200 dark:bg-violet-700 text-violet-800 dark:text-white border border-violet-300 dark:border-violet-600 font-medium';
      default:
        return 'bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-500 font-medium';
    }
  };

  // Priority badges with higher contrast
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'border-2 border-rose-400 text-rose-800 dark:text-rose-100 bg-rose-100 dark:bg-rose-800';
      case 'medium':
        return 'border-2 border-amber-400 text-amber-800 dark:text-amber-100 bg-amber-100 dark:bg-amber-800';
      case 'low':
        return 'border-2 border-teal-400 text-teal-800 dark:text-teal-100 bg-teal-100 dark:bg-teal-800';
      default:
        return 'border-2 border-slate-400 text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800';
    }
  };

  // Category badges with higher contrast
  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case 'foreman':
        return 'bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-white border border-indigo-300 dark:border-indigo-600 hover:bg-indigo-300 dark:hover:bg-indigo-600 font-medium';
      case 'cloud nodes':
        return 'bg-cyan-200 dark:bg-cyan-700 text-cyan-800 dark:text-white border border-cyan-300 dark:border-cyan-600 hover:bg-cyan-300 dark:hover:bg-cyan-600 font-medium';
      case 'billing':
        return 'bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-white border border-amber-300 dark:border-amber-600 hover:bg-amber-300 dark:hover:bg-amber-600 font-medium';
      case 'general':
        return 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium';
      default:
        return 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium';
    }
  };

  // Added priority options
  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  // Modified for active tickets status options
  const statusOptions = [
    { value: 'to do', label: 'To Do' },
    { value: 'in progress', label: 'In Progress' },
  ];

  const categoryOptions = [
    { value: 'foreman', label: 'Foreman' },
    { value: 'cloud nodes', label: 'Cloud Nodes' },
    { value: 'billing', label: 'Billing' },
    { value: 'general', label: 'General' },
  ];

  // FIXED: Improved filtering logic to properly handle all filter types
  const filteredTickets = tickets.filter((ticket) => {
    // Search filter (title or description)
    if (
      filters.search && 
      !ticket.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !ticket.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    
    // Status filter
    if (filters.status && ticket.status.toLowerCase() !== filters.status.toLowerCase()) {
      return false;
    }
    
    // Category filter
    if (filters.category && ticket.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    
    // Priority filter
    if (filters.priority && ticket.priority.toLowerCase() !== filters.priority.toLowerCase()) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // First sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = 
      priorityOrder[a.priority.toLowerCase()] - 
      priorityOrder[b.priority.toLowerCase()];

    // If sort by newest
    if (filters.sortBy === 'newest') {
      // If priorities are the same, sort by creation date (newest first)
      if (priorityDiff === 0) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return priorityDiff;
    }
    // If sort by oldest
    else {
      // If priorities are the same, sort by creation date (oldest first)
      if (priorityDiff === 0) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return priorityDiff;
    }
  });

  // Function to close the filter dropdown
  const handleClickOutside = () => {
    setFilterOpen(false);
  };
  
  // Function to reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      status: null,
      category: null,
      priority: null,
      sortBy: 'newest',
    });
  };

  if (tickets.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <TicketIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No Active Tickets
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              You don't have any active support tickets at the moment. Create a
              new ticket if you need assistance.
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
            {activeTab === 'active' ? 'Active Tickets' : 'Ticket History'}
          </CardTitle>

          {/* Right side - Tabs next to filters */}
          <div className="flex items-center gap-3">
            {/* Tabs moved here, right next to filters */}
            <TabsList className="bg-gray-100 dark:bg-gray-700 rounded-lg">
              <TabsTrigger
                value="active"
                onClick={() => setActiveTab('active')}
                className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white hover:bg-rose-200 hover:text-rose-700 dark:hover:bg-rose-800 dark:hover:text-rose-200 rounded-md"
              >
                <TicketIcon className="h-4 w-4" />
                <span>Active Tickets</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                onClick={() => setActiveTab('history')}
                className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white hover:bg-rose-200 hover:text-rose-700 dark:hover:bg-rose-800 dark:hover:text-rose-200 rounded-md"
              >
                <History className="h-4 w-4" />
                <span>Ticket History</span>
              </TabsTrigger>
            </TabsList>

            {/* Filter dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white rounded-lg"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {(filters.search || filters.status || filters.category || filters.priority) && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-teal-600 text-white">
                    {[
                      filters.search && filters.search.length > 0, 
                      filters.status, 
                      filters.category, 
                      filters.priority
                    ].filter(Boolean).length}
                  </Badge>
                )}
              </Button>

              {filterOpen && (
                <div className="fixed inset-0 bg-transparent z-40" onClick={handleClickOutside}>
                  <div 
                    className="absolute right-0 top-8 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700 p-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Filter Tickets
                      </h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 rounded-full" 
                        onClick={handleClickOutside}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Search
                        </label>
                        <Input
                          placeholder="Search in title or description"
                          value={filters.search}
                          onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                          }
                          className="mt-1 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </label>
                        <Select
                          value={filters.status || ""}
                          onValueChange={(value) =>
                            setFilters({ ...filters, status: value || null })
                          }
                        >
                          <SelectTrigger className="mt-1 rounded-lg">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All</SelectItem>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Priority
                        </label>
                        <Select
                          value={filters.priority || ""}
                          onValueChange={(value) =>
                            setFilters({ ...filters, priority: value || null })
                          }
                        >
                          <SelectTrigger className="mt-1 rounded-lg">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All</SelectItem>
                            {priorityOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Category
                        </label>
                        <Select
                          value={filters.category || ""}
                          onValueChange={(value) =>
                            setFilters({ ...filters, category: value || null })
                          }
                        >
                          <SelectTrigger className="mt-1 rounded-lg">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All</SelectItem>
                            {categoryOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Sort By
                        </label>
                        <Select
                          value={filters.sortBy}
                          onValueChange={(value) =>
                            setFilters({ ...filters, sortBy: value })
                          }
                        >
                          <SelectTrigger className="mt-1 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-between mt-5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                      <Button 
                        size="sm" 
                        className="rounded-lg"
                        onClick={() => setFilterOpen(false)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No tickets match your filter criteria
          </div>
        ) : (
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
                      <span>Created</span>
                    </div>
                  </th>
                  <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                    Last Activity
                  </th>
                  <th className="pb-4 font-semibold text-slate-700 dark:text-slate-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="text-sm text-gray-600 dark:text-gray-300"
                  >
                    <td className="py-4">
                      <div>
                        <div className="font-medium">{ticket.title}</div>
                        <div className="text-gray-500 dark:text-gray-400 truncate max-w-md">
                          {ticket.description}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge className={`${getStatusColor(ticket.status)} rounded-lg`}>
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
                        {ticket.priority.toLowerCase() === "high" && (
                          <AlertCircle className="ml-1 h-3 w-3" />
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge
                        variant="outline"
                        className={`${getCategoryBadge(ticket.category)} rounded-lg`}
                      >
                        {ticket.category}
                      </Badge>
                    </td>
                    <td className="py-4">{formatDate(ticket.createdAt)}</td>
                    <td className="py-4">{formatDate(ticket.lastActivity)}</td>
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
        )}
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
