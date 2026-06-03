import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <DataProvider>
                    <App />
                    <Toaster 
                        position="top-right" 
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#1f2937',
                                color: '#fff',
                            }
                        }}
                    />
                </DataProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);