import { useState } from "react";
import { Bell, Trash2, Filter } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, type: "success", title: "URL Created Successfully", message: "Your shortened URL 'google-short' has been created.", timestamp: "2 hours ago", read: false },
        { id: 2, type: "milestone", title: "Milestone Reached!", message: "Your URL 'reactbits' has reached 100 clicks!", timestamp: "5 hours ago", read: false },
        { id: 3, type: "warning", title: "URL Expiring Soon", message: "Your URL 'project-link' will expire in 3 days.", timestamp: "1 day ago", read: true },
        { id: 4, type: "info", title: "New Feature Available", message: "Custom domains are now available for your account!", timestamp: "3 days ago", read: true },
    ]);
    const [filter, setFilter] = useState("all");

    const filteredNotifications = filter === "all" 
        ? notifications 
        : filter === "unread" 
        ? notifications.filter(n => !n.read)
        : notifications.filter(n => n.type === filter);

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
        toast.success("Notification deleted");
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <DashboardLayout>
            <div className="p-6 md:p-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center h-6 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 mt-2">
                        Stay updated on your links and account activity
                    </p>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { value: "all", label: "All" },
                        { value: "unread", label: `Unread (${unreadCount})` },
                        { value: "success", label: "✓ Success" },
                        { value: "warning", label: "⚠ Warning" },
                        { value: "info", label: "ℹ Info" },
                    ].map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setFilter(value)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition whitespace-nowrap ${
                                filter === value
                                    ? "bg-indigo-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <Filter className="inline mr-1" size={14} />
                            {label}
                        </button>
                    ))}
                </div>

                {filteredNotifications.length === 0 ? (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 text-center border-2 border-indigo-200">
                        <Bell className="mx-auto mb-4 text-indigo-600" size={48} />
                        <p className="text-lg font-semibold text-gray-900">
                            {filter === "unread" ? "All Caught Up!" : "No Notifications"}
                        </p>
                        <p className="text-gray-600 mt-2">
                            {filter === "unread" 
                                ? "You have read all your notifications."
                                : "You don't have any notifications yet."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-600 hover:shadow-xl transition"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">{notification.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                                    </div>
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition flex-shrink-0"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 bg-indigo-50 border border-indigo-300 rounded-2xl p-6">
                    <h3 className="font-bold text-indigo-900 mb-3">🔔 Notification Preferences</h3>
                    <p className="text-sm text-indigo-800 mb-4">
                        Manage notification preferences in your Settings page.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Notifications;