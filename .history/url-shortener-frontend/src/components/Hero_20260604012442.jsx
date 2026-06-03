import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
    return (
        <section className="py-24 bg-white">

            <div className="max-w-5xl mx-auto px-6 text-center">

                <div className="inline-flex px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
                    ✓ Trusted by 50,000+ marketers
                </div>

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 40
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8
                    }}
                    className="text-6xl md:text-7xl font-extrabold mt-8 leading-tight"
                >
                    Short links that
                    <br />
                    <span className="text-[#5B4BFF]">
                        drive results
                    </span>
                </motion.h1>

                <p className="max-w-3xl mx-auto mt-8 text-xl text-gray-600">
                    LinkNest turns your long URLs into powerful marketing tools — with analytics, QR codes, custom domains, and bulk management built right in.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">

                    <Link
                        to="/signup"
                        className="bg-[#5B4BFF] text-white px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-[#4A3ACC] transition"
                    >
                        Start for free
                        <ArrowRight size={18} />
                    </Link>

                    <Link
                        to="/login"
                        className="border px-8 py-4 rounded-xl"
                    >
                        Sign in to dashboard
                    </Link>

                </div>

                    <div className="flex justify-center gap-8 mt-8 text-gray-500">

                    <span className="flex items-center gap-2">
                        <CheckCircle size={18} />
                        No credit card
                    </span>

                    <span className="flex items-center gap-2">
                        <CheckCircle size={18} />
                        Free forever
                    </span>

                    <span className="flex items-center gap-2">
                        <CheckCircle size={18} />
                        Setup in 30 sec
                    </span>

                </div>

            </div>

        </section>
    );
}

export default Hero;