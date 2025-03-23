'use client';

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockUsers } from '../../mockTicketsData';

interface TicketFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticket: any) => void;
}

export default function TicketForm({ isOpen, onClose, onSubmit }: TicketFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    category?: string;
    priority?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      title?: string;
      description?: string;
      category?: string;
      priority?: string;
    } = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Category is required';
    if (!priority) newErrors.priority = 'Priority is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Create a due date based on priority
    const today = new Date();
    let dueDate: Date;
    
    switch (priority) {
      case 'High':
        dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 1); // 1 day for high priority
        break;
      case 'Medium':
        dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 3); // 3 days for medium priority
        break;
      case 'Low':
        dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 7); // 7 days for low priority
        break;
      default:
        dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 3);
    }
    
    // Create new ticket object
    const newTicket = {
      id: `ticket-${Date.now()}`,
      title,
      description,
      status: 'To Do',
      priority,
      category,
      dueDate: dueDate.toISOString(),
      resolution: null,
      clientId: mockUsers.client,
      assignedTo: null, // Will be assigned later by admin
      createdBy: mockUsers.client,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(newTicket);
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setPriority('');
    setErrors({});
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Create Support Ticket</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Ticket Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief summary of your issue"
              className={`border ${errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide detailed information about your issue"
              rows={5}
              className={`border ${errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger 
                  id="category"
                  className={`border ${errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Foreman" className="text-gray-900 dark:text-gray-100">Foreman</SelectItem>
                  <SelectItem value="Cloud Nodes" className="text-gray-900 dark:text-gray-100">Cloud Nodes</SelectItem>
                  <SelectItem value="Billing" className="text-gray-900 dark:text-gray-100">Billing</SelectItem>
                  <SelectItem value="General" className="text-gray-900 dark:text-gray-100">General</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger 
                  id="priority"
                  className={`border ${errors.priority ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Low" className="text-gray-900 dark:text-gray-100">Low</SelectItem>
                  <SelectItem value="Medium" className="text-gray-900 dark:text-gray-100">Medium</SelectItem>
                  <SelectItem value="High" className="text-gray-900 dark:text-gray-100">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && (
                <p className="text-sm text-red-500">{errors.priority}</p>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Submitting...
              </>
            ) : 'Submit Ticket'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );