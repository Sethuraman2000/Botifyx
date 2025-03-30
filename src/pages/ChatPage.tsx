import React, { useState, useRef, useEffect } from "react";
import {
  Brain,
  Send,
  Trash2,
  Loader2,
  Share2,
  Copy,
  Home,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ChatMessage } from "../types";
import { JiraLoginButton } from "../components/JiraLoginButton";
import { useJiraAuth } from "../components/JiraAuthContext";
import { Textarea } from "../components/Textarea";
import { useToast } from "../hooks/use-toast";

const ChatPage: React.FC = () => {
  const { authState, fetchJiraProjects } = useJiraAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "system",
      content:
        "Welcome to Botifyx! I'm your AI assistant powered by advanced language models. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch user projects when authenticated
  useEffect(() => {
    if (authState.isAuthenticated && !authState.projects) {
      fetchJiraProjects();
    }
  }, [authState.isAuthenticated, authState.projects, fetchJiraProjects]);

  // Fix the authentication state useEffect that's causing duplicate messages

  // Handle authentication state changes
  useEffect(() => {
    // When user authenticates, show a welcome message
    if (authState.isAuthenticated && authState.user) {
      // Check if we already showed a welcome message in this session
      const hasWelcomeMessage = messages.some(
        (msg) =>
          msg.role === "assistant" &&
          msg.content.includes(`Welcome, ${authState.user?.displayName}`)
      );

      if (!hasWelcomeMessage) {
        // Add welcome message with a unique ID to ensure it's not duplicated
        const welcomeId = `welcome-${Date.now()}`;

        // Check if this specific message has been added in the last few seconds
        // This prevents multiple rapid additions of the same message
        const recentlyAdded = messages.some(
          (msg) =>
            msg.id.startsWith("welcome-") &&
            Date.now() - parseInt(msg.id.split("-")[1]) < 5000
        );

        if (!recentlyAdded) {
          setMessages(() => [
            {
              id: welcomeId,
              role: "system",
              content: `Welcome, ${authState.user?.displayName}! You're now connected to Jira. You can ask about your projects or anything else you need help with.`,
              timestamp: new Date(),
            },
          ]);
        }
      }
    }
  }, [authState.isAuthenticated, authState.user?.displayName]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Copy message to clipboard with better error handling
  const copyToClipboard = (content: string) => {
    if (!content) {
      console.error("No content to copy");
      return;
    }

    // Use try/catch for better error handling
    try {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Message content copied successfully",
          });
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          toast({
            title: "Copy failed",
            description: "Could not copy message content",
            variant: "destructive",
          });

          // Fallback method for older browsers
          fallbackCopyToClipboard(content);
        });
    } catch (err) {
      console.error("Clipboard API not available:", err);
      fallbackCopyToClipboard(content);
    }
  };

  // Fallback copy method for browsers without clipboard API
  const fallbackCopyToClipboard = (content: string) => {
    try {
      // Create temporary element
      const el = document.createElement("textarea");
      el.value = content;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);

      // Select and copy
      const selected =
        document.getSelection()?.rangeCount ?? 0 > 0
          ? document.getSelection()?.getRangeAt(0)
          : null;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      // Restore selection if there was any
      if (selected) {
        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(selected);
      }

      toast({
        title: "Copied to clipboard",
        description: "Message content copied successfully (fallback method)",
      });
    } catch (err) {
      console.error("Fallback copy failed:", err);
      toast({
        title: "Copy failed",
        description: "Could not copy message content",
        variant: "destructive",
      });
    }
  };

  // Enhanced share message function
  const shareMessage = async (content: string) => {
    if (!content) {
      console.error("No content to share");
      return;
    }

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shared from Botifyx",
          text: content,
        });
        toast({
          title: "Shared successfully",
          description: "Content was shared successfully",
        });
      } catch (error) {
        // Don't show error toast if user just cancelled the share dialog
        if (error) {
          console.error("Error sharing:", error);
          toast({
            title: "Sharing failed",
            description: "There was a problem sharing this content",
            variant: "destructive",
          });
        }
      }
    } else {
      // Fallback when Web Share API is not available
      copyToClipboard(content);
      toast({
        title: "Copied for sharing",
        description:
          "Your browser doesn't support direct sharing, so we've copied it to your clipboard instead.",
      });
    }
  };

  // Update the API integration for real responses
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check if user is authenticated with clear feedback
    if (!authState.isAuthenticated) {
      // Emit toast notification
      toast({
        title: "Authentication Required",
        description: "Please login with Jira to start prompting",
        variant: "destructive",
      });

      // Clear any input the user may have entered while not authorized
      setInput("");
      return;
    }

    // User is authenticated, proceed with sending message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    // Add message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Get previous user queries and assistant responses, excluding system messages
    const previousMessages = messages.filter((msg) => msg.role !== "system");
    const previous_queries = previousMessages
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content)
      .join("\n\n"); // Join with double newlines for clear separation

    const previous_responses = previousMessages
      .filter((msg) => msg.role === "assistant")
      .map((msg) => msg.content)
      .join("\n\n"); // Join with double newlines for clear separation

    // Call the external API
    try {
      const response = await fetch("https://botifyx-backend-botifyxs-projects.vercel.app/new_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input,
          email_id: authState?.user?.emailAddress,
          access_token: authState?.accessToken,
          previous_query: previous_queries,
          previous_response: previous_responses,
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "Sorry, I couldn't process your request.", // Get the response from the API or show a fallback
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling the API:", error);

      // Show error message in cha
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "system",
        content:
          "I apologize, but I encountered an issue processing your request. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);

      // Also show toast notification
      toast({
        title: "Error",
        description: "Failed to get a response from the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update the clearChat function to avoid adding duplicate welcome messages

  const clearChat = () => {
    // Reset to just the initial welcome message
    setMessages([
      {
        id: "1",
        role: "system",
        content:
          "Welcome to Botifyx! I'm your AI assistant powered by advanced language models. How can I help you today?",
        timestamp: new Date(),
      },
    ]);

    // If user is authenticated, add a welcome message after clearing
    if (authState.isAuthenticated && authState.user) {
      // Short delay to ensure the clear happens first
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `welcome-clear-${Date.now()}`,
            role: "assistant",
            content: `Welcome back, ${authState.user?.displayName}! Your chat has been cleared. What would you like to discuss now?`,
            timestamp: new Date(),
          },
        ]);
      }, 100);
    }
  };

  const getAvatarUrl = () => {
    if (authState.user?.avatarUrls) {
      // Try different sizes in case some are missing
      return (
        authState.user.avatarUrls["48x48"] ||
        authState.user.avatarUrls["32x32"] ||
        authState.user.avatarUrls["24x24"] ||
        "/placeholder.svg"
      );
    }
    return "/placeholder.svg";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div
          className="mx-auto"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-display font-bold text-gray-900">
                  Botifyx
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <JiraLoginButton />
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-1">
                <div
                  className={`h-2 w-2 rounded-full ${
                    authState.isAuthenticated ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm text-gray-600 hidden sm:block">
                  Botifyx
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main chat area */}
        <main className="flex-1 flex flex-col bg-white">
          {!authState.isAuthenticated && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
              <div className="flex items-center text-amber-800 text-sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>
                  Please log in with your Jira account to enable full
                  functionality
                </span>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-3xl ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 ${
                      message.role === "user" ? "ml-3" : "mr-3"
                    }`}
                  >
                    {message.role === "user" ? (
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={getAvatarUrl()}
                          alt={authState.user?.displayName || "User"}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-primary-600" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary-600 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    {message.role === "assistant" && (
                      <div className="mt-2 pt-2 border-t border-gray-200 flex justify-end space-x-2">
                        <button
                          className="text-gray-500 hover:text-gray-700 p-1"
                          onClick={() => copyToClipboard(message.content)}
                          title="Copy message"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-500 hover:text-gray-700 p-1"
                          onClick={() => shareMessage(message.content)}
                          title="Share message"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-3xl">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                      <span className="text-gray-500">
                        Botifyx is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <form
              onSubmit={handleSendMessage}
              className="flex items-end space-x-2"
            >
              <div
                className={`flex-1 relative rounded-xl shadow-sm border ${
                  !authState.isAuthenticated
                    ? "border-gray-300 bg-gray-50"
                    : "border-gray-200 bg-white"
                } hover:border-gray-300 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-300 focus-within:ring-opacity-50 transition-all duration-200`}
              >
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    authState.isAuthenticated
                      ? "Message Botifyx..."
                      : "Please login with Jira to start chatting..."
                  }
                  className={`resize-none max-h-36 min-h-[2.5rem] w-full px-4 py-3 border-none focus:ring-0 ${
                    !authState.isAuthenticated
                      ? "bg-gray-50 text-gray-500"
                      : "bg-transparent text-sm text-gray-800"
                  } focus:outline-none placeholder:text-gray-400`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  disabled={!authState.isAuthenticated}
                />
                <div className="flex justify-between items-center p-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500 font-medium">
                    Powered by Botifyx AI
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-700 p-1.5 rounded-md transition-colors hover:bg-gray-100"
                      onClick={clearChat}
                      title="Clear conversation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      type="submit"
                      className={`${
                        authState.isAuthenticated
                          ? "bg-primary-600 hover:bg-primary-700"
                          : "bg-gray-400"
                      } text-white rounded-md p-1.5 w-9 h-9 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={
                        !input.trim() || isLoading || !authState.isAuthenticated
                      }
                      title={
                        authState.isAuthenticated
                          ? "Send message"
                          : "Login required"
                      }
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
