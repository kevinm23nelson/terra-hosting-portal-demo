// app/(dashboard)/dashboard/billing/page.tsx
'use client';

import { BillingStatsOverview } from './components/BillingStatsOverview';
import { SubscriptionDetails } from './components/SubscriptionDetails';
import { BillingHistory } from './components/BillingHistory';
import DashboardLayout from '../components/DashboardLayout';
import { mockAccount, mockInvoices } from '../mockBillingData';

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <BillingStatsOverview 
          account={mockAccount} 
          invoices={mockInvoices} 
        />

        {/* Subscription Details */}
        <SubscriptionDetails
          subscriptions={mockAccount.subscriptions}
          billingInfo={mockAccount.billing_info}
        />

        {/* Billing History */}
        <BillingHistory 
          invoices={mockInvoices} 
          accountId={mockAccount.id}
        />
      </div>
    </DashboardLayout>
  );
}