'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { FileText, Bot, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { TicketSupportOverview } from './components/TicketSupportOverview';
import TicketForm from './components/TicketForm';
import { MyTickets } from './components/MyTickets';
import { MyTicketHistory } from './components/MyTicketHistory';
import AIChatModal from './components/AIChatModal';
import { mockTickets, mockTicketStats } from '../mockTicketsData';
// Import the shared type from the types file
import { Ticket } from '../../types';

export default function SupportPage() {
  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Transform mockTickets to conform to our Ticket interface
  const transformedTickets = React.useMemo(() => {
    return mockTickets.map(ticket => {
      // If clientId is an object, extract its ID
      const clientId = typeof ticket.clientId === 'object' && ticket.clientId !== null 
        ? ticket.clientId.id 
        : (ticket.clientId as string);
      
      // Store the client object separately if available
      const client = typeof ticket.clientId === 'object' ? ticket.clientId : undefined;
      
      return {
        ...ticket,
        clientId,
        client
      };
    });
  }, []);
  
  const [tickets, setTickets] = useState<Ticket[]>(transformedTickets);

  // Function to add a new ticket
  const handleAddTicket = (newTicket: Ticket) => {
    setTickets([newTicket, ...tickets]);
  };

  // Animation setup
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation classes
  const fadeIn = "transition-all duration-500 ease-out";
  const hidden = "opacity-0 translate-y-6";
  const visible = "opacity-100 translate-y-0";

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Dynamic Support Overview */}
        <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "100ms" }}>
          <TicketSupportOverview stats={mockTicketStats} />
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submit Ticket Option */}
          <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "250ms" }}>
            <Card
              className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200 cursor-pointer group border border-gray-200 dark:border-gray-700 h-full"
              onClick={() => setIsTicketFormOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center p-6 space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full">
                    <FileText className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Submit a Detailed Ticket
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-sm">
                    Create a detailed support ticket for complex issues, feature
                    requests, or account-specific inquiries.
                  </p>
                  <div className="flex items-center text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                    <span className="font-medium">Create Ticket</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI ChatBot Option */}
          <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "350ms" }}>
            <Card 
              className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200 cursor-pointer group border border-gray-200 dark:border-gray-700 h-full"
              onClick={() => setIsChatModalOpen(true)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center p-6 space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-full">
                    <Bot className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Terra AI Assistant
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-sm">
                    Get instant answers to common questions, basic troubleshooting,
                    and quick account information.
                  </p>
                  <div className="flex items-center text-purple-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                    <span className="font-medium">Start Chat</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tickets Section */}
        <div className={`mt-8 ${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "450ms" }}>
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="active" className="mt-0 p-0">
              <MyTickets 
                tickets={tickets.filter(ticket => 
                  ticket.status === 'To Do' || ticket.status === 'In Progress'
                )}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </TabsContent>

            <TabsContent value="history" className="mt-0 p-0">
              <MyTicketHistory 
                tickets={tickets.filter(ticket => 
                  ticket.status === 'Completed' || ticket.status === 'Closed'
                )}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Ticket Form Modal */}
        <TicketForm
          isOpen={isTicketFormOpen}
          onClose={() => setIsTicketFormOpen(false)}
          onSubmit={handleAddTicket}
        />

        {/* AI Chat Modal */}
        <AIChatModal 
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}