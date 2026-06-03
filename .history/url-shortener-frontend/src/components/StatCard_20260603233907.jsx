function StatCard({ title, value, icon: Icon, tone = "primary", subtitle }) {
	const tones = {
		primary: "from-[#5B4BFF] to-[#7C6CFF]",
		success: "from-emerald-500 to-teal-500",
		danger: "from-rose-500 to-red-500",
		warning: "from-amber-500 to-orange-500"
	};

	return (
		<div className="rounded-[28px] border border-white/60 bg-white/85 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
					<h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</h3>
					{subtitle ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
				</div>

				<div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone]} text-white shadow-lg shadow-slate-900/10`}>
					{Icon ? <Icon size={22} /> : null}
				</div>
			</div>
		</div>
	);
}

export default StatCard;
