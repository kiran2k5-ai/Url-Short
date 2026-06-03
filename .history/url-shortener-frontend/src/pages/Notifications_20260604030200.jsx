import { useState } from "react";
import { Bell, Trash2, Check, Clock, AlertCircle, CheckCircle } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";

function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "success",
            title: "Short URL Created",
            message: "Your URL https://github.com has been shortened to ecA0fB",
            time: "2 hours ago",
            read: false,
        },
        {
            id: 2,
            type: "info",
            title: "New Click on Your Link",
            message: "Your link short.example.com/abc123 received 50 clicks today",
            time: "4 hours ago",
            read: false,
        },
        {
            id: 3,
            type: "warning",
            title: "Domain Expiring Soon",
            message: "Your domain custom.example.com is pending verification. Verify it now.",
            time: "1 day ago",
            read: true,
        },
        {
            id: 4,
            type: "success",
            title: "Bulk Upload Complete",
            message: "Your bulk upload of 10 URLs was successful",
            time: "2 days ago",
            read: true,
        },
        {
            id: 5,
            type: "info",
            title: "Link Milestone",
            message: "Congratulations! One of your links reached 1,000 clicks",
            time: "3 days ago",
            read: true,
        },
    ]);

    const handleMarkAsRead = (id) => {
        setNotifications(
            notifications.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
        toast.success("Marked as read");
    };

    const handleDeleteNotification = (id) => {
        setNotifications(notifications.filter((n) => n.id !== id));
        toast.success("Notification deleted");
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
        toast.success("All marked as read");
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    const getIcon = (type) => {
        switch (type) {
            case "success":
                return <CheckCircle className="text-green-600" size={24} />;
            case "warning":
                return <AlertCircle className="text-orange-600" size={24} />;
            default:
                return <Bell className="text-blue-600" size={24} />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "success":
                return "bg-green-50 border-green-200";
            case "warning":
                return "bg-orange-50 border-orange-200";
            default:
                return "bg-blue-50 border-blue-200";
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                                Notifications
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "All caught up!"}
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200 transition font-medium"
                            >
                                <Check size={18} />
                                Mark All as Read
                            </button>
                        )}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-600 text-lg">No notifications</p>
                        </div>
                    ) : (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`
                                    rounded-xl p-6 border transition-all
                                    ${notif.read ? "bg-white border-gray-100" : getTypeColor(notif.type)}
                                    hover:shadow-md
                                `}
                            >
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 pt-1">
                                        {getIcon(notif.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-lg">
                                                    {notif.title}
                                                </h3>
                                                <p className="text-gray-600 mt-1 text-sm">
                                                    {notif.message}
                                                </p>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <Clock size={14} className="text-gray-400" />
                                                    <p className="text-xs text-gray-500">{notif.time}</p>
                                                    {!notif.read && (
                                                        <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-shrink-0">
                                        {!notif.read && (
                                            <button
                                                onClick={() => handleMarkAsRead(notif.id)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                                                title="Mark as read"
                                            >
                                                <Check size={18} className="text-gray-400 hover:text-gray-600" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteNotification(notif.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition"
                                            title="Delete notification"
                                        >
                                            <Trash2 size={18} className="text-gray-400 hover:text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Statistics */}
                {notifications.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 text-sm font-medium">Total Notifications</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{notifications.length}</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 text-sm font-medium">Unread</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">{unreadCount}</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-600 text-sm font-medium">Read</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {notifications.length - unreadCount}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Notifications;
