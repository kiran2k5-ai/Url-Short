import { motion } from "framer-motion";

function Loader({ message = "Restoring secure session..." }) {
	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#08111f]">
			<div className="relative flex items-center justify-center">
				{/* Outer Ring */}
				<motion.div
					className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-[#5B4BFF] dark:border-white/10 dark:border-t-[#7C6CFF]"
					animate={{ rotate: 360 }}
					transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
				/>
				{/* Brand Icon Letter */}
				<div className="absolute text-[#5B4BFF] dark:text-[#7C6CFF] font-bold text-lg display-font">
					U
				</div>
			</div>
			<p className="mt-4 text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-300">
				{message}
			</p>
		</div>
	);
}

export default Loader;