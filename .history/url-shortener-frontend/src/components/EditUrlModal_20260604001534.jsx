import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSave, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import { updateUrlRequest } from "../services/urlApi";
import { ensureAbsoluteUrl, formatDate } from "../utils/formatters";

function EditUrlModal({ isOpen, onClose, url, onSaved }) {
	const [formData, setFormData] = useState({ originalUrl: "", expiryDate: "" });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!url) {
			return;
		}

		setFormData({
			originalUrl: url.originalUrl || "",
			expiryDate: url.expiryDate ? String(url.expiryDate).slice(0, 10) : ""
		});
	}, [url]);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((current) => ({
			...current,
			[name]: value
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!url?._id) {
			return;
		}

		try {
			setLoading(true);
			const response = await updateUrlRequest(url._id, {
				originalUrl: ensureAbsoluteUrl(formData.originalUrl),
				expiryDate: formData.expiryDate || undefined
			});

			toast.success("URL updated successfully.");
			onSaved?.(response.data);
			onClose?.();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to update URL.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && url ? (
				<motion.div
					className="fixed inset-0 z-[75] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						initial={{ y: 28, opacity: 0, scale: 0.98 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 24, opacity: 0, scale: 0.98 }}
						className="w-full max-w-2xl rounded-4xl border border-white/60 bg-white shadow-[0_24px_100px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-slate-950"
					>
						<div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-5 dark:border-white/10">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5B4BFF]">Edit</p>
								<h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Update short link</h3>
							</div>
							<button
								type="button"
								onClick={onClose}
								className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
							>
								<FiX size={18} />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Original URL</label>
								<input
									name="originalUrl"
									value={formData.originalUrl}
									onChange={handleChange}
									className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Expiry Date</label>
								<input
									type="date"
									name="expiryDate"
									value={formData.expiryDate}
									onChange={handleChange}
									className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
								/>
								{url.expiryDate ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Current expiry: {formatDate(url.expiryDate)}</p> : null}
							</div>

							<div className="flex items-center justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={onClose}
									className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#5B4BFF] to-[#7C6CFF] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#5B4BFF]/20 transition hover:scale-[1.01] disabled:opacity-60"
								>
									<FiSave size={16} />
									{loading ? "Saving..." : "Save changes"}
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

export default EditUrlModal;
