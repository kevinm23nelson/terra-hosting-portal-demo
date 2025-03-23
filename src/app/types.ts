export interface User {
    id: string;
    email: string;
    role?: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      profilePicture?: string | null;
    };
  }
  
  // Define Comment interface
  export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    createdBy: User;
  }
  
  // Define Ticket interface with string clientId
  export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    dueDate: string;
    resolution: string | null;
    clientId: string; // Keep as string for the ID reference
    client?: User;     // Add optional client object property
    assignedTo: User | null;
    createdBy: User;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    lastActivity: string;
  }