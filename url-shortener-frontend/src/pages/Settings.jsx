import { useState, useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";
import {
    Moon,
    Sun,
    Bell,
    Shield,
    Mail,
    Lock,
    Check
} from "lucide-react";

function Settings() {
    const { setIsLoading } = useLoading();
    const [notifications, setNotifications] = useState(
        localStorage.getItem("notificationsEnabled") !== "false"
    );
    const [emailUpdates, setEmailUpdates] = useState(
        localStorage.getItem("emailUpdates") !== "false"
    );
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    const handleNotificationsChange = async () => {
        setSaveLoading(true);
        localStorage.setItem("notificationsEnabled", !notifications);
        setNotifications(!notifications);
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success(`Notifications ${!notifications ? "enabled" : "disabled"}`);
        setSaveLoading(false);
    };

    const handleEmailUpdatesChange = async () => {
        setSaveLoading(true);
        localStorage.setItem("emailUpdates", !emailUpdates);
        setEmailUpdates(!emailUpdates);
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success(`Email updates ${!emailUpdates ? "enabled" : "disabled"}`);
        setSaveLoading(false);
    };

    const handleChangePassword = () => {
        setSaveLoading(true);
        setTimeout(() => {
            toast.success("Check your email for password reset link");
            setSaveLoading(false);
        }, 500);
    };

    return (
        <DashboardLayout>

            <div className="p-6 md:p-8">

                <h1 className="text-3xl md:text-4xl font-bold">
                    Settings
                </h1>

                <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-3">
                    Customize your experience and preferences
                </p>

                <div className="mt-8 md:mt-10 bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-8">

                    {/* Notifications */}
                    <div className="flex items-center justify-between border-b pb-6 hover:bg-gray-50 p-4 rounded-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <Bell className="text-indigo-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Push Notifications
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Get notified about important events
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleNotificationsChange}
                            disabled={saveLoading}
                            className={`relative w-14 h-8 rounded-full transition flex items-center px-1 ${
                                notifications
                                    ? "bg-indigo-600"
                                    : "bg-gray-300"
                            } ${saveLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full transition-all ${notifications ? "translate-x-6" : ""}`}></div>
                        </button>
                    </div>

                    {/* Email Updates */}
                    <div className="flex items-center justify-between border-b pb-6 hover:bg-gray-50 p-4 rounded-lg transition">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Mail className="text-green-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Email Updates
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Receive weekly summary and tips
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleEmailUpdatesChange}
                            disabled={saveLoading}
                            className={`relative w-14 h-8 rounded-full transition flex items-center px-1 ${
                                emailUpdates
                                    ? "bg-green-600"
                                    : "bg-gray-300"
                            } ${saveLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full transition-all ${emailUpdates ? "translate-x-6" : ""}`}></div>
                        </button>
                    </div>

                    {/* Security */}
                    <div className="border-b pb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <Shield className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Security
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Manage your password and security settings
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4 ml-16">
                            <button
                                onClick={handleChangePassword}
                                disabled={saveLoading}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                            >
                                <Lock size={18} />
                                Change Password
                            </button>
                            <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition">
                                <Check size={18} />
                                Enable 2FA
                            </button>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="pt-6">
                        <h3 className="font-semibold text-lg mb-4">
                            Account Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 mb-1">Plan Type</p>
                                <p className="font-semibold text-gray-900">Free Plan</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 mb-1">API Keys</p>
                                <p className="font-semibold text-indigo-600 cursor-pointer hover:underline">Manage API Keys</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 mb-1">Last Login</p>
                                <p className="font-semibold text-gray-900">Today</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 mb-1">Account Created</p>
                                <p className="font-semibold text-gray-900">3 days ago</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Settings;