// app/(dashboard)/dashboard/quickbooks/page.tsx
'use client';

import DashboardLayout from '../components/DashboardLayout';
import { BillingStatsOverview } from './components/BillingStatsOverview';
import { AccountInformation } from './components/AccountInformation';
import { InvoicesList } from './components/InvoicesList';
import { InvoiceTrendChart } from './components/InvoiceTrendChart';
import { mockCustomer, mockInvoices } from '../mockQuickBooksData';

export default function QuickBooksPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <BillingStatsOverview 
          customer={mockCustomer} 
          invoices={mockInvoices} 
        />
        
        {/* Invoice Trend Chart and Account Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoice Trend Chart */}
          <InvoiceTrendChart invoices={mockInvoices} />
          
          {/* Account Information */}
          <AccountInformation customer={mockCustomer} />
        </div>
        
        {/* Invoice List */}
        <div>
          <InvoicesList invoices={mockInvoices} />
        </div>
      </div>
    </DashboardLayout>
  );
}