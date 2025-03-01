export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.FC;
}

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}