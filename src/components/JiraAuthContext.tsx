import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { JiraAuthState } from "../types";
import { useToast } from "../hooks/use-toast";

interface JiraAuthContextType {
  authState: JiraAuthState;
  login: () => void;
  logout: () => void;
  handleJiraCallback: (code: string) => Promise<void>;
  fetchJiraProjects: () => Promise<void>;
}

const JiraAuthContext = createContext<JiraAuthContextType | undefined>(
  undefined
);
const JIRA_CLIENT_ID = import.meta.env.VITE_JIRA_CLIENT_ID;
const JIRA_CLIENT_SECRET = import.meta.env.VITE_JIRA_CLIENT_SECRET;
const JIRA_REDIRECT_URI = `${window.location.origin}/oauth/callback`;
const JIRA_AUTH_KEY = "jira_auth_data";

export const JiraAuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<JiraAuthState>({
    isAuthenticated: false,
    isLoading: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedAuth = sessionStorage.getItem(JIRA_AUTH_KEY);
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        if (parsedAuth.accessToken) {
          setAuthState({
            ...parsedAuth,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Failed to parse saved auth data:", error);
        sessionStorage.removeItem(JIRA_AUTH_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      console.log("User authenticated:", authState.user);
    }
  }, [authState]);

  const login = useCallback(() => {
    const authUrl = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${JIRA_CLIENT_ID}&scope=read%3Ajira-work%20read%3Ajira-user&redirect_uri=${JIRA_REDIRECT_URI}&response_type=code&prompt=consent`;
    window.location.href = authUrl;
  }, []);

  const DEBUG = true;

  const handleJiraCallback = async (code: string) => {
    try {
      if (DEBUG) console.log("🔄 Starting Jira authentication with code:", code.substring(0, 5) + "...");
      
      const response = await fetch("https://auth.atlassian.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: JIRA_CLIENT_ID,
          client_secret: JIRA_CLIENT_SECRET,
          code,
          redirect_uri: JIRA_REDIRECT_URI,
          audience: "api.atlassian.com",
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        if (DEBUG) console.error("❌ Token exchange failed:", response.status, errorText);
        throw new Error(`Failed to exchange code for token: ${errorText || response.statusText}`);
      }
      
      const data = await response.json();
      if (DEBUG) console.log("✅ Token received:", data.access_token ? "Token received" : "No token in response");
  
      // Fetch the user profile
      if (DEBUG) console.log("👤 Fetching user profile...");
      const user = await fetchJiraUserProfile(data.access_token);
      if (DEBUG) console.log("👤 User profile:", user);
  
      const newAuthState = {
        isAuthenticated: true,
        accessToken: data.access_token,
        user,
        isLoading: false,
      };
  
      if (DEBUG) console.log("💾 Setting new auth state:", {
        isAuthenticated: newAuthState.isAuthenticated,
        hasToken: !!newAuthState.accessToken,
        hasUser: !!newAuthState.user,
        userName: newAuthState.user?.displayName
      });
      
      setAuthState(newAuthState);
      if (DEBUG) console.log("➡️ New state set, storing in session storage");
      sessionStorage.setItem(JIRA_AUTH_KEY, JSON.stringify(newAuthState));
  
      toast({
        title: "Success",
        description: `Welcome, ${user.displayName}!`,
      });
    } catch (error) {
      console.error("❌ Jira OAuth Error:", error);
      toast({
        title: "Error",
        description: "Failed to authenticate with Jira",
        variant: "destructive",
      });
    }
  };
  
  // Also modify the fetchJiraUserProfile function:
  const fetchJiraUserProfile = async (accessToken: string) => {
    if (DEBUG) console.log("🌍 Fetching Jira cloud ID...");
    const cloudIdResponse = await fetch(
      "https://api.atlassian.com/oauth/token/accessible-resources",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );
  
    if (!cloudIdResponse.ok) {
      const errorText = await cloudIdResponse.text();
      if (DEBUG) console.error("❌ Cloud ID fetch failed:", cloudIdResponse.status, errorText);
      throw new Error(`Failed to fetch cloud ID: ${errorText || cloudIdResponse.statusText}`);
    }
    
    const cloudIdData = await cloudIdResponse.json();
    if (DEBUG) console.log("🌍 Cloud data:", cloudIdData);
    
    const cloudId = cloudIdData[0]?.id;
    if (!cloudId) {
      if (DEBUG) console.error("❌ No cloud ID found in response");
      throw new Error("No cloud ID available");
    }
    
    if (DEBUG) console.log("🌍 Using cloud ID:", cloudId);
    if (DEBUG) console.log("👤 Fetching user from Jira API...");
    
    const userResponse = await fetch(
      `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/myself`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );
  
    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      if (DEBUG) console.error("❌ User profile fetch failed:", userResponse.status, errorText);
      throw new Error(`Failed to fetch Jira user profile: ${errorText || userResponse.statusText}`);
    }
    
    const userData = await userResponse.json();
    if (DEBUG) console.log("👤 User data received:", userData);
    return userData;
  };

  const fetchJiraProjects = useCallback(async () => {
    if (!authState.isAuthenticated) return;
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(
        "https://api.atlassian.com/ex/jira/cloud/rest/api/3/project",
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch projects");
      const projects = await response.json();
      setAuthState((prev) => ({ ...prev, projects, isLoading: false }));
    } catch (error) {
      console.error("Error fetching Jira projects:", error);
    }
  }, [authState.isAuthenticated, authState.accessToken]);

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, isLoading: false });
    sessionStorage.removeItem(JIRA_AUTH_KEY);
    toast({
      title: "Logged out",
      description: "Successfully logged out from Jira",
    });
    window.location.reload();
  }, []);

  const contextValue = useMemo(
    () => ({
      authState,
      login,
      logout,
      handleJiraCallback,
      fetchJiraProjects,
    }),
    [authState, login, logout, handleJiraCallback, fetchJiraProjects]
  );

  return (
    <JiraAuthContext.Provider value={contextValue}>
      {children}
    </JiraAuthContext.Provider>
  );
};

export const useJiraAuth = (): JiraAuthContextType => {
  const context = useContext(JiraAuthContext);
  if (!context)
    throw new Error("useJiraAuth must be used within a JiraAuthProvider");
  return context;
};
