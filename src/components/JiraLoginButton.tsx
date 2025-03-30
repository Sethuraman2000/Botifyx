import { ChevronDown, LogIn, LogOut } from "lucide-react";
import { JiraLoginModal } from "./JiraLoginModal";
import { useState, useEffect } from "react";
import { useJiraAuth } from "./JiraAuthContext";

export const JiraLoginButton: React.FC = () => {
  const { authState, logout } = useJiraAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Debug auth state on any change
  useEffect(() => {
    console.log("JiraLoginButton - Current auth state:", {
      isAuthenticated: authState.isAuthenticated,
      hasUser: !!authState.user,
      userName: authState.user?.displayName || "n/a",
      avatarUrls: authState.user?.avatarUrls ? "Has avatars" : "No avatars"
    });
  }, [authState]);

  // Get avatar URL helper function
  const getAvatarUrl = () => {
    if (authState.user?.avatarUrls) {
      // Try different sizes in case some are missing
      return authState.user.avatarUrls['48x48'] || 
             authState.user.avatarUrls['32x32'] || 
             authState.user.avatarUrls['24x24'] || 
             "/placeholder.svg";
    }
    return "/placeholder.svg";
  };

  return (
    <>
      {!authState.isAuthenticated ? (
        <button
          onClick={handleLoginClick}
          className="flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          disabled={authState.isLoading}
        >
          {authState.isLoading ? (
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-1" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          <span className="sm:block hidden">Jira Login</span>
          <span className="sm:hidden block">Login</span>
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
          >
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full overflow-hidden border border-gray-200 shadow-sm avatar-transition">
              <img
                src={getAvatarUrl()}
                alt={authState.user?.displayName || "User"}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 max-w-[60px] sm:max-w-[100px] truncate hidden sm:block">
              {authState.user?.displayName || "User"}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 animate-scale-in border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-700">
                    {authState.user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {authState.user?.emailAddress || "No Email"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <JiraLoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};