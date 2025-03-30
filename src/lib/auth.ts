
// Mock Jira user data
export interface JiraUser {
  accountId: string;
  displayName: string;
  emailAddress: string;
  avatarUrl: string;
}

// Mock Jira project data
export interface JiraProject {
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: {
    '48x48': string;
  };
}

// Mock authentication service
export const authService = {
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('jira_token') !== null;
  },
  
  // Get authentication token
  getToken: (): string | null => {
    return localStorage.getItem('jira_token');
  },
  
  // Set authentication token
  setToken: (token: string): void => {
    localStorage.setItem('jira_token', token);
  },
  
  // Clear authentication token
  clearToken: (): void => {
    localStorage.removeItem('jira_token');
    localStorage.removeItem('jira_user');
    localStorage.removeItem('jira_projects');
  },
  
  // Mock fetching user data
  fetchUserData: async (): Promise<JiraUser> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: JiraUser = {
          accountId: 'user-123',
          displayName: 'John Doe',
          emailAddress: 'john.doe@example.com',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        };
        
        localStorage.setItem('jira_user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 800);
    });
  },
  
  // Mock fetching user projects
  fetchUserProjects: async (): Promise<JiraProject[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockProjects: JiraProject[] = [
          {
            id: 'project-1',
            key: 'BOT',
            name: 'Botifyx Development',
            projectTypeKey: 'software',
            simplified: false,
            avatarUrls: {
              '48x48': 'https://picsum.photos/seed/botifyx/48'
            }
          },
          {
            id: 'project-2',
            key: 'CRM',
            name: 'Customer Management',
            projectTypeKey: 'business',
            simplified: true,
            avatarUrls: {
              '48x48': 'https://picsum.photos/seed/crm/48'
            }
          },
          {
            id: 'project-3',
            key: 'MKT',
            name: 'Marketing Campaign',
            projectTypeKey: 'business',
            simplified: true,
            avatarUrls: {
              '48x48': 'https://picsum.photos/seed/marketing/48'
            }
          }
        ];
        
        localStorage.setItem('jira_projects', JSON.stringify(mockProjects));
        resolve(mockProjects);
      }, 1200);
    });
  },
  
  // Get stored user data
  getUser: (): JiraUser | null => {
    const userString = localStorage.getItem('jira_user');
    return userString ? JSON.parse(userString) : null;
  },
  
  // Get stored projects
  getProjects: (): JiraProject[] | null => {
    const projectsString = localStorage.getItem('jira_projects');
    return projectsString ? JSON.parse(projectsString) : null;
  }
};
