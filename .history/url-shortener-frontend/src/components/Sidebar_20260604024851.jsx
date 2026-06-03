import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import {
    LayoutDashboard,
    Link2,
    BarChart3,
    QrCode,
    Upload,
    Globe,
    Bell,
    User,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { setIsLoading } = useLoading();

    const menu = [
        { path: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { path: "/links", icon: <Link2 size={20} />, label: "My Links" },
        { path: "/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
        { path: "/qrcode", icon: <QrCode size={20} />, label: "QR Codes" },
        { path: "/bulk-upload", icon: <Upload size={20} />, label: "Bulk Upload" },
        { path: "/domains", icon: <Globe size={20} />, label: "Domains" },
        { path: "/notifications", icon: <Bell size={20} />, label: "Notifications" }
    ];

    const handleNavClick = (path) => {
        if (path !== "#") {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 300);
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoading(true);
        setTimeout(() => {
            navigate("/login");
            setIsLoading(false);
        }, 300);
    };

    return (
        <div className={`bg-white min-h-screen flex flex-col shadow-[4px_0_20px_rgba(0,0,0,0.04)] transition-all duration-300 ${
            isCollapsed ? "w-24" : "w-[280px]"
        }`}>

            <div className={`flex items-center justify-between px-6 h-20 border-b ${
                isCollapsed ? "justify-center px-4" : ""
            }`}>
                {!isCollapsed && (
                    <h1 className="text-3xl font-bold text-indigo-600">
                        LinkNest
                    </h1>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <div className="flex-1 p-4">

                {menu.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl mb-2 cursor-pointer transition transform hover:scale-105
                        ${location.pathname === item.path
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "hover:bg-slate-100"
                            } ${item.path === "#" ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
                            ${isCollapsed ? "justify-center px-2" : ""}`}
                        title={isCollapsed ? item.label : ""}
                    >
                        {item.icon}
                        {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </Link>
                ))}

            </div>

            <div className={`border-t p-4 space-y-2 ${isCollapsed ? "px-2" : ""}`}>

                <Link
                    to="/profile"
                    onClick={() => handleNavClick("/profile")}
                    className={`flex items-center gap-4 px-4 py-3 hover:bg-slate-100 rounded-xl transition transform hover:scale-105
                    ${location.pathname === "/profile" ? "bg-indigo-100 text-indigo-600" : ""}
                    ${isCollapsed ? "justify-center px-2" : ""}`}
                    title={isCollapsed ? "Profile" : ""}
                >
                    <User size={20} />
                    {!isCollapsed && <span className="font-medium">Profile</span>}
                </Link>

                <Link
                    to="/settings"
                    onClick={() => handleNavClick("/settings")}
                    className={`flex items-center gap-4 px-4 py-3 hover:bg-slate-100 rounded-xl transition transform hover:scale-105
                    ${location.pathname === "/settings" ? "bg-indigo-100 text-indigo-600" : ""}
                    ${isCollapsed ? "justify-center px-2" : ""}`}
                    title={isCollapsed ? "Settings" : ""}
                >
                    <Settings size={20} />
                    {!isCollapsed && <span className="font-medium">Settings</span>}
                </Link>

                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition transform hover:scale-105
                    ${isCollapsed ? "justify-center px-2" : ""}`}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="font-medium">Logout</span>}
                </button>

            </div>

        </div>
    );
}

export default Sidebar;