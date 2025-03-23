// app/(dashboard)/dashboard/billing/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { BillingStatsOverview } from './components/BillingStatsOverview';
import { SubscriptionDetails } from './components/SubscriptionDetails';
import { BillingHistory } from './components/BillingHistory';
import DashboardLayout from '../components/DashboardLayout';
import { mockAccount, mockInvoices } from '../mockBillingData';

export default function BillingPage() {
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
        <div 
          className={`${fadeIn} ${isLoaded ? visible : hidden}`}
          style={{ transitionDelay: "100ms" }}
        >
          <BillingStatsOverview 
            account={mockAccount} 
            invoices={mockInvoices} 
          />
        </div>

        {/* Subscription Details */}
        <div 
          className={`${fadeIn} ${isLoaded ? visible : hidden}`}
          style={{ transitionDelay: "250ms" }}
        >
          <SubscriptionDetails
            subscriptions={mockAccount.subscriptions}
            billingInfo={mockAccount.billing_info}
          />
        </div>

        {/* Billing History */}
        <div 
          className={`${fadeIn} ${isLoaded ? visible : hidden}`}
          style={{ transitionDelay: "400ms" }}
        >
          <BillingHistory 
            invoices={mockInvoices} 
            accountId={mockAccount.id}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}