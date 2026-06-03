import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
    return (
        <motion.nav
            initial={{
                opacity: 0,
                y: -40
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.6
            }}
            className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <motion.div
                    whileHover={{
                        scale: 1.05
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <motion.div
                        whileHover={{
                            rotate: 15
                        }}
                        transition={{
                            duration: 0.3
                        }}
                        className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg"
                    >
                        <Zap
                            size={20}
                            className="text-white"
                        />
                    </motion.div>

                    <h1 className="text-2xl font-bold">
                        LinkNest
                    </h1>
                </motion.div>

                <div className="hidden md:flex gap-10 text-gray-600">

                    {[
                        "Features",
                        "How it works",
                        "Pricing"
                    ].map((item, index) => (
                        <motion.a
                            key={index}
                            href={
                                item === "Features"
                                    ? "#features"
                                    : item === "Pricing"
                                    ? "#pricing"
                                    : "#how"
                            }
                            whileHover={{
                                y: -2
                            }}
                            className="relative font-medium"
                        >
                            {item}

                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 hover:w-full"></span>
                        </motion.a>
                    ))}

                </div>

                <div className="flex gap-4">

                    <motion.div
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                    >
                        <Link
                            to="/login"
                            className="font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition"
                        >
                            Sign in
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                    >
                        <Link
                            to="/signup"
                            className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-indigo-700 transition"
                        >
                            Get started
                        </Link>
                    </motion.div>

                </div>

            </div>
        </motion.nav>
    );
}

export default Navbar;