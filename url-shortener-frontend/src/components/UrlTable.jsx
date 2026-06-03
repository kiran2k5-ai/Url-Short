import { motion } from "framer-motion";
import { FiBarChart2, FiCopy, FiEdit3, FiTrash2 } from "react-icons/fi";

import { formatDate, formatNumber, getStatusMeta, truncateUrl } from "../utils/formatters";

function UrlTable({ urls, onCopy, onEdit, onDelete, onAnalytics }) {
	if (!urls.length) {
		return null;
	}

	return (
		<div className="rounded-4xl border border-white/60 bg-white/85 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
			<div className="hidden overflow-hidden rounded-4xl lg:block">
				<table className="min-w-full divide-y divide-slate-200/70 dark:divide-white/10">
					<thead className="bg-slate-50/80 dark:bg-white/5">
						<tr>
							{[
								"Original URL",
								"Short URL",
								"Clicks",
								"Status",
								"Expiry Date",
								"Created Date",
								"Actions"
							].map((column) => (
								<th key={column} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-200/70 dark:divide-white/10">
						{urls.map((url) => {
							const statusMeta = getStatusMeta(url);

							return (
								<motion.tr key={url._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="transition hover:bg-slate-50/70 dark:hover:bg-white/5">
									<td className="max-w-70 px-5 py-4 align-top text-sm text-slate-700 dark:text-slate-200">
										<div className="font-medium">{truncateUrl(url.originalUrl, 58)}</div>
									</td>
									<td className="px-5 py-4 align-top text-sm text-slate-700 dark:text-slate-200">
										<div className="font-medium text-[#5B4BFF] dark:text-[#9D97FF]">{url.shortUrl}</div>
									</td>
									<td className="px-5 py-4 align-top text-sm font-semibold text-slate-900 dark:text-white">{formatNumber(url.clickCount || 0)}</td>
									<td className="px-5 py-4 align-top">
										<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusMeta.className}`}>
											{statusMeta.label}
										</span>
									</td>
									<td className="px-5 py-4 align-top text-sm text-slate-600 dark:text-slate-300">
										{url.expiryDate ? formatDate(url.expiryDate) : "No expiry"}
									</td>
									<td className="px-5 py-4 align-top text-sm text-slate-600 dark:text-slate-300">
										{formatDate(url.createdAt)}
									</td>
									<td className="px-5 py-4 align-top">
										<div className="flex flex-wrap gap-2">
											<ActionButton label="Copy" icon={FiCopy} onClick={() => onCopy(url.shortUrl)} />
											<ActionButton label="Edit" icon={FiEdit3} onClick={() => onEdit(url)} />
											<ActionButton label="Delete" icon={FiTrash2} onClick={() => onDelete(url)} danger />
											<ActionButton label="Analytics" icon={FiBarChart2} onClick={() => onAnalytics(url)} />
										</div>
									</td>
								</motion.tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="space-y-4 p-4 lg:hidden">
				{urls.map((url) => {
					const statusMeta = getStatusMeta(url);

					return (
						<div key={url._id} className="rounded-[26px] border border-slate-200/70 bg-white p-4 dark:border-white/10 dark:bg-slate-950/70">
							<div className="flex items-start justify-between gap-4">
								<div className="min-w-0">
									<p className="text-sm font-semibold text-slate-900 dark:text-white">{truncateUrl(url.originalUrl, 42)}</p>
									<p className="mt-1 break-all text-sm text-[#5B4BFF] dark:text-[#9D97FF]">{url.shortUrl}</p>
								</div>
								<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusMeta.className}`}>{statusMeta.label}</span>
							</div>

							<div className="mt-4 grid grid-cols-2 gap-3 text-sm">
								<KeyValue label="Clicks" value={formatNumber(url.clickCount || 0)} />
								<KeyValue label="Created" value={formatDate(url.createdAt)} />
								<KeyValue label="Expiry" value={url.expiryDate ? formatDate(url.expiryDate) : "No expiry"} />
							</div>

							<div className="mt-4 flex flex-wrap gap-2">
								<ActionButton label="Copy" icon={FiCopy} onClick={() => onCopy(url.shortUrl)} />
								<ActionButton label="Edit" icon={FiEdit3} onClick={() => onEdit(url)} />
								<ActionButton label="Delete" icon={FiTrash2} onClick={() => onDelete(url)} danger />
								<ActionButton label="Analytics" icon={FiBarChart2} onClick={() => onAnalytics(url)} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function ActionButton({ label, icon: Icon, onClick, danger = false }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={[
				"inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold transition",
				danger
					? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
					: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
			].join(" ")}
		>
			<Icon size={14} />
			{label}
		</button>
	);
}

function KeyValue({ label, value }) {
	return (
		<div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-white/5">
			<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
			<p className="mt-1 font-medium text-slate-900 dark:text-white">{value}</p>
		</div>
	);
}

export default UrlTable;
