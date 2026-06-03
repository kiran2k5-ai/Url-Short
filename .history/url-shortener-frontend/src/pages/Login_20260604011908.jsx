import { useState } from "react";
import { Eye, EyeOff, Zap } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {

    const [showPassword, setShowPassword] =
        useState(false);

    return (

        <div className="min-h-screen flex bg-slate-50">

            {/* LEFT PANEL */}

            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-600">

                <div className="absolute w-80 h-80 rounded-full bg-white/10 top-20 left-24"></div>

                <div className="absolute w-36 h-36 rounded-full bg-white/10 left-72 bottom-72"></div>

                <div className="absolute w-52 h-52 rounded-full bg-white/10 right-24 bottom-20"></div>

                <div className="relative z-10 flex flex-col justify-between p-14 text-white w-full">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">

                            <Zap size={24} />

                        </div>

                        <h1 className="text-4xl font-bold">
                            LinkNest
                        </h1>

                    </div>

                    <div>

                        <h2 className="text-7xl font-bold leading-tight">

                            Your links.
                            <br />

                            Your data.
                            <br />

                            Your growth.

                        </h2>

                        <p className="mt-8 text-2xl text-white/80 max-w-xl">

                            Sign in and get back to building
                            the campaigns that move your numbers.

                        </p>

                    </div>

                    <p className="text-xl text-white/60">
                        © 2026 LinkNest
                    </p>

                </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="flex-1 flex items-center justify-center px-8">

                <div className="w-full max-w-xl">

                    <h1 className="text-6xl font-bold text-slate-900">

                        Welcome back

                    </h1>

                    <p className="mt-4 text-2xl text-slate-500">

                        Sign in to your account to continue

                    </p>

                    <form className="mt-14 space-y-8">

                        <div>

                            <label className="block text-lg font-semibold mb-3">

                                Email

                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full h-16 rounded-xl border border-slate-200 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <div>

                            <div className="flex justify-between mb-3">

                                <label className="text-lg font-semibold">

                                    Password

                                </label>

                                <a
                                    href="#"
                                    className="text-indigo-600"
                                >
                                    Forgot password?
                                </a>

                            </div>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    className="w-full h-16 rounded-xl border border-slate-200 px-5 pr-14 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                                >

                                    {
                                        showPassword
                                            ? <EyeOff size={22} />
                                            : <Eye size={22} />
                                    }

                                </button>

                            </div>

                        </div>

                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                className="w-6 h-6 accent-indigo-600"
                            />

                            <span className="text-lg">

                                Remember me for 30 days

                            </span>

                        </div>

                        <button
                            className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-semibold rounded-xl transition"
                        >

                            Sign in

                        </button>

                        <div className="bg-slate-100 rounded-xl p-5 text-slate-500">

                            Demo: demo@linknest.io /
                            password123

                        </div>

                    </form>

                    <p className="text-center mt-10 text-slate-500 text-lg">

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