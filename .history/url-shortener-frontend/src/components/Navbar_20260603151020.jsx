import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                        <Zap size={20} className="text-white" />
                    </div>

                    <h1 className="text-2xl font-bold">
                        LinkNest
                    </h1>
                </div>

                <div className="hidden md:flex gap-10 text-gray-600">
                    <a href="#features">Features</a>
                    <a href="#how">How it works</a>
                    <a href="#pricing">Pricing</a>
                </div>

                <div className="flex gap-4">
                    <Link
                        to="/login"
                        className="font-medium"
                    >
                        Sign in
                    </Link>

                    <Link
                        to="/signup"
                        className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
                    >
                        Get started
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;