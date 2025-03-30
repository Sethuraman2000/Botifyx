import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { JiraAuthProvider } from "./components/JiraAuthContext.tsx"; // Ensure correct import path
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JiraAuthProvider>
      <App />
    </JiraAuthProvider>
  </StrictMode>
);
