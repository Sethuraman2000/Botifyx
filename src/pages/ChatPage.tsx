import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Send, Trash2, Plus, ChevronLeft, Loader2, Download, Share2, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../types';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to Botifyx! I\'m your AI assistant powered by advanced language models. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<string[]>([
    'New conversation',
    'Sales analysis Q2 2025',
    'Marketing strategy',
    'Product roadmap'
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Simple response generator for demo purposes
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! I'm Botifyx, your AI assistant. How can I help you today?";
    } else if (input.includes('help')) {
      return "I can help with a variety of tasks including answering questions, generating content, analyzing data, and more. Just let me know what you need!";
    } else if (input.includes('feature') || input.includes('can you')) {
      return "As an AI assistant, I can help with content creation, data analysis, answering questions, brainstorming ideas, and much more. I'm designed to be your productivity partner.";
    } else if (input.includes('thank')) {
      return "You're welcome! If you have any other questions or need assistance with anything else, feel free to ask.";
    } else {
      return "I've processed your request. To provide a more accurate response, I would need to connect to the OpenAI API. In a production environment, I would generate a thoughtful, helpful response based on your specific query.";
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'system',
        content: 'Welcome to Botifyx! I\'m your AI assistant powered by advanced language models. How can I help you today?',
        timestamp: new Date()
      }
    ]);
  };

  const newChat = () => {
    clearChat();
    setConversations(prev => ['New conversation', ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-display font-bold text-gray-900">Botifyx</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <ChevronLeft /> : <Plus />}
              </button>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Botifyx</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <motion.aside 
          className={`bg-white border-r border-gray-200 w-64 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4">
            <button 
              onClick={newChat}
              className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md py-2 px-4 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>New Chat</span>
            </button>
          </div>
          
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent conversations</h3>
            <div className="mt-2 space-y-1">
              {conversations.map((title, index) => (
                <button 
                  key={index}
                  className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Brain className="h-4 w-4 text-gray-500" />
                  <span className="truncate">{title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <button 
              onClick={clearChat}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md py-2 px-4 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
              <span>Clear conversation</span>
            </button>
          </div>
        </motion.aside>

        {/* Main chat area */}
        <main className="flex-1 flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0 mr-3">
                    {message.role === 'user' ? (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">U</span>
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-primary-600" />
                      </div>
                    )}
                  </div>
                  <div 
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === 'user' 
                        ? 'bg-primary-600 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.role === 'assistant' && (
                      <div className="mt-2 pt-2 border-t border-gray-200 flex justify-end space-x-2">
                        <button className="text-gray-500 hover:text-gray-700 p-1">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-1">
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
                      <span className="text-gray-500">Botifyx is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
              <div className="flex-1 bg-gray-100 rounded-lg p-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Botifyx..."
                  className="w-full bg-transparent border-0 focus:ring-0 resize-none max-h-32 min-h-[2.5rem]"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Powered by OpenAI
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      type="button"
                      className="text-gray-500 hover:text-gray-700 p-1"
                      onClick={clearChat}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button 
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 text-white rounded-md p-1 w-8 h-8 flex items-center justify-center"
                      disabled={!input.trim() || isLoading}
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