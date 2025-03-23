'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User, Send, AlertCircle, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I\'m Terra\'s AI assistant. How can I help you today with mining operations, billing, or technical support?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Function to generate AI responses based on user input
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('billing') || input.includes('invoice') || input.includes('payment')) {
      return "Your current billing cycle ends on the 25th of this month. Your last invoice was for $1,500.00 and was paid on March 5th. If you have specific questions about charges or need to update payment information, please submit a detailed ticket for our billing team.";
    }
    
    if (input.includes('miner') || input.includes('mining') || input.includes('hash') || input.includes('foreman')) {
      return "Your mining farm is currently operating at 98.2% efficiency with 42 active miners. The current hash rate is 4.2 PH/s. If you're experiencing issues with specific miners, please provide their IDs or IP addresses so I can give you more detailed information.";
    }
    
    if (input.includes('cloud') || input.includes('node') || input.includes('server')) {
      return "Your cloud nodes are running normally. You're currently using 78% of your allocated storage and 65% of compute resources. Would you like information about scaling options or performance optimization?";
    }
    
    if (input.includes('password') || input.includes('reset') || input.includes('login')) {
      return "For security reasons, I can't handle password resets directly. Please use the 'Forgot Password' option on the login page or submit a ticket for account access issues, and our team will assist you promptly.";
    }
    
    if (input.includes('upgrade') || input.includes('plan') || input.includes('subscription')) {
      return "We offer several upgrade options for your current plan. You can increase your compute resources, storage, or add advanced monitoring features. Would you like me to have a sales representative contact you with specific pricing for your needs?";
    }
    
    return "I understand you're asking about " + input.split(' ').slice(0, 3).join(' ') + "... For detailed information on this topic, I'd recommend creating a support ticket so our specialists can assist you. Would you like information on any specific area of our services in the meantime?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
        <DialogHeader className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="flex items-center text-gray-900 dark:text-gray-100">
            <Bot className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
            Terra AI Assistant
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-8 w-8 mx-2">
                  {message.role === 'assistant' ? (
                    <>
                      <AvatarImage src="/avatars/bot.png" />
                      <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/avatars/user.png" />
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className={`rounded-lg px-4 py-2 ${
                  message.role === 'assistant' 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                    : 'bg-blue-500 dark:bg-blue-600 text-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start max-w-[80%]">
                <Avatar className="h-8 w-8 mx-2">
                  <AvatarImage src="/avatars/bot.png" />
                  <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-end">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="absolute right-1 bottom-1 h-8 w-8 p-0 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                variant="ghost"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <Button 
              variant="ghost" 
              className="text-xs flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-0"
              onClick={() => setMessages([{
                id: '1',
                role: 'assistant',
                content: 'Hi there! I\'m Terra\'s AI assistant. How can I help you today with mining operations, billing, or technical support?',
                timestamp: new Date()
              }])}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset conversation
            </Button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              For complex issues, please submit a support ticket
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}