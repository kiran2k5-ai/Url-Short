import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Zap,
    Eye,
    EyeOff
} from "lucide-react";
import api from "../services/api";
import { loginUser }
from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            email: "",
            password: ""
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/auth/login",
                    formData
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex bg-white">

            {/* LEFT SIDE */}

            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white">

                <div className="absolute top-20 left-24 w-72 h-72 rounded-full bg-white/10"></div>

                <div className="absolute bottom-20 right-24 w-56 h-56 rounded-full bg-white/10"></div>

                <div className="absolute bottom-64 left-72 w-36 h-36 rounded-full bg-white/10"></div>

                <div className="relative z-10 flex flex-col justify-between p-14 w-full">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                                <Zap size={22} />
                            </div>

                            <h1 className="text-3xl font-bold">
                                LinkNest
                            </h1>

                        </div>

                        <div className="mt-52">

                            <h2 className="text-6xl font-bold leading-tight">
                                Your links.
                                <br />
                                Your data.
                                <br />
                                Your growth.
                            </h2>

                            <p className="mt-8 text-2xl text-white/75 max-w-xl">
                                Sign in and get back
                                to building the
                                campaigns that move
                                your numbers.
                            </p>

                        </div>

                    </div>

                    <p className="text-white/60 text-sm">
                        © 2026 LinkNest
                    </p>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="w-full lg:w-1/2 flex items-center justify-center px-8">

                <div className="w-full max-w-lg">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome back
                    </h1>

                    <p className="mt-3 text-lg text-gray-500">
                        Sign in to your account
                        to continue
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-12 space-y-6"
                    >

                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-800">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={
                                    handleChange
                                }
                                required
                                className="w-full h-14 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <div>

                            <div className="flex justify-between mb-2">

                                <label className="text-sm font-semibold text-gray-800">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-indigo-600 text-sm font-medium"
                                >
                                    Forgot password?
                                </button>

                            </div>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter password"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full h-14 px-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {
                                        showPassword
                                            ? <EyeOff size={20} />
                                            : <Eye size={20} />
                                    }
                                </button>

                            </div>

                        </div>

                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                id="remember"
                                className="w-5 h-5 accent-indigo-600"
                            />

                            <label
                                htmlFor="remember"
                                className="text-gray-700"
                            >
                                Remember me for
                                30 days
                            </label>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                        >
                            {
                                loading
                                    ? "Signing In..."
                                    : "Sign In"
                            }
                        </button>

                        <div className="bg-gray-100 rounded-xl p-4 text-gray-600 text-sm">
                            Demo:
                            demo@linknest.io /
                            password123
                        </div>

                    </form>

                    <p className="mt-10 text-center text-gray-500">

                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="text-indigo-600 font-semibold"
                        >
                            Sign up free
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;