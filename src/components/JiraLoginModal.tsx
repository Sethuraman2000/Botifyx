import React from "react";
import { ExternalLink } from "lucide-react";
import { useJiraAuth } from "./JiraAuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/Dialog";

interface JiraLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JiraLoginModal: React.FC<JiraLoginModalProps> = ({ isOpen, onClose }) => {
  const { login, authState } = useJiraAuth();

  const handleLogin = () => {
    login();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6" style={{backgroundColor: 'white'}}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex justify-between items-center">
            Connect to Jira
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-gray-600 mb-4">
          Connect to your Jira account to access your projects and issues directly from this chat interface.
        </DialogDescription>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-blue-800 mb-2">What you'll get:</h3>
          <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
            <li>Access to your Jira projects</li>
            <li>View and manage your issues</li>
            <li>Create new tickets directly from chat</li>
            <li>Get notifications about important updates</li>
          </ul>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          <p className="mb-1">
            Note: This is a demonstration of OAuth2 authentication flow. In a real implementation, you would be redirected to Jira to authorize access.
          </p>
          <p>No actual connection to Jira is made in this demo.</p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogin}
            disabled={authState.isLoading}
            className="flex items-center px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            {authState.isLoading ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            ) : (
              <ExternalLink className="h-4 w-4 mr-2" />
            )}
            Connect to Jira
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
