import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    Moon,
    Sun,
    Bell,
    Shield
} from "lucide-react";

function Settings() {

    const [darkMode, setDarkMode] =
        useState(
            localStorage.getItem("theme") === "dark"
        );

    useEffect(() => {

        if (darkMode) {

            document.documentElement.classList.add(
                "dark"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            document.documentElement.classList.remove(
                "dark"
            );

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }, [darkMode]);

    return (
        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-5xl font-bold">
                    Settings
                </h1>

                <p className="text-gray-500 mt-2">
                    Customize your experience
                </p>

                <div className="mt-10 bg-white rounded-3xl shadow-lg p-8 space-y-8">

                    <div className="flex items-center justify-between border-b pb-6">

                        <div className="flex items-center gap-4">

                            {darkMode ? (
                                <Moon
                                    className="text-indigo-600"
                                />
                            ) : (
                                <Sun
                                    className="text-yellow-500"
                                />
                            )}

                            <div>

                                <h3 className="font-semibold text-lg">
                                    Dark Mode
                                </h3>

                                <p className="text-gray-500">
                                    Toggle application theme
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={() =>
                                setDarkMode(
                                    !darkMode
                                )
                            }
                            className={`w-16 h-8 rounded-full transition flex items-center px-1 ${
                                darkMode
                                    ? "bg-indigo-600 justify-end"
                                    : "bg-gray-300 justify-start"
                            }`}
                        >
                            <div className="w-6 h-6 bg-white rounded-full"></div>
                        </button>

                    </div>

                    <div className="flex items-center justify-between border-b pb-6">

                        <div className="flex items-center gap-4">

                            <Bell
                                className="text-indigo-600"
                            />

                            <div>

                                <h3 className="font-semibold text-lg">
                                    Notifications
                                </h3>

                                <p className="text-gray-500">
                                    Receive email updates
                                </p>

                            </div>

                        </div>

                        <input
                            type="checkbox"
                            className="w-5 h-5"
                        />

                    </div>

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                            <Shield
                                className="text-indigo-600"
                            />

                            <div>

                                <h3 className="font-semibold text-lg">
                                    Security
                                </h3>

                                <p className="text-gray-500">
                                    Two-factor authentication
                                </p>

                            </div>

                        </div>

                        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl">
                            Configure
                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Settings;