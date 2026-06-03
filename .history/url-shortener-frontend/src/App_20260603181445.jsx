import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Links from "./pages/Links";
import Analytics from "./pages/Analytics";
import BulkUpload from "./pages/BulkUpload";
import QRCode from "./pages/QRCode";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    const token =
        localStorage.getItem("token");

    return (

        <Routes>

            {/* Public Routes */}

            <Route
                path="/"
                element={<Landing />}
            />

            <Route
                path="/login"
                element={
                    token
                        ? <Navigate to="/dashboard" />
                        : <Login />
                }
            />

            <Route
                path="/signup"
                element={
                    token
                        ? <Navigate to="/dashboard" />
                        : <Signup />
                }
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
                path="/qr-codes"
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

            <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>

    );
}

export default App;