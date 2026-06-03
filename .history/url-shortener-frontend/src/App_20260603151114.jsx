import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute
from "./components/ProtectedRoute";

import {
    Routes,
    Route
} from "react-router-dom";

function App() {

    return (
        <Routes>

            <Route
                path="/"
                element={<Login />}
            />
            <Route path="/" element={<Landing />} />
            <Route
                path="/signup"
                element={<Signup />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;