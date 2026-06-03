import { FiBell, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ user, theme, onToggleTheme, onMenuClick }) {
	const initials = (user?.name || user?.email || "U")
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55 lg:px-8">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onMenuClick}
						className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
					>
						<FiMenu size={18} />
					</button>
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5B4BFF]">Dashboard</p>
						<h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Link intelligence workspace</h1>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onToggleTheme}
						className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-[1.02] hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white overflow-hidden"
					>
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={theme}
								initial={{ y: -12, opacity: 0, rotate: -45 }}
								animate={{ y: 0, opacity: 1, rotate: 0 }}
								exit={{ y: 12, opacity: 0, rotate: 45 }}
								transition={{ duration: 0.15 }}
								className="flex items-center justify-center"
							>
								{theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
							</motion.div>
						</AnimatePresence>
					</button>

					<button
						type="button"
						className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-[1.02] hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
					>
						<FiBell size={18} />
						<span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#EF4444] ring-2 ring-white dark:ring-slate-950" />
					</button>

					<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/5">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#5B4BFF] to-[#7C6CFF] text-sm font-semibold text-white shadow-lg shadow-[#5B4BFF]/20">
							{initials}
						</div>
						<div className="hidden sm:block">
							<p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.name || "Member"}</p>
							<p className="max-w-[180px] truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
