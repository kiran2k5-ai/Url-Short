import { useState } from "react";
import {
    Search,
    Bell,
    Settings,
    LogOut,
    Home,
    MoreVertical,
    ChevronDown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import toast from "react-hot-toast";

function Topbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        logout();
        setIsLoading(true);
        setTimeout(() => {
            navigate("/login");
            setIsLoading(false);
        }, 300);
        toast.success("Logged out successfully");
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

    return (
        <div className="h-20 bg-gradient-to-r from-white via-indigo-50 to-white px-8 flex items-center justify-between shadow-sm border-b border-gray-100">

            {/* Search Bar */}
            <div
                className="
                    hidden md:flex
                    w-96
                    h-12
                    bg-white
                    rounded-xl
                    flex
                    items-center
                    px-4
                    gap-3
                    shadow-[0_4px_16px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_8px_24px_rgba(99,102,241,0.1)]
                    focus-within:shadow-[0_8px_32px_rgba(99,102,241,0.15)]
                    focus-within:border-indigo-300
                    border border-gray-100
                    transition-all
                    duration-300
                "
            >
                <Search
                    size={18}
                    className="text-gray-400 flex-shrink-0"
                />

                <input
                    type="text"
                    placeholder="Search links, domains..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="
                        w-full
                        bg-transparent
                        outline-none
                        text-gray-700
                        placeholder:text-gray-400
                        text-sm
                    "
                />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 md:gap-6">

                {/* Notifications Button */}
                <button
                    className="
                        relative
                        w-10
                        h-10
                        rounded-xl
                        bg-white
                        shadow-sm
                        flex
                        items-center
                        justify-center
                        hover:bg-indigo-50
                        hover:text-indigo-600
                        transition-all
                        border border-gray-100
                    "
                    title="Notifications"
                >
                    <Bell size={18} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* Settings Button */}
                <button
                    onClick={() => navigate("/settings")}
                    className="
                        hidden md:flex
                        w-10
                        h-10
                        rounded-xl
                        bg-white
                        shadow-sm
                        flex
                        items-center
                        justify-center
                        hover:bg-indigo-50
                        hover:text-indigo-600
                        transition-all
                        border border-gray-100
                    "
                    title="Settings"
                >
                    <Settings size={18} />
                </button>

                {/* User Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="
                            flex items-center gap-3
                            px-3
                            py-2
                            rounded-xl
                            bg-white
                            shadow-sm
                            hover:bg-indigo-50
                            transition-all
                            border border-gray-100
                            group
                        "
                    >
                        <div
                            className="
                                w-8
                                h-8
                                rounded-full
                                bg-gradient-to-br from-indigo-400 to-indigo-600
                                flex
                                items-center
                                justify-center
                                font-semibold
                                text-white
                                text-sm
                            "
                        >
                        K
                    </div>

                    <div>
                        <p className="font-semibold text-gray-900">
                            KIRAN P
                        </p>

                        <p className="text-sm text-gray-500">
                            Free
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Topbar;