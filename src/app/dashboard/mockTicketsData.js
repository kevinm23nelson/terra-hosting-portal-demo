// app/(dashboard)/dashboard/support/mockTicketsData.js

// Helper functions to generate dates
const today = new Date();
const daysAgo = (days) => {
  const date = new Date(today);
  date.setDate(today.getDate() - days);
  return date.toISOString();
};

const hoursAgo = (hours) => {
  const date = new Date(today);
  date.setHours(today.getHours() - hours);
  return date.toISOString();
};

const daysFromNow = (days) => {
  const date = new Date(today);
  date.setDate(today.getDate() + days);
  return date.toISOString();
};

// Mock user data
export const mockUsers = {
  client: {
    id: "client-123",
    email: "client@terramining.com",
    profile: {
      firstName: "John",
      lastName: "Miner",
      profilePicture: "/avatars/client.jpg"
    }
  },
  adminSarah: {
    id: "admin-456",
    email: "sarah@terrasupport.com",
    profile: {
      firstName: "Sarah",
      lastName: "Johnson",
      profilePicture: "/avatars/sarah.jpg"
    }
  },
  adminMike: {
    id: "admin-789",
    email: "mike@terrasupport.com",
    profile: {
      firstName: "Mike",
      lastName: "Chen",
      profilePicture: "/avatars/mike.jpg"
    }
  }
};

