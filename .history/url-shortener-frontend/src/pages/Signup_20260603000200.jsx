import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/auth/signup", formData);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Signup Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#111827]">
                        LinkNest
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4BFF]"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4BFF]"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B4BFF]"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#5B4BFF] to-[#7C6CFF] hover:opacity-90 transition"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-[#5B4BFF] font-semibold"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;