import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    User,
    Mail,
    Shield,
    LogOut,
    Edit
} from "lucide-react";

function Profile() {
    const { setIsLoading } = useLoading();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const user = {
        name: "Kiran P",
        email: "kiran@gmail.com",
        role: "Free Plan",
        joinDate: "June 1, 2026"
    };

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    const handleLogout = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        logout();
        navigate("/login");
        toast.success("Logged out successfully");
    };

    const handleEditProfile = () => {
        toast.info("Edit profile feature coming soon!");
    };

    return (
        <DashboardLayout>

            <div className="p-6 md:p-8">

                <h1 className="text-3xl md:text-4xl font-bold">
                    Profile
                </h1>

                <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-3">
                    Manage your account information
                </p>

                <div className="mt-8 md:mt-10 bg-white rounded-3xl shadow-lg p-6 md:p-8">

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">

                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-4xl md:text-5xl shadow-lg">
                            {user.name.charAt(0)}
                        </div>

                        <div className="flex-1 text-center md:text-left">

                            <h2 className="text-2xl md:text-3xl font-bold">
                                {user.name}
                            </h2>

                            <p className="text-gray-500 mt-1 md:mt-2">
                                {user.role}
                            </p>

                            <button
                                onClick={handleEditProfile}
                                className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition mx-auto md:mx-0"
                            >
                                <Edit size={18} />
                                Edit Profile
                            </button>

                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10">

                        <div className="border rounded-2xl p-6 hover:shadow-md transition">

                            <div className="flex items-center gap-3 mb-4">

                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <User
                                        size={20}
                                        className="text-blue-600"
                                    />
                                </div>

                                <h3 className="font-semibold">
                                    Full Name
                                </h3>

                            </div>

                            <p className="text-lg text-gray-800">
                                {user.name}
                            </p>

                        </div>

                        <div className="border rounded-2xl p-6 hover:shadow-md transition">

                            <div className="flex items-center gap-3 mb-4">

                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Mail
                                        size={20}
                                        className="text-green-600"
                                    />
                                </div>

                                <h3 className="font-semibold">
                                    Email Address
                                </h3>

                            </div>

                            <p className="text-lg text-gray-800">
                                {user.email}
                            </p>

                        </div>

                        <div className="border rounded-2xl p-6 hover:shadow-md transition">

                            <div className="flex items-center gap-3 mb-4">

                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Shield
                                        size={20}
                                        className="text-purple-600"
                                    />
                                </div>

                                <h3 className="font-semibold">
                                    Account Type
                                </h3>

                            </div>

                            <p className="text-lg text-gray-800">
                                {user.role}
                            </p>

                        </div>

                        <div className="border rounded-2xl p-6 hover:shadow-md transition">

                            <div className="flex items-center gap-3 mb-4">

                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <User
                                        size={20}
                                        className="text-orange-600"
                                    />
                                </div>

                                <h3 className="font-semibold">
                                    Member Since
                                </h3>

                            </div>

                            <p className="text-lg text-gray-800">
                                {user.joinDate}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-8 md:mt-10 w-full md:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition justify-center md:justify-start"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Profile;