// Mock tickets data
export const mockTickets = [
  {
    id: "ticket-001",
    title: "Unable to access Foreman dashboard",
    description: "I'm trying to log into the Foreman dashboard but keep getting a 'Connection refused' error. I've tried clearing browser cache and using multiple browsers without success.",
    status: "In Progress",
    priority: "High",
    category: "Foreman",
    dueDate: daysFromNow(1),
    resolution: null,
    clientId: mockUsers.client,
    assignedTo: mockUsers.adminSarah,
    createdBy: mockUsers.client,
    comments: [
      {
        id: "comment-001-1",
        content: "I've been having this issue since yesterday morning. Any help would be appreciated.",
        createdAt: daysAgo(1),
        createdBy: mockUsers.client
      },
      {
        id: "comment-001-2",
        content: "Hi John, I'm looking into this issue for you. Can you please confirm if you're using your company VPN when trying to connect?",
        createdAt: hoursAgo(22),
        createdBy: mockUsers.adminSarah
      },
      {
        id: "comment-001-3",
        content: "Yes, I am using the VPN. I've also tried connecting directly from the office network with the same result.",
        createdAt: hoursAgo(21),
        createdBy: mockUsers.client
      },
      {
        id: "comment-001-4",
        content: "Thank you for confirming. I've identified the issue with your account permissions. I'm making some adjustments now and will update you shortly.",
        createdAt: hoursAgo(4),
        createdBy: mockUsers.adminSarah
      }
    ],
    createdAt: daysAgo(1),
    updatedAt: hoursAgo(4),
    lastActivity: hoursAgo(4)
  },
  {
    id: "ticket-002",
    title: "Billing discrepancy on latest invoice",
    description: "The March invoice (INV-1045) shows charges for additional services that I don't believe we requested. Can someone review this?",
    status: "To Do",
    priority: "Medium",
    category: "Billing",
    dueDate: daysFromNow(3),
    resolution: null,
    clientId: mockUsers.client,
    assignedTo: mockUsers.adminMike,
    createdBy: mockUsers.client,
    comments: [
      {
        id: "comment-002-1",
        content: "The specific charge I'm questioning is for 'Additional Support Services' for $300.00.",
        createdAt: hoursAgo(8),
        createdBy: mockUsers.client
      }
    ],
    createdAt: hoursAgo(8),
    updatedAt: hoursAgo(8),
    lastActivity: hoursAgo(8)
  },
  {
    id: "ticket-003",
    title: "Request for additional cloud storage",
    description: "We'd like to increase our cloud storage allocation by 500GB to accommodate our growing dataset. Please advise on pricing and process.",
    status: "Completed",
    priority: "Low",
    category: "Cloud Nodes",
    dueDate: daysAgo(2),
    resolution: "Storage allocation increased as requested. New billing will reflect on next month's invoice.",
    clientId: mockUsers.client,
    assignedTo: mockUsers.adminMike,
    createdBy: mockUsers.client,
    comments: [
      {
        id: "comment-003-1",
        content: "Is this something that can be done immediately or is there a waiting period?",
        createdAt: daysAgo(5),
        createdBy: mockUsers.client
      },
      {
        id: "comment-003-2",
        content: "Hi John, I can process this request today. The additional 500GB will cost $45/month. Would you like me to proceed with the upgrade?",
        createdAt: daysAgo(5),
        createdBy: mockUsers.adminMike
      },
      {
        id: "comment-003-3",
        content: "Yes, please proceed with the upgrade. Thank you for the quick response.",
        createdAt: daysAgo(4),
        createdBy: mockUsers.client
      },
      {
        id: "comment-003-4",
        content: "I've processed the upgrade. Your additional storage is now available. You can verify this in your cloud dashboard. Let me know if you need anything else!",
        createdAt: daysAgo(3),
        createdBy: mockUsers.adminMike
      },
      {
        id: "comment-003-5",
        content: "Confirmed, I can now see the additional storage. Everything looks good!",
        createdAt: daysAgo(3),
        createdBy: mockUsers.client
      }
    ],
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
    lastActivity: daysAgo(2)
  },
  {
    id: "ticket-004",
    title: "Software update schedule inquiry",
    description: "When is the next scheduled maintenance for the mining software update? We want to ensure our operations are prepared for any downtime.",
    status: "Closed",
    priority: "Medium",
    category: "General",
    dueDate: daysAgo(7),
    resolution: "Provided client with the maintenance schedule and documentation on the upcoming software features.",
    clientId: mockUsers.client,
    assignedTo: mockUsers.adminSarah,
    createdBy: mockUsers.client,
    comments: [
      {
        id: "comment-004-1",
        content: "We're planning some heavy operations next week and want to make sure they won't be interrupted.",
        createdAt: daysAgo(15),
        createdBy: mockUsers.client
      },
      {
        id: "comment-004-2",
        content: "Our next scheduled maintenance window is this Sunday from 2AM to 6AM UTC. We'll be updating the mining software to version 4.2.1 which includes performance improvements and bug fixes.",
        createdAt: daysAgo(14),
        createdBy: mockUsers.adminSarah
      },
      {
        id: "comment-004-3",
        content: "Perfect, that works with our schedule. Could you share what improvements we can expect with this update?",
        createdAt: daysAgo(14),
        createdBy: mockUsers.client
      },
      {
        id: "comment-004-4",
        content: "Certainly! The update includes a 15% improvement in hash rate efficiency, better error handling for unstable connections, and a new feature that allows for custom alert thresholds. I've attached the full release notes to this ticket.",
        createdAt: daysAgo(13),
        createdBy: mockUsers.adminSarah
      },
      {
        id: "comment-004-5",
        content: "Thank you for the detailed information. This is exactly what we needed.",
        createdAt: daysAgo(12),
        createdBy: mockUsers.client
      }
    ],
    createdAt: daysAgo(15),
    updatedAt: daysAgo(7),
    lastActivity: daysAgo(7)
  },
  {
    id: "ticket-005",
    title: "New miner configuration assistance",
    description: "We've added 5 new Antminer S19j Pro units and need help configuring them in Foreman for optimal performance.",
    status: "In Progress",
    priority: "Medium",
    category: "Foreman",
    dueDate: daysFromNow(2),
    resolution: null,
    clientId: mockUsers.client,
    assignedTo: mockUsers.adminSarah,
    createdBy: mockUsers.client,
    comments: [
      {
        id: "comment-005-1",
        content: "The miners are connected to our network but I'm not seeing them in the Foreman dashboard.",
        createdAt: daysAgo(2),
        createdBy: mockUsers.client
      },
      {
        id: "comment-005-2",
        content: "I'll help you get these configured. First, let's check if they're properly connected to the network. Can you provide the IP addresses assigned to these new miners?",
        createdAt: daysAgo(2),
        createdBy: mockUsers.adminSarah
      },
      {
        id: "comment-005-3",
        content: "The IP addresses are 192.168.1.101 through 192.168.1.105. All units are powered on and showing green status lights.",
        createdAt: daysAgo(1),
        createdBy: mockUsers.client
      },
      {
        id: "comment-005-4",
        content: "Thank you for providing this information. I've initiated a network scan for these IP addresses. Two of the miners (101 and 102) have been detected. For the other three, please check that they're on the same subnet as your existing miners and that there are no firewall rules blocking their communication.",
        createdAt: hoursAgo(18),
        createdBy: mockUsers.adminSarah
      }
    ],
    createdAt: daysAgo(2),
    updatedAt: hoursAgo(18),
    lastActivity: hoursAgo(18)
  },
  {
    id: "ticket-006",
    title: "API integration documentation request",
    description: "We're developing an internal dashboard and would like to integrate with your API. Can you provide documentation and access credentials?",
    status: "To Do",
    priority: "Low",
    category: "General",
    dueDate: daysFromNow(7),
    resolution: null,
    clientId: mockUsers.client,
    assignedTo: null,
    createdBy: mockUsers.client,
    comments: [],
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
    lastActivity: hoursAgo(2)
  }
];

// Mock ticket statistics
export const mockTicketStats = {
  total: mockTickets.length,
  open: mockTickets.filter(ticket => ticket.status === "To Do").length,
  inProgress: mockTickets.filter(ticket => ticket.status === "In Progress").length,
  completed: mockTickets.filter(ticket => ticket.status === "Completed").length,
  closed: mockTickets.filter(ticket => ticket.status === "Closed").length,
  highPriority: mockTickets.filter(ticket => ticket.priority === "High").length,
  avgResponseTime: "1.8 hrs"
};

// Available admins for assignment
export const mockSupportAdmins = [
  mockUsers.adminSarah,
  mockUsers.adminMike,
  {
    id: "admin-101",
    email: "alex@terrasupport.com",
    role: "admin",
    profile: {
      firstName: "Alex",
      lastName: "Rodriguez",
    }
  },
  {
    id: "admin-102",
    email: "priya@terrasupport.com",
    role: "admin",
    profile: {
      firstName: "Priya",
      lastName: "Patel",
    }
  }
];