import { create } from 'zustand';
import { JiraConfig } from '../types';

interface JiraStore {
  config: JiraConfig;
  setConfig: (config: Partial<JiraConfig>) => void;
  resetConfig: () => void;
}

const initialConfig: JiraConfig = {
  isAuthenticated: false,
  username: undefined,
  projectName: undefined,
  projectId: undefined,
};

export const useJiraStore = create<JiraStore>((set) => ({
  config: initialConfig,
  setConfig: (newConfig) => 
    set((state) => ({ 
      config: { ...state.config, ...newConfig } 
    })),
  resetConfig: () => set({ config: initialConfig }),
}));