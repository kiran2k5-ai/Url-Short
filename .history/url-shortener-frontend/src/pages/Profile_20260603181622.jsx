import DashboardLayout from "../layouts/DashboardLayout";
import {
    User,
    Mail,
    Shield,
    LogOut
} from "lucide-react";

function Profile() {

    const user = {
        name: "Kiran P",
        email: "kiran@gmail.com",
        role: "Free Plan"
    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";
    };

    return (
        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-5xl font-bold">
                    Profile
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your account information
                </p>

                <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

                    <div className="flex items-center gap-6">

                        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-4xl">
                            K
                        </div>

                        <div>

                            <h2 className="text-3xl font-bold">
                                {user.name}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                {user.role}
                            </p>

                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-10">

                        <div className="border rounded-2xl p-6">

                            <div className="flex items-center gap-3">

                                <User
                                    size={22}
                                    className="text-indigo-600"
                                />

                                <h3 className="font-semibold">
                                    Full Name
                                </h3>

                            </div>

                            <p className="mt-4 text-lg">
                                {user.name}
                            </p>

                        </div>

                        <div className="border rounded-2xl p-6">

                            <div className="flex items-center gap-3">

                                <Mail
                                    size={22}
                                    className="text-indigo-600"
                                />

                                <h3 className="font-semibold">
                                    Email Address
                                </h3>

                            </div>

                            <p className="mt-4 text-lg">
                                {user.email}
                            </p>

                        </div>

                        <div className="border rounded-2xl p-6">

                            <div className="flex items-center gap-3">

                                <Shield
                                    size={22}
                                    className="text-indigo-600"
                                />

                                <h3 className="font-semibold">
                                    Account Type
                                </h3>

                            </div>

                            <p className="mt-4 text-lg">
                                Free Plan
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Profile;