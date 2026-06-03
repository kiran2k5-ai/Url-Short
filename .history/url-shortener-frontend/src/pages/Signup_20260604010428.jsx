import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!formData.name.trim()) {
            nextErrors.name = "Name is required.";
        }

        if (!formData.email.trim()) {
            nextErrors.email = "Email is required.";
        }

        if (!formData.password.trim() || formData.password.length < 6) {
            nextErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);
            await signup(formData);
            toast.success("Account created. You can sign in now.");
            navigate("/login", { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
            <div className="hidden overflow-hidden p-6 lg:block">
                <div className="relative flex h-full min-h-[calc(100vh-3rem)] items-end overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_38%),linear-gradient(135deg,#111827,#0F172A_52%,#7C6CFF)] p-10 text-white shadow-[0_30px_120px_rgba(15,23,42,0.3)]">
                    <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.14),transparent_35%,rgba(255,255,255,0.08)_65%,transparent)]" />
                    <div className="relative max-w-xl space-y-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/60">Create access</p>
                        <h2 className="display-font text-5xl font-semibold tracking-tight text-balance">Join the dashboard built for standout demos.</h2>
                        <p className="text-lg leading-8 text-white/75">
                            The frontend is designed to make backend capabilities feel like a premium SaaS product: analytics, QR creation, bulk uploads, and polished workflows.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
                <div className="w-full max-w-md">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B4BFF] to-[#7C6CFF] text-lg font-semibold text-white shadow-lg shadow-[#5B4BFF]/20">
                            U
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white">URLCompany</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Create your account</p>
                        </div>
                    </div>

                    <div className="rounded-[34px] border border-white/70 bg-white/85 p-8 shadow-[0_24px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
                        <div className="mb-8 space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5B4BFF]">Signup</p>
                            <h1 className="display-font text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">Create a new workspace account</h1>
                            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Sign up to create branded links, manage analytics, and run bulk uploads in one production-ready interface.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
                                <div className="relative">
                                    <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-3 text-slate-900 outline-none transition focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>
                                {errors.name ? <p className="mt-2 text-sm text-rose-500">{errors.name}</p> : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                                <div className="relative">
                                    <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@company.com"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-3 text-slate-900 outline-none transition focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>
                                {errors.email ? <p className="mt-2 text-sm text-rose-500">{errors.email}</p> : null}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                                <div className="relative">
                                    <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="At least 6 characters"
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-3 text-slate-900 outline-none transition focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>
                                {errors.password ? <p className="mt-2 text-sm text-rose-500">{errors.password}</p> : null}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5B4BFF] to-[#7C6CFF] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(91,75,255,0.25)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Creating account..." : "Create account"}
                                <FiArrowRight />
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                            Already have an account? <Link to="/login" className="font-semibold text-[#5B4BFF]">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;