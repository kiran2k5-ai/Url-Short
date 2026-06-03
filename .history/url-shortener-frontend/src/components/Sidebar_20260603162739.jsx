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

    const menu = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { icon: <Link2 size={20} />, label: "My Links" },
        { icon: <BarChart3 size={20} />, label: "Analytics" },
        { icon: <QrCode size={20} />, label: "QR Codes" },
        { icon: <Upload size={20} />, label: "Bulk Upload" },
        { icon: <Globe size={20} />, label: "Domains" },
        { icon: <Bell size={20} />, label: "Notifications" }
    ];

    return (
        <div className="w-[280px] bg-white min-h-screen flex flex-col shadow-[4px_0_20px_rgba(0,0,0,0.04)]">

            <div className="h-20 flex items-center px-6">

                <h1 className="text-3xl font-bold text-indigo-600">
                    LinkNest
                </h1>

            </div>

            <div className="flex-1 p-4">

                {menu.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl mb-2 cursor-pointer transition
                        ${index === 0
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-slate-100"
                            }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}

            </div>

            <div className="border-t p-4">

                <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-100 rounded-xl">
                    <User size={20} />
                    Profile
                </div>

                <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-100 rounded-xl">
                    <Settings size={20} />
                    Settings
                </div>

                <div className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl">
                    <LogOut size={20} />
                    Logout
                </div>

            </div>

        </div>
    );
}

export default Sidebar;