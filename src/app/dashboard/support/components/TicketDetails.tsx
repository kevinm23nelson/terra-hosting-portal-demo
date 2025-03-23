"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Loader2,
  XCircle,
  Pencil,
  Send,
  Save,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Define necessary types
interface UserProfile {
  firstName?: string;
  lastName?: string;
  profilePicture?: string | null;
}

interface User {
  id: string;
  email: string;
  role?: string;
  profile?: UserProfile;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  createdBy: User;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  dueDate: string;
  resolution: string | null;
  clientId: string | null; // Changed from any
  assignedTo: User | null; // Changed from any
  createdBy: User; // Changed from any
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
}

interface EditedTicketData {
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
}

interface TicketDetailsProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "Invalid Date";
  }
};

export function TicketDetails({ ticket, isOpen, onClose }: TicketDetailsProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState<EditedTicketData | null>(
    null
  );
  const [isClosingTicket, setIsClosingTicket] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [showReopenConfirmation, setShowReopenConfirmation] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  // Reset editing state when modal is closed or ticket changes
  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setEditedTicket(null);
      setShowCloseConfirmation(false);
      setShowReopenConfirmation(false);
    } else if (ticket?.comments) {
      // Initialize local comments when the modal opens
      setLocalComments(ticket.comments);
    }
  }, [isOpen, ticket]);

  // Smooth scroll to bottom of comments
  const scrollToBottom = () => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Scroll to bottom when new comments are added
  useEffect(() => {
    if (localComments?.length) {
      scrollToBottom();
    }
  }, [localComments]);

  const handleEditClick = () => {
    if (!ticket) return;

    setEditedTicket({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      category: ticket.category,
    });
    setIsEditing(true);
  };

  const handleStatusChange = (value: string) => {
    if (!editedTicket) return;

    if (value === "closed") {
      setIsClosingTicket(true);
      setShowCloseConfirmation(true);
      setEditedTicket({
        ...editedTicket,
        status: value,
      });
    } else {
      setEditedTicket({
        ...editedTicket,
        status: value,
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editedTicket || !ticket) return;

    // If trying to close the ticket, show confirmation first
    if (editedTicket.status === "closed" && !isClosingTicket) {
      setIsClosingTicket(true);
      setShowCloseConfirmation(true);
      return;
    }

    try {
      // Simulate API call
      console.log("Saving edited ticket:", editedTicket);
      setTimeout(() => {
        setIsEditing(false);
        setEditedTicket(null);
        setShowCloseConfirmation(false);
        setIsClosingTicket(false);
      }, 1000);
    } catch (error) {
      console.error("Error updating ticket:", error);
      setEditedTicket(null);
      setIsEditing(false);
      setIsClosingTicket(false);
    }
  };

  // Cancel the close confirmation
  const handleCancelClose = () => {
    setShowCloseConfirmation(false);
    setIsClosingTicket(false);

    // Reset status to original
    if (editedTicket && ticket) {
      setEditedTicket({
        ...editedTicket,
        status: ticket.status,
      });
    }
  };

  // Handle reopening a closed ticket
  const handleReopenClick = () => {
    setShowReopenConfirmation(true);
  };

  // Confirm reopening the ticket
  const handleConfirmReopen = async () => {
    if (!ticket) return;

    try {
      // Simulate API call
      console.log("Reopening ticket:", ticket.id);
      setTimeout(() => {
        setShowReopenConfirmation(false);
      }, 1000);
    } catch (error) {
      console.error("Error reopening ticket:", error);
      setShowReopenConfirmation(false);
    }
  };

  // Cancel reopening
  const handleCancelReopen = () => {
    setShowReopenConfirmation(false);
  };

  // Custom close handler to ensure editing state is reset
  const handleClose = () => {
    setIsEditing(false);
    setEditedTicket(null);
    setShowCloseConfirmation(false);
    setShowReopenConfirmation(false);
    setIsClosingTicket(false);
    onClose();
  };

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim() || !ticket || isSubmitting || isEditing) return;

    setIsSubmitting(true);
    const commentContent = newComment.trim();

    // Create a mock user for the comment
    const mockUser = {
      id: "client-123",
      email: "client@example.com",
      role: "client",
      profile: {
        firstName: "John",
        lastName: "Doe",
        profilePicture: null,
      },
    };

    // Optimistically add the comment to the UI
    const optimisticComment: Comment = {
      id: `temp-${Date.now()}`,
      content: commentContent,
      createdAt: new Date().toISOString(),
      createdBy: mockUser,
    };

    // Update local comments immediately for a smooth experience
    setLocalComments([...localComments, optimisticComment]);

    // Clear the input right away for better UX
    setNewComment("");

    try {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Revert the optimistic update if there's an error
      setLocalComments(ticket.comments || []);
      setNewComment(commentContent);
      setIsSubmitting(false);
    }
  };

  const renderUserAvatar = (user: User, isCurrentUser: boolean) => {
    const isAdmin = user.role === "admin";
    const avatarLetter =
      user.profile?.firstName?.[0] || user.email[0].toUpperCase();

    return (
      <div
        className={`w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 ${
          isCurrentUser ? "ml-2" : "mr-2"
        }`}
      >
        {isAdmin ? (
          // Admin avatar - use grogu.webp
          <div className="relative w-full h-full">
            <Image
              src="/images/grogu.webp"
              alt="Admin"
              width={32}
              height={32}
              className="object-cover w-full h-full"
              onError={() => {
                // We can't directly manipulate the DOM with Next.js Image
                // so we'll rely on the fallback below
                console.log("Admin image failed to load");
              }}
            />
          </div>
        ) : isCurrentUser ? (
          // Client avatar - use face-with-cowboy-hat.svg like in AppBar
          <div className="relative w-full h-full">
            <Image
              src="/images/face-with-cowboy-hat.svg"
              alt="Client"
              width={32}
              height={32}
              className="object-cover w-full h-full"
              onError={() => {
                console.log("Client image failed to load");
              }}
            />
          </div>
        ) : (
          // Other users (not current client and not admin) - use standard gradient fallback
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold">
            {avatarLetter}
          </div>
        )}
      </div>
    );
  };

  // Helper functions for badge styling
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "to do":
        return "bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-500 font-medium";
      case "in progress":
        return "bg-sky-200 dark:bg-sky-700 text-sky-800 dark:text-white border border-sky-300 dark:border-sky-600 font-medium";
      case "completed":
        return "bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-white border border-emerald-300 dark:border-emerald-600 font-medium";
      case "closed":
        return "bg-violet-200 dark:bg-violet-700 text-violet-800 dark:text-white border border-violet-300 dark:border-violet-600 font-medium";
      default:
        return "bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-500 font-medium";
    }
  };

  // Priority badges with higher contrast
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "border-2 border-rose-400 text-rose-800 dark:text-rose-100 bg-rose-100 dark:bg-rose-800";
      case "medium":
        return "border-2 border-amber-400 text-amber-800 dark:text-amber-100 bg-amber-100 dark:bg-amber-800";
      case "low":
        return "border-2 border-teal-400 text-teal-800 dark:text-teal-100 bg-teal-100 dark:bg-teal-800";
      default:
        return "border-2 border-slate-400 text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800";
    }
  };

  // Category badges with higher contrast
  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case "foreman":
        return "bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-white border border-indigo-300 dark:border-indigo-600 hover:bg-indigo-300 dark:hover:bg-indigo-600 font-medium";
      case "cloud nodes":
        return "bg-cyan-200 dark:bg-cyan-700 text-cyan-800 dark:text-white border border-cyan-300 dark:border-cyan-600 hover:bg-cyan-300 dark:hover:bg-cyan-600 font-medium";
      case "billing":
        return "bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-white border border-amber-300 dark:border-amber-600 hover:bg-amber-300 dark:hover:bg-amber-600 font-medium";
      case "general":
        return "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium";
      default:
        return "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium";
    }
  };

  return (
    <>
      <Dialog
        open={isOpen && !showCloseConfirmation && !showReopenConfirmation}
        onOpenChange={handleClose}
      >
        <DialogContent className="sm:max-w-[700px] lg:max-w-[900px] max-h-[85vh] flex flex-col p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="pb-3">
            <DialogTitle className="text-lg text-gray-900 dark:text-gray-100">
              Ticket Details
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col lg:flex-row gap-4 min-h-0 flex-1 overflow-hidden">
            {/* Left Column - Ticket Details */}
            <div className="flex flex-col space-y-4 lg:w-[40%]">
              {isEditing && editedTicket ? (
                <div className="space-y-3">
                  <div className="mx-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <Input
                      value={editedTicket.title}
                      onChange={(e) =>
                        setEditedTicket({
                          ...editedTicket,
                          title: e.target.value,
                        })
                      }
                      className="mt-1 w-[98%] mx-auto block focus:ring-1 focus:ring-offset-0 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="mx-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <Textarea
                      value={editedTicket.description}
                      onChange={(e) =>
                        setEditedTicket({
                          ...editedTicket,
                          description: e.target.value,
                        })
                      }
                      className="mt-1 h-24 w-[98%] mx-auto block focus:ring-1 focus:ring-offset-0 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mx-1">
                    <div className="mr-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </label>
                      <Select
                        value={editedTicket.status}
                        onValueChange={handleStatusChange}
                      >
                        <SelectTrigger className="mt-1 w-[97%] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          {/* Only show current status and closed option */}
                          <SelectItem
                            value={ticket?.status || "to do"}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {ticket?.status === "to do"
                              ? "To Do"
                              : ticket?.status === "in progress"
                              ? "In Progress"
                              : ticket?.status === "completed"
                              ? "Completed"
                              : "Closed"}
                          </SelectItem>
                          {ticket?.status !== "closed" && (
                            <SelectItem
                              value="closed"
                              className="text-gray-900 dark:text-gray-100"
                            >
                              Closed
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mx-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Priority
                      </label>
                      <Select
                        value={editedTicket.priority}
                        onValueChange={(value) =>
                          setEditedTicket({
                            ...editedTicket,
                            priority: value,
                          })
                        }
                      >
                        <SelectTrigger className="mt-1 w-[97%] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <SelectItem
                            value="low"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            Low
                          </SelectItem>
                          <SelectItem
                            value="medium"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            Medium
                          </SelectItem>
                          <SelectItem
                            value="high"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="ml-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <Select
                        value={editedTicket.category}
                        onValueChange={(value) =>
                          setEditedTicket({
                            ...editedTicket,
                            category: value,
                          })
                        }
                      >
                        <SelectTrigger className="mt-1 w-[97%] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <SelectItem
                            value="general"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            General
                          </SelectItem>
                          <SelectItem
                            value="billing"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            Billing
                          </SelectItem>
                          <SelectItem
                            value="foreman"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            Foreman
                          </SelectItem>
                          <SelectItem
                            value="cloud nodes"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            Cloud Nodes
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {ticket?.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {ticket?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Status
                      </label>
                      <div className="mt-1">
                        <Badge
                          className={getStatusColor(ticket?.status || "to do")}
                        >
                          {ticket?.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Priority
                      </label>
                      <div className="mt-1">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                            ticket?.priority || "medium"
                          )}`}
                        >
                          {ticket?.priority}
                          {ticket?.priority === "High" && (
                            <AlertCircle className="ml-1 h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Category
                      </label>
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className={getCategoryBadge(
                            ticket?.category || "general"
                          )}
                        >
                          {ticket?.category}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Created
                      </label>
                      <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {formatDate(ticket?.createdAt || "")}
                      </div>
                    </div>
                  </div>

                  {ticket?.resolution && (
                    <div className="mt-2">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Resolution
                      </label>
                      <div className="mt-1 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-green-800 dark:text-green-300 text-sm">
                        {ticket.resolution}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Edit/Save Buttons */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedTicket(null);
                      }}
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      size="sm"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSaveEdit}
                      disabled={isSubmitting}
                      className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 flex items-center text-sm"
                      size="sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-3 h-3 mr-1" />
                          {editedTicket?.status === "closed"
                            ? "Close Ticket"
                            : "Save Changes"}
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    {ticket?.status === "closed" ? (
                      <Button
                        type="button"
                        onClick={handleReopenClick}
                        className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 flex items-center text-sm"
                        size="sm"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Re-open Ticket
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleEditClick}
                        className="bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600 flex items-center text-sm"
                        size="sm"
                        disabled={ticket?.status === "closed"}
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit Ticket
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Comments */}
            <div className="flex flex-col lg:w-[60%] lg:border-l lg:pl-6 min-h-0 border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                Comments ({localComments?.length || 0})
              </h4>

              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-[250px] pr-4">
                  <div className="space-y-3">
                    {localComments?.map((comment) => {
                      const isCurrentUser =
                        comment.createdBy.id === "client-123"; // Mock client ID
                      const isAdmin = comment.createdBy.role === "admin";

                      return (
                        <div
                          key={comment.id}
                          className={`flex ${
                            isCurrentUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          {/* Profile picture for non-current users (left side) */}
                          {!isCurrentUser &&
                            renderUserAvatar(comment.createdBy, false)}

                          <div
                            className={`max-w-[85%] rounded-lg p-3 ${
                              isCurrentUser
                                ? "bg-blue-500 dark:bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className={`text-xs ${
                                  isCurrentUser
                                    ? "text-blue-100 dark:text-blue-200"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {comment.createdBy.profile?.firstName
                                  ? `${comment.createdBy.profile.firstName} ${
                                      comment.createdBy.profile.lastName || ""
                                    }`
                                  : comment.createdBy.email}
                                {isAdmin && (
                                  <span
                                    className={`ml-1 px-1 py-0.5 rounded text-[10px] ${
                                      isCurrentUser
                                        ? "bg-blue-400 dark:bg-blue-500 text-white"
                                        : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                                    }`}
                                  >
                                    Admin
                                  </span>
                                )}
                              </div>
                              <div
                                className={`text-xs ${
                                  isCurrentUser
                                    ? "text-blue-100 dark:text-blue-200"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                • {formatDate(comment.createdAt)}
                              </div>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                            <div
                              className={`text-xs mt-1 ${
                                isCurrentUser
                                  ? "text-blue-100 dark:text-blue-200"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                            >
                              {comment.createdBy.email}
                            </div>
                          </div>

                          {/* Profile picture for current user (right side) */}
                          {isCurrentUser &&
                            renderUserAvatar(comment.createdBy, true)}
                        </div>
                      );
                    })}
                    {/* This empty div is used for scrolling to the end of comments */}
                    <div ref={commentsEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Comment form */}
              <form
                onSubmit={handleAddComment}
                className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="mx-1">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px] text-sm block w-[98%] mx-auto focus:ring-1 focus:ring-offset-0 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    disabled={isEditing}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex items-center text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    size="sm"
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Close
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim() || isEditing}
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 flex items-center text-sm"
                    size="sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3 mr-1" />
                        Send Comment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Closing Ticket */}
      <Dialog
        open={showCloseConfirmation}
        onOpenChange={(open) => {
          if (!open) handleCancelClose();
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <AlertCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
              Close Ticket Confirmation
            </DialogTitle>
            <DialogDescription className="pt-2 text-gray-500 dark:text-gray-400">
              Are you sure you want to close this ticket? You can always view
              this and re-open this ticket later from your ticket history list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-between gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelClose}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveEdit}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Closing...
                </>
              ) : (
                "Yes, Close Ticket"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Reopening Ticket */}
      <Dialog
        open={showReopenConfirmation}
        onOpenChange={(open) => {
          if (!open) handleCancelReopen();
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <RefreshCw className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              Re-open Ticket Confirmation
            </DialogTitle>
            <DialogDescription className="pt-2 text-gray-500 dark:text-gray-400">
              Are you sure you wish to re-open this ticket? This will move it
              back to your active tickets list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-between gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelReopen}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmReopen}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Yes, Re-open Ticket"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
