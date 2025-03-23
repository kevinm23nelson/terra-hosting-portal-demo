// app/(dashboard)/dashboard/mockBillingData.js

// Define node types with pricing
export const nodeTypes = [
    {
      type: 'flux',
      name: 'Flux Nodes',
      price: 25.00,
      count: 5
    },
    {
      type: 'cumulus',
      name: 'Cumulus Nodes',
      price: 5.00,
      count: 2
    },
    {
      type: 'nimbus',
      name: 'Nimbus Nodes',
      price: 50.00,
      count: 1
    },
    {
      type: 'r8',
      name: 'R8 Nodes',
      price: 10.00,
      count: 2
    }
  ];
  
  // Calculate the total monthly cost based on node distribution
  const calculateMonthlyCost = () => {
    return nodeTypes.reduce((total, node) => total + (node.price * node.count), 0);
  };
  
  const monthlyCost = calculateMonthlyCost();
  
  // Mock account information
  export const mockAccount = {
    id: 'acc-123456',
    email: 'client@terramining.com',
    first_name: 'John',
    last_name: 'Doe',
    company: 'Terra Mining Operations',
    state: 'active',
    created_at: '2023-07-15T00:00:00Z',
    has_active_subscription: true,
    billing_info: {
      id: 'bill-123456',
      first_name: 'John',
      last_name: 'Doe',
      address: {
        street1: '123 Blockchain Avenue',
        street2: 'Suite 456',
        city: 'Austin',
        region: 'TX',
        postal_code: '78701',
        country: 'US',
        phone: '(512) 555-1234'
      },
      payment_method: {
        card_type: 'Visa',
        last_four: '4242',
        exp_month: 12,
        exp_year: 2025
      }
    },
    subscriptions: [
      {
        id: 'sub-123456',
        state: 'active',
        plan: {
          code: 'NODE-SUBSCRIPTION',
          name: 'Node Rental Subscription'
        },
        unit_amount: monthlyCost / nodeTypes.reduce((sum, node) => sum + node.count, 0), // Average cost per node
        quantity: nodeTypes.reduce((sum, node) => sum + node.count, 0), // Total node count
        total: monthlyCost,
        current_period_ends_at: '2025-04-20T00:00:00Z',
        node_distribution: nodeTypes
      }
    ]
  };
  
  // Generate consistent line items based on node distribution
  const generateLineItems = () => {
    const items = [];
    
    // Add one line item per node type
    nodeTypes.forEach(node => {
      items.push({
        description: `${node.name} (${node.count} x $${node.price.toFixed(2)})`,
        amount: node.price * node.count
      });
    });
    
    return items;
  };
  
  // Generate dates for the past 6 months of invoices
  const generatePastMonthDate = (monthsAgo) => {
    const date = new Date();
    date.setDate(20); // Set to 20th of each month
    date.setMonth(date.getMonth() - monthsAgo);
    return date.toISOString();
  };
  
  // Mock invoices for the past months
  export const mockInvoices = [
    {
      id: 'inv-202503',
      number: '1006',
      state: 'pending',
      total: monthlyCost,
      paid: 0,
      created_at: generatePastMonthDate(0),
      line_items: generateLineItems(),
      account: {
        id: mockAccount.id,
        code: 'client1'
      }
    },
    {
      id: 'inv-202502',
      number: '1005',
      state: 'paid',
      total: monthlyCost,
      paid: monthlyCost,
      created_at: generatePastMonthDate(1),
      line_items: generateLineItems(),
      account: {
        id: mockAccount.id,
        code: 'client1'
      }
    },
    {
      id: 'inv-202501',
      number: '1004',
      state: 'paid',
      total: monthlyCost,
      paid: monthlyCost,
      created_at: generatePastMonthDate(2),
      line_items: generateLineItems(),
      account: {
        id: mockAccount.id,
        code: 'client1'
      }
    },
    {
      id: 'inv-202412',
      number: '1003',
      state: 'paid',
      total: monthlyCost,
      paid: monthlyCost,
      created_at: generatePastMonthDate(3),
      line_items: generateLineItems(),
      account: {
        id: mockAccount.id,
        code: 'client1'
      }
    },
    {
      id: 'inv-202411',
      number: '1002',
      state: 'paid',
      total: monthlyCost,
      paid: monthlyCost,
      created_at: generatePastMonthDate(4),
      line_items: generateLineItems(),
      account: {
        id: mockAccount.id,
        code: 'client1'
      }
    },
    {
      id: 'inv-202410',
      number: '1001',
      state: 'paid',
      total: monthlyCost,
      paid: monthlyCost,
      created_at: generatePastMonthDate(5),
      line_items: generateLineItems(),
      account: {
        id: mockAccount.id,
        code: 'client1'
      }
    }
  ];
  
  // Calculate billing statistics
  export const getBillingStats = () => {
    const activeSubscriptions = mockAccount.subscriptions.filter(sub => sub.state === 'active');
    const monthlyTotal = activeSubscriptions.reduce((sum, sub) => sum + sub.total, 0);
    const totalNodes = activeSubscriptions.reduce((sum, sub) => sum + sub.quantity, 0);
    
    const totalBilled = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const totalPaid = mockInvoices.reduce((sum, inv) => sum + inv.paid, 0);
    const outstandingBalance = totalBilled - totalPaid;
    
    const nextPaymentDate = activeSubscriptions[0]
      ? new Date(activeSubscriptions[0].current_period_ends_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      : 'N/A';
      
    // Get node type counts
    const nodeCounts = {};
    nodeTypes.forEach(node => {
      nodeCounts[node.type] = node.count;
    });
    
    return {
      monthlyTotal,
      totalNodes,
      totalBilled,
      totalPaid,
      outstandingBalance,
      nextPaymentDate,
      activeSubscriptionsCount: activeSubscriptions.length,
      nodeTypes: nodeTypes,
      nodeCounts
    };
  };