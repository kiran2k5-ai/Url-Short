import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LandingNavbar() {
	const [isOpen, setIsOpen] = useState(false);

	const navLinks = [
		{ name: "Features", href: "#features" },
		{ name: "Pricing", href: "#pricing" },
		{ name: "How It Works", href: "#how-it-works" },
	];

	return (
		<header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl transition-all duration-300">
			<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2 group">
						<div className="w-10 h-10 bg-gradient-to-br from-[#5B4BFF] to-[#7C6CFF] rounded-xl flex items-center justify-center shadow-lg shadow-[#5B4BFF]/20 group-hover:scale-105 transition">
							<Zap className="w-6 h-6 text-white" />
						</div>
						<div>
							<p className="text-lg font-bold text-slate-900">LinkNest</p>
							<p className="text-xs text-slate-500 -mt-1">Smart URL Shortener</p>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors duration-200"
							>
								{link.name}
							</a>
						))}
					</nav>

					{/* Auth Buttons */}
					<div className="hidden md:flex items-center gap-3">
						<Link
							to="/login"
							className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 rounded-lg transition-colors duration-200"
						>
							Sign In
						</Link>
						<Link
							to="/signup"
							className="bg-gradient-to-r from-[#5B4BFF] to-[#7C6CFF] text-white font-medium text-sm px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#5B4BFF]/30 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
						>
							Get Started
							<ArrowRight size={16} />
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className="md:hidden border-t border-slate-200/50 mt-4 pt-4"
						>
							<nav className="flex flex-col gap-3 mb-4">
								{navLinks.map((link) => (
									<a
										key={link.name}
										href={link.href}
										onClick={() => setIsOpen(false)}
										className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
									>
										{link.name}
									</a>
								))}
							</nav>
							<div className="flex flex-col gap-3 border-t border-slate-200/50 pt-4">
								<Link
									to="/login"
									onClick={() => setIsOpen(false)}
									className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 rounded-lg hover:bg-slate-50 text-center transition-colors duration-200"
								>
									Sign In
								</Link>
								<Link
									to="/signup"
									onClick={() => setIsOpen(false)}
									className="bg-gradient-to-r from-[#5B4BFF] to-[#7C6CFF] text-white font-medium text-sm px-6 py-2.5 rounded-xl text-center transition-all duration-300"
								>
									Get Started
								</Link>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
}

export default LandingNavbar;
