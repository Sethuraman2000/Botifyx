import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, X, Check, Loader2 } from 'lucide-react';
import { useJiraStore } from '../store/jiraStore';
import { initiateJiraAuth } from '../services/Jira';

interface JiraConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

const JiraConfig: React.FC<JiraConfigProps> = ({ isOpen, onClose }) => {
  const { config } = useJiraStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      await initiateJiraAuth();
    } catch (error) {
      console.error('Failed to initiate Jira auth:', error);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Jira Configuration
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {config.isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center text-green-600 mb-4">
                <Check className="h-5 w-5 mr-2" />
                <span>Connected to Jira</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Username</span>
                  <p className="font-medium">{config.username}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Project</span>
                  <p className="font-medium">{config.projectName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Project ID</span>
                  <p className="font-medium">{config.projectId}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Connect Botifyx to your Jira account to get started
              </p>
              <button
                onClick={handleAuth}
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect to Jira'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JiraConfig;