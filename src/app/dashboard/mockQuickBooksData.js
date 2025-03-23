// app/(dashboard)/dashboard/mockQuickBooksData.js

// Mock QuickBooks Customer data
export const mockCustomer = {
    DisplayName: "Terra Mining Operations LLC",
    Balance: 3250.75,
    BillAddr: {
      Line1: "123 Mining Avenue",
      City: "Austin",
      CountrySubDivisionCode: "TX",
      PostalCode: "78701"
    },
    PrimaryEmailAddr: {
      Address: "accounts@terramining.com"
    }
  };
  
  // Mock QuickBooks Invoices data
  export const mockInvoices = [
    {
      Id: "inv-001",
      DocNumber: "1045",
      TxnDate: "2025-03-01",
      DueDate: "2025-03-31",
      TotalAmt: 1500.00,
      Balance: 1500.00,
      CustomerRef: {
        value: "cust-123",
        name: "Terra Mining Operations LLC"
      },
      Line: [
        {
          Amount: 1200.00,
          Description: "Monthly Mining Equipment Lease"
        },
        {
          Amount: 300.00,
          Description: "Support Services"
        }
      ]
    },
    {
      Id: "inv-002",
      DocNumber: "1044",
      TxnDate: "2025-02-01",
      DueDate: "2025-02-28",
      TotalAmt: 1750.75,
      Balance: 1750.75,
      CustomerRef: {
        value: "cust-123",
        name: "Terra Mining Operations LLC"
      },
      Line: [
        {
          Amount: 1200.00,
          Description: "Monthly Mining Equipment Lease"
        },
        {
          Amount: 550.75,
          Description: "Additional Power Usage"
        }
      ]
    },
    {
      Id: "inv-003",
      DocNumber: "1043",
      TxnDate: "2025-01-01",
      DueDate: "2025-01-31",
      TotalAmt: 1200.00,
      Balance: 0,
      CustomerRef: {
        value: "cust-123",
        name: "Terra Mining Operations LLC"
      },
      Line: [
        {
          Amount: 1200.00,
          Description: "Monthly Mining Equipment Lease"
        }
      ]
    },
    {
      Id: "inv-004",
      DocNumber: "1042",
      TxnDate: "2024-12-01",
      DueDate: "2024-12-31",
      TotalAmt: 1200.00,
      Balance: 0,
      CustomerRef: {
        value: "cust-123",
        name: "Terra Mining Operations LLC"
      },
      Line: [
        {
          Amount: 1200.00,
          Description: "Monthly Mining Equipment Lease"
        }
      ]
    },
    {
      Id: "inv-005",
      DocNumber: "1041",
      TxnDate: "2024-11-01",
      DueDate: "2024-11-30",
      TotalAmt: 1450.00,
      Balance: 0,
      CustomerRef: {
        value: "cust-123",
        name: "Terra Mining Operations LLC"
      },
      Line: [
        {
          Amount: 1200.00,
          Description: "Monthly Mining Equipment Lease"
        },
        {
          Amount: 250.00,
          Description: "Hardware Maintenance"
        }
      ]
    },
    {
      Id: "inv-006",
      DocNumber: "1040",
      TxnDate: "2024-10-01",
      DueDate: "2024-10-31",
      TotalAmt: 1200.00,
      Balance: 0,
      CustomerRef: {
        value: "cust-123",
        name: "Terra Mining Operations LLC"
      },
      Line: [
        {
          Amount: 1200.00,
          Description: "Monthly Mining Equipment Lease"
        }
      ]
    },
    {
      Id: "inv-007",
      DocNumber: "1039",
      TxnDate: "2024-09-01",
      DueDate: "2024-09-30",
      TotalAmt: 2100.00,
      Balance: 0,
      CustomerRef: {
        value: "cust-123",
        name: "Terra Mining Operations LLC"
      },
      Line: [
        {
          Amount: 1200.00,
          Description: "Monthly Mining Equipment Lease"
        },
        {
          Amount: 900.00,
          Description: "Hardware Upgrade - Additional GPUs"
        }
      ]
    }
  ];
  
  // Helper functions to calculate statistics
  export const getQuickBooksStats = () => {
    const totalBalance = mockCustomer.Balance || 0;
    const totalInvoices = mockInvoices.length || 0;
    const unpaidInvoices = mockInvoices.filter(inv => inv.Balance > 0).length || 0;
    const paidInvoices = mockInvoices.filter(inv => inv.Balance === 0);
    
    // Calculate on-time payments (assuming payment date is transaction date)
    const onTimePayments = paidInvoices.filter(inv => {
      if (!inv.DueDate || !inv.TxnDate) return false;
      return new Date(inv.TxnDate) <= new Date(inv.DueDate);
    });
    
    const paymentHistory = paidInvoices.length > 0
      ? Math.round((onTimePayments.length / paidInvoices.length) * 100)
      : 0;
      
    // Calculate lifetime spending
    const totalSpent = mockInvoices
      .filter(inv => inv.Balance === 0)
      .reduce((sum, inv) => sum + inv.TotalAmt, 0);
      
    return {
      totalBalance,
      totalInvoices,
      unpaidInvoices,
      paidInvoices: totalInvoices - unpaidInvoices,
      onTimePayments: onTimePayments.length,
      paymentHistory,
      totalSpent
    };
  };