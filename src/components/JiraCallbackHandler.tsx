import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useJiraAuth } from "./JiraAuthContext";

const JiraCallbackHandler = () => {
  const [searchParams] = useSearchParams();
  const { handleJiraCallback } = useJiraAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Processing Jira authentication...");

  useEffect(() => {
    const processAuth = async () => {
      try {
        const code = searchParams.get("code");
        
        if (!code) {
          setStatus("Error: No authentication code received");
          setTimeout(() => navigate("/chat"), 2000);
          return;
        }

        console.log("Processing Jira authentication with code:", code.substring(0, 5) + "...");
        await handleJiraCallback(code);
        setStatus("Authentication successful! Redirecting...");
        setTimeout(() => navigate("/chat"), 1000);
      } catch (error) {
        console.error("Error processing Jira callback:", error);
        setStatus("Authentication failed. Redirecting...");
        setTimeout(() => navigate("/chat"), 2000);
      }
    };

    processAuth();
  }, [searchParams, handleJiraCallback, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <div className="mb-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
        <h1 className="text-xl font-semibold text-gray-700">{status}</h1>
        <p className="text-gray-500 mt-2">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
};

export default JiraCallbackHandler;