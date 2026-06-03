import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            className: "!rounded-2xl !border !border-slate-200 !bg-white !text-slate-900 !shadow-[0_18px_60px_rgba(15,23,42,0.12)] dark:!border-white/10 dark:!bg-slate-950 dark:!text-white",
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#ffffff"
              }
            }
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
