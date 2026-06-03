import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
	const { isAuthenticated, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <Loader message="Restoring secure session..." />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
}

export default ProtectedRoute;
