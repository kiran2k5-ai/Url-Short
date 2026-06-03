import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiBarChart2, FiGrid, FiLink2, FiLogOut, FiSettings, FiUpload, FiUser } from "react-icons/fi";

const navItems = [
	{ label: "Dashboard", to: "/dashboard", icon: FiGrid },
	{ label: "My Links", to: "/links", icon: FiLink2 },
	{ label: "Analytics", to: "/analytics", icon: FiBarChart2 },
	{ label: "Bulk Upload", to: "/bulk-upload", icon: FiUpload },
	{ label: "Profile", to: "/profile", icon: FiUser },
	{ label: "Settings", to: "/settings", icon: FiSettings }
];

function Sidebar({ open = false, onClose, onLogout, user }) {
	const content = (
		<div className="flex h-full flex-col bg-[#111827] text-white">
			<div className="border-b border-white/10 px-6 py-6">
				<div className="flex items-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B4BFF] to-[#7C6CFF] text-lg font-bold shadow-lg shadow-[#5B4BFF]/30">
						U
					</div>
					<div>
						<p className="text-lg font-semibold tracking-tight">URLCompany</p>
						<p className="text-sm text-slate-400">SaaS link intelligence</p>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto px-4 py-5 scrollbar-thin">
				<div className="mb-4 rounded-3xl bg-white/5 px-4 py-4 backdrop-blur">
					<p className="text-sm text-slate-400">Signed in as</p>
					<p className="mt-1 text-base font-semibold text-white">{user?.name || "Member"}</p>
					<p className="truncate text-sm text-slate-400">{user?.email}</p>
				</div>

				<nav className="space-y-1">
					{navItems.map((item) => {
						const Icon = item.icon;

						return (
							<NavLink
								key={item.to}
								to={item.to}
								end={item.to === "/dashboard"}
								onClick={onClose}
								className={({ isActive }) => [
									"flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
									isActive ? "bg-white/10 text-white shadow-lg shadow-black/10" : "text-slate-300 hover:bg-white/5 hover:text-white"
								].join(" ")}
							>
								<Icon size={18} />
								{item.label}
							</NavLink>
						);
					})}
				</nav>
			</div>

			<div className="border-t border-white/10 p-4">
				<button
					type="button"
					onClick={onLogout}
					className="flex w-full items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
				>
					<FiLogOut size={18} />
					Logout
				</button>
			</div>
		</div>
	);

	return (
		<>
			<aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200/60 bg-[#111827] text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] lg:block">
				{content}
			</aside>

			<AnimatePresence>
				{open ? (
					<motion.div
						className="fixed inset-0 z-[70] lg:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<button
							type="button"
							aria-label="Close sidebar"
							className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
							onClick={onClose}
						/>
						<motion.aside
							initial={{ x: -320 }}
							animate={{ x: 0 }}
							exit={{ x: -320 }}
							transition={{ type: "spring", stiffness: 260, damping: 28 }}
							className="relative z-[71] h-full w-80 max-w-[85vw] shadow-[0_24px_80px_rgba(15,23,42,0.25)]"
						>
							{content}
						</motion.aside>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
}

export default Sidebar;
