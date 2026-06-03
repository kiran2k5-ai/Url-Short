import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function DashboardLayout() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dashboard-shell flex min-h-screen text-[var(--text)]">
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={logout}
                user={user}
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <Navbar
                    user={user}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet context={{ user, logout }} />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;