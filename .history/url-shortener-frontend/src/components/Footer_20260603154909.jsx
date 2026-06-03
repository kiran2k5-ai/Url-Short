import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { motion } from "framer-motion";

function Footer() {

    return (
        <footer className="bg-slate-900 text-white relative overflow-hidden">

            <div className="absolute top-0 left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                viewport={{
                    once: true
                }}
                transition={{
                    duration: 0.7
                }}
                className="max-w-7xl mx-auto px-6 py-20 relative z-10"
            >

                <div className="grid md:grid-cols-4 gap-12">

                    {/* Brand */}

                    <div>

                        <h2 className="text-3xl font-bold">
                            LinkNest
                        </h2>

                        <p className="mt-4 text-gray-400 leading-relaxed">
                            Modern URL shortening platform with
                            analytics, QR codes, custom aliases,
                            and bulk management.
                        </p>

                    </div>

                    {/* Product */}

                    <div>

                        <h3 className="font-semibold text-lg mb-4">
                            Product
                        </h3>

                        <ul className="space-y-3 text-gray-400">

                            <li className="hover:text-white transition cursor-pointer">
                                Features
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                Analytics
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                QR Codes
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                Bulk Upload
                            </li>

                        </ul>

                    </div>

                    {/* Company */}

                    <div>

                        <h3 className="font-semibold text-lg mb-4">
                            Company
                        </h3>

                        <ul className="space-y-3 text-gray-400">

                            <li className="hover:text-white transition cursor-pointer">
                                About
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                Careers
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                Contact
                            </li>

                            <li className="hover:text-white transition cursor-pointer">
                                Blog
                            </li>

                        </ul>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="font-semibold text-lg mb-4">
                            Connect
                        </h3>

                        <div className="flex gap-4">

                            <motion.a
                                whileHover={{
                                    y: -4,
                                    scale: 1.1
                                }}
                                href="#"
                                className="p-3 rounded-xl bg-slate-800"
                            >
                                <FaGithub size={20} />
                            </motion.a>

                            <motion.a
                                whileHover={{
                                    y: -4,
                                    scale: 1.1
                                }}
                                href="#"
                                className="p-3 rounded-xl bg-slate-800"
                            >
                                <Linkedin size={20} />
                            </motion.a>

                            <motion.a
                                whileHover={{
                                    y: -4,
                                    scale: 1.1
                                }}
                                href="#"
                                className="p-3 rounded-xl bg-slate-800"
                            >
                                <Mail size={20} />
                            </motion.a>

                        </div>

                    </div>

                </div>

                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

                    <p className="text-gray-500">
                        © 2026 LinkNest. All rights reserved.
                    </p>

                    <div className="flex gap-6 mt-4 md:mt-0 text-gray-500">

                        <span className="hover:text-white cursor-pointer transition">
                            Privacy
                        </span>

                        <span className="hover:text-white cursor-pointer transition">
                            Terms
                        </span>

                        <span className="hover:text-white cursor-pointer transition">
                            Security
                        </span>

                    </div>

                </div>

            </motion.div>

        </footer>
    );
}

export default Footer;