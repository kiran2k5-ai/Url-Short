import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    const token = localStorage.getItem("token");

    return (
        <Routes>

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

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>
    );
}

export default App;