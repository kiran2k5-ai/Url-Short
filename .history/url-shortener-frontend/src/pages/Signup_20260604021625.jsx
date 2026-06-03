import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Zap,
    CheckCircle,
    Eye,
    EyeOff
} from "lucide-react";
import api from "../services/api";
import { signupUser }
from "../services/authService";
import { useLoading } from "../context/LoadingContext";
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill in all fields");
            toast.error("Please fill in all fields");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            await signupUser(formData);

            toast.success("Account created successfully!");
            
            setIsLoading(true);
            setTimeout(() => {
                navigate("/login");
                setIsLoading(false);
            }, 300);

        } catch (error) {

            const errorMessage = error.response?.data?.message || error.message || "Signup Failed";
            setError(errorMessage);
            toast.error(errorMessage);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex bg-white">

            {/* LEFT PANEL */}

            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white">

                <div className="absolute top-20 left-24 w-72 h-72 rounded-full bg-white/10"></div>

                <div className="absolute bottom-20 right-24 w-56 h-56 rounded-full bg-white/10"></div>

                <div className="absolute bottom-60 left-72 w-32 h-32 rounded-full bg-white/10"></div>

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

                        <div className="mt-32 space-y-12">

                            <div className="flex gap-4">

                                <CheckCircle
                                    size={26}
                                    className="mt-1"
                                />

                                <div>

                                    <h3 className="text-xl font-semibold">
                                        Free forever plan
                                    </h3>

                                    <p className="text-white/70 text-base mt-1">
                                        500 links/month with full analytics,
                                        no credit card required.
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-4">

                                <CheckCircle
                                    size={26}
                                    className="mt-1"
                                />

                                <div>

                                    <h3 className="text-xl font-semibold">
                                        Up and running in seconds
                                    </h3>

                                    <p className="text-white/70 text-base mt-1">
                                        Create your first short URL within
                                        60 seconds of signing up.
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-4">

                                <CheckCircle
                                    size={26}
                                    className="mt-1"
                                />

                                <div>

                                    <h3 className="text-xl font-semibold">
                                        Enterprise-grade security
                                    </h3>

                                    <p className="text-white/70 text-base mt-1">
                                        JWT authentication, rate limiting,
                                        and HTTPS by default.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <p className="text-white/60 text-sm">
                        © 2026 LinkNest
                    </p>

                </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="w-full lg:w-1/2 flex items-center justify-center px-8">

                <div className="w-full max-w-lg">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Create your account
                    </h1>

                    <p className="mt-3 text-lg text-gray-500">
                        Start shortening links in 30 seconds —
                        free, no card required
                    </p>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 space-y-6"
                    >

                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-800">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Jane Smith"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full h-14 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-800">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="jane@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full h-14 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-800">
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
                                    placeholder="Min. 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
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
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-200"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Free Account"}
                        </button>

                    </form>

                    <p className="mt-8 text-center text-gray-500">

                        Already have an account?{" "}

                        <Link
                            to="/"
                            className="text-indigo-600 font-semibold hover:text-indigo-700"
                        >
                            Sign in
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Signup;