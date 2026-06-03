import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authApi";
import toast from "react-hot-toast";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

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

            const data =
                await loginUser(formData);

            login(data.token);

            toast.success(
                "Login Successful"
            );

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex bg-white">

            {/* Left Side */}

            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 relative overflow-hidden">

                <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -left-20"></div>

                <div className="absolute w-80 h-80 bg-white/10 rounded-full bottom-0 right-0"></div>

                <div className="relative z-10 flex flex-col justify-between p-12 text-white">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">

                                <Zap size={24} />

                            </div>

                            <h1 className="text-3xl font-bold">
                                LinkNest
                            </h1>

                        </div>

                    </div>

                    <div>

                        <h2 className="text-6xl font-bold leading-tight">

                            Short links
                            <br />
                            that drive
                            <br />
                            results.

                        </h2>

                        <p className="mt-8 text-xl text-white/80 max-w-lg">

                            Create, manage, analyze and
                            optimize every link from a
                            single powerful platform.

                        </p>

                    </div>

                    <p className="text-white/60">

                        © 2026 LinkNest

                    </p>

                </div>

            </div>

            {/* Right Side */}

            <div className="w-full lg:w-1/2 flex items-center justify-center px-8">

                <div className="w-full max-w-md">

                    <h1 className="text-4xl font-bold text-gray-900">

                        Welcome Back

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Sign in to your account

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 space-y-6"
                    >

                        <div>

                            <label className="block text-sm font-medium mb-2">

                                Email Address

                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">

                                Password

                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full h-14 px-4 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all"
                        >

                            {
                                loading
                                    ? "Signing In..."
                                    : "Sign In"
                            }

                        </button>

                    </form>

                    <p className="mt-8 text-center text-gray-500">

                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="text-indigo-600 font-semibold"
                        >

                            Create Account

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
}

export default Login;