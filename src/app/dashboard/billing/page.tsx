'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { BillingStatsOverview } from './components/BillingStatsOverview';
import { AccountInformation } from './components/AccountInformation';
import { InvoicesList } from './components/InvoicesList';
import { InvoiceTrendChart } from './components/InvoiceTrendChart';
import { mockCustomer, mockInvoices } from '../mockQuickBooksData';

export default function QuickBooksPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
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
        {/* Stats Overview */}
        <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "100ms" }}>
          <BillingStatsOverview 
            customer={mockCustomer} 
            invoices={mockInvoices} 
          />
        </div>
        
        {/* Invoice Trend Chart and Account Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoice Trend Chart */}
          <div className={`${fadeIn} ${isLoaded ? visible : hidden} h-full`} style={{ transitionDelay: "250ms" }}>
            <InvoiceTrendChart invoices={mockInvoices} />
          </div>
          
          {/* Account Information */}
          <div className={`${fadeIn} ${isLoaded ? visible : hidden} h-full`} style={{ transitionDelay: "350ms" }}>
            <AccountInformation customer={mockCustomer} />
          </div>
        </div>
        
        {/* Invoice List */}
        <div className={`${fadeIn} ${isLoaded ? visible : hidden}`} style={{ transitionDelay: "450ms" }}>
          <InvoicesList invoices={mockInvoices} />
        </div>
      </div>
    </DashboardLayout>
  );
}