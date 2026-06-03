import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Links from "./pages/Links";
import Analytics from "./pages/Analytics";
import BulkUpload from "./pages/BulkUpload";
import QRCode from "./pages/QRCode";
import Domains from "./pages/Domains";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import { LoadingProvider } from "./context/LoadingContext";
import PageLoader from "./components/PageLoader";

function AppRoutes() {
    const token = localStorage.getItem("token");

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />

            <Route
                path="/login"
                element={token ? <Navigate to="/dashboard" /> : <Login />}
            />

            <Route
                path="/signup"
                element={token ? <Navigate to="/dashboard" /> : <Signup />}
            />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/links"
                element={
                    <ProtectedRoute>
                        <Links />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/bulk-upload"
                element={
                    <ProtectedRoute>
                        <BulkUpload />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/qrcode"
                element={
                    <ProtectedRoute>
                        <QRCode />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

function App() {
    return (
        <LoadingProvider>
            <PageLoader />
            <AppRoutes />
        </LoadingProvider>
    );
}

export default App;