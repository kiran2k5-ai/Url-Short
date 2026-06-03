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
    LogOut
} from "lucide-react";

function Sidebar() {
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
        { path: "#", icon: <Globe size={20} />, label: "Domains" },
        { path: "#", icon: <Bell size={20} />, label: "Notifications" }
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
        <div className="w-[280px] bg-white min-h-screen flex flex-col shadow-[4px_0_20px_rgba(0,0,0,0.04)]">

            <div className="h-20 flex items-center px-6">

                <h1 className="text-3xl font-bold text-indigo-600">
                    LinkNest
                </h1>

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
                            } ${item.path === "#" ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}

            </div>

            <div className="border-t p-4 space-y-2">

                <Link
                    to="/profile"
                    onClick={() => handleNavClick("/profile")}
                    className={`flex items-center gap-4 px-4 py-3 hover:bg-slate-100 rounded-xl transition transform hover:scale-105
                    ${location.pathname === "/profile" ? "bg-indigo-100 text-indigo-600" : ""}`}
                >
                    <User size={20} />
                    <span className="font-medium">Profile</span>
                </Link>

                <Link
                    to="/settings"
                    onClick={() => handleNavClick("/settings")}
                    className={`flex items-center gap-4 px-4 py-3 hover:bg-slate-100 rounded-xl transition transform hover:scale-105
                    ${location.pathname === "/settings" ? "bg-indigo-100 text-indigo-600" : ""}`}
                >
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                </Link>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition transform hover:scale-105"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>

            </div>

        </div>
    );
}

export default Sidebar;