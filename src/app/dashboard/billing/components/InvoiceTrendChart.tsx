// app/(dashboard)/dashboard/quickbooks/components/InvoiceTrendChart.tsx
'use client';

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  TooltipProps,
} from 'recharts';

interface InvoiceTrendChartProps {
  invoices: Array<{
    TxnDate: string;
    TotalAmt: number;
    Balance: number;
  }>;
}

interface ChartData {
  month: string;
  amount: number;
}

interface PayloadItem {
  name: string;
  value: number;
  stroke: string;
  fill: string;
  dataKey: string;
}

// Custom tooltip component
interface CustomTooltipProps extends Omit<TooltipProps<number, string>, 'payload'> {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
      <p className="font-medium text-sm mb-2">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.stroke }}>
          ${entry.value.toFixed(2)}
        </p>
      ))}
    </div>
  );
};

export function InvoiceTrendChart({ invoices }: InvoiceTrendChartProps) {
  // Process invoices to get monthly data
  const processInvoiceData = (): ChartData[] => {
    // Sort invoices by date
    const sortedInvoices = [...invoices].sort((a, b) => 
      new Date(a.TxnDate).getTime() - new Date(b.TxnDate).getTime()
    );
    
    // Group by month and sum amounts
    const monthlyData = new Map<string, number>();
    
    sortedInvoices.forEach(invoice => {
      const date = new Date(invoice.TxnDate);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      
      const currentAmount = monthlyData.get(key) || 0;
      monthlyData.set(key, currentAmount + invoice.TotalAmt);
    });
    
    // Convert to array format for chart
    return Array.from(monthlyData.entries()).map(([month, amount]) => ({
      month,
      amount
    }));
  };

  const chartData = processInvoiceData();

  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
      <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Monthly Invoice Trend</h2>
      <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3CD856" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3CD856" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#f0f0f0"
                horizontal={true}
                vertical={false}
                strokeDasharray="3 0"
              />
              <XAxis
                dataKey="month"
                tickSize={0}
                axisLine={false}
                padding={{ left: 20, right: 20 }}
                tick={{
                  fontSize: 12,
                  fill: '#7B91B0',
                }}
              />
              <YAxis
                tickSize={0}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: '#7B91B0',
                }}
                tickFormatter={(value) => `$${value}`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                name="Invoice Amount"
                stroke="#3CD856"
                fillOpacity={1}
                fill="url(#colorAmount)"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}