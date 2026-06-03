import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Zap,
    CheckCircle,
    Eye,
    EyeOff
} from "lucide-react";

function Signup() {

    const [showPassword, setShowPassword] =
        useState(false);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen flex">

            {/* LEFT SIDE */}

            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white">

                <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/10"></div>

                <div className="absolute bottom-16 right-24 w-56 h-56 rounded-full bg-white/10"></div>

                <div className="absolute bottom-64 left-72 w-32 h-32 rounded-full bg-white/10"></div>

                <div className="relative z-10 flex flex-col justify-between p-14 w-full">

                    <div>

                        <div className="flex items-center gap-3 mb-20">

                            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                                <Zap size={22} />
                            </div>

                            <h1 className="text-4xl font-bold">
                                LinkNest
                            </h1>

                        </div>

                        <div className="space-y-12 mt-24">

                            <div className="flex gap-4">

                                <CheckCircle
                                    size={28}
                                    className="mt-1"
                                />

                                <div>

                                    <h3 className="text-2xl font-semibold">
                                        Free forever plan
                                    </h3>

                                    <p className="text-white/70 text-lg">
                                        500 links/month with full analytics,
                                        no credit card needed.
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-4">

                                <CheckCircle
                                    size={28}
                                    className="mt-1"
                                />

                                <div>

                                    <h3 className="text-2xl font-semibold">
                                        Up and running in seconds
                                    </h3>

                                    <p className="text-white/70 text-lg">
                                        Create your first short link within
                                        60 seconds.
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-4">

                                <CheckCircle
                                    size={28}
                                    className="mt-1"
                                />

                                <div>

                                    <h3 className="text-2xl font-semibold">
                                        Enterprise-grade security
                                    </h3>

                                    <p className="text-white/70 text-lg">
                                        JWT auth, rate limiting and HTTPS
                                        protection.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <p className="text-white/60 text-lg">
                        © 2026 LinkNest
                    </p>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8">

                <div className="w-full max-w-lg">

                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Create your account
                    </h1>

                    <p className="text-gray-500 text-xl mb-12">
                        Start shortening links in 30 seconds —
                        free, no card required
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Full name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Jane Smith"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-14 px-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="jane@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-14 px-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold mb-2">
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
                                    className="w-full h-14 px-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition"
                        >
                            Create free account
                        </button>

                    </form>

                    <p className="text-center mt-10 text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="text-indigo-600 font-semibold"
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