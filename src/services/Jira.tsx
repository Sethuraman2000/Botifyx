import { JiraAuthResponse } from '../types';

const JIRA_CLIENT_ID = import.meta.env.VITE_JIRA_CLIENT_ID;
const JIRA_REDIRECT_URI = `${window.location.origin}/chat`;

export async function initiateJiraAuth() {
  const authUrl = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${JIRA_CLIENT_ID}&scope=read%3Ajira-work%20read%3Ajira-user&redirect_uri=${JIRA_REDIRECT_URI}&response_type=code&prompt=consent`;
  window.location.href = authUrl;
}

export async function handleJiraCallback(code: string): Promise<JiraAuthResponse> {
  const response = await fetch('https://auth.atlassian.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: JIRA_CLIENT_ID,
      client_secret: import.meta.env.VITE_JIRA_CLIENT_SECRET,
      code,
      redirect_uri: JIRA_REDIRECT_URI,
      audience: 'api.atlassian.com',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
}

export async function fetchJiraCloudId(accessToken: string) {
    const response = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch Jira Cloud ID');
    }
  
    const cloudResources = await response.json();
    return cloudResources[0]?.id; // ✅ First cloud instance ID
  }
  

  export async function fetchJiraUserInfo(accessToken: string) {
    const cloudId = await fetchJiraCloudId(accessToken);
  
    const response = await fetch(`'https://cors-anywhere.herokuapp.com/https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/myself`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
  
    return response.json();
  }
  

export async function fetchJiraProjects(accessToken: string) {
  const response = await fetch('https://api.atlassian.com/ex/jira/cloud/rest/api/3/project', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}