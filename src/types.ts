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


export interface JiraConfig {
  isAuthenticated: boolean;
  username?: string;
  projectName?: string;
  projectId?: string;
}

export interface JiraAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}


export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface JiraUser {
  accountId: string;
  accountType: string;
  displayName: string;
  emailAddress?: string;
  avatarUrls?: {
    '48x48'?: string;
    '24x24'?: string;
    '16x16'?: string;
    '32x32'?: string;
  };
}

export interface JiraProject {
  id: string;
  key: string;
  name: string;
  avatarUrls?: Record<string, string>;
}

export interface JiraAuthState {
  isAuthenticated: boolean;
  accessToken?: string;
  user?: JiraUser;
  projects?: JiraProject[];
  isLoading: boolean;
  error?: string;
}