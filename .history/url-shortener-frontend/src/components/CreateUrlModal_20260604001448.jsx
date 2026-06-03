import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { FiCopy, FiLink2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import { createUrlRequest } from "../services/urlApi";
import { ensureAbsoluteUrl, formatDate } from "../utils/formatters";

const initialForm = {
	originalUrl: "",
	customAlias: "",
	expiryDays: "",
	expiryDate: ""
};

function CreateUrlModal({ isOpen, onClose, onCreated }) {
	const [formData, setFormData] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const [createdPayload, setCreatedPayload] = useState(null);
	const [errors, setErrors] = useState({});

	const previewUrl = useMemo(() => ensureAbsoluteUrl(formData.originalUrl), [formData.originalUrl]);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((current) => ({
			...current,
			[name]: value
		}));
	};

	const validate = () => {
		const nextErrors = {};

		if (!formData.originalUrl.trim()) {
			nextErrors.originalUrl = "Original URL is required.";
		}

		try {
			new URL(ensureAbsoluteUrl(formData.originalUrl));
		} catch {
			nextErrors.originalUrl = "Enter a valid URL.";
		}

		if (formData.customAlias && formData.customAlias.length < 3) {
			nextErrors.customAlias = "Alias should be at least 3 characters.";
		}

		setErrors(nextErrors);

		return Object.keys(nextErrors).length === 0;
	};

	const resetState = () => {
		setFormData(initialForm);
		setErrors({});
		setCreatedPayload(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validate()) {
			return;
		}

		try {
			setLoading(true);
			const payload = {
				originalUrl: previewUrl,
				customAlias: formData.customAlias || undefined,
				expiryDays: formData.expiryDays || undefined,
				expiryDate: formData.expiryDate || undefined
			};

			const response = await createUrlRequest(payload);
			setCreatedPayload(response.data);
			onCreated?.(response.data);
			toast.success("Short link created successfully.");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to create URL.");
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = async (value) => {
		await navigator.clipboard.writeText(value);
		toast.success("Short link copied.");
	};

	const handleClose = () => {
		resetState();
		onClose?.();
	};

	return (
		<AnimatePresence>
			{isOpen ? (
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
						className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-4xl border border-white/60 bg-white shadow-[0_24px_100px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-slate-950"
					>
						<div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-5 dark:border-white/10">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5B4BFF]">Create</p>
								<h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Create a branded short link</h3>
							</div>
							<button
								type="button"
								onClick={handleClose}
								className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
							>
								<FiX size={18} />
							</button>
						</div>

						<div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.2fr_0.8fr]">
							<form onSubmit={handleSubmit} className="space-y-5">
								<div>
									<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Original URL</label>
									<input
										name="originalUrl"
										value={formData.originalUrl}
										onChange={handleChange}
										placeholder="https://your-website.com/product"
										className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
									/>
									{errors.originalUrl ? <p className="mt-2 text-sm text-red-500">{errors.originalUrl}</p> : null}
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Custom Alias</label>
										<input
											name="customAlias"
											value={formData.customAlias}
											onChange={handleChange}
											placeholder="launch2026"
											className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
										/>
										{errors.customAlias ? <p className="mt-2 text-sm text-red-500">{errors.customAlias}</p> : null}
									</div>

									<div>
										<label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Expiry Days</label>
										<input
											type="number"
											min="1"
											name="expiryDays"
											value={formData.expiryDays}
											onChange={handleChange}
											placeholder="30"
											className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#5B4BFF] focus:ring-4 focus:ring-[#5B4BFF]/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
										/>
									</div>
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
								</div>

								<button
									type="submit"
									disabled={loading}
									className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#5B4BFF] to-[#7C6CFF] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5B4BFF]/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
								>
									<FiLink2 size={16} />
									{loading ? "Creating link..." : "Create short link"}
								</button>
							</form>

							<div className="space-y-5 rounded-3xl bg-linear-to-br from-[#5B4BFF]/5 to-[#7C6CFF]/10 p-5 dark:from-[#5B4BFF]/10 dark:to-[#7C6CFF]/10">
								<div className="rounded-3xl border border-white/70 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
									<p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Preview</p>
									<p className="mt-3 break-all text-sm font-medium text-slate-900 dark:text-white">{previewUrl || "Your URL preview will appear here"}</p>
								</div>

								{createdPayload?.shortUrl ? (
									<div className="space-y-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
										<div>
											<p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Created short URL</p>
											<p className="mt-2 break-all text-sm font-semibold text-slate-900 dark:text-white">{createdPayload.shortUrl}</p>
										</div>

										<div className="flex justify-center rounded-3xl bg-white p-4 dark:bg-slate-950">
											{createdPayload.qrCode ? (
												<img src={createdPayload.qrCode} alt="Generated QR code" className="h-44 w-44" />
											) : (
												<QRCodeSVG value={createdPayload.shortUrl} size={176} />
											)}
										</div>

										<button
											type="button"
											onClick={() => handleCopy(createdPayload.shortUrl)}
											className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
										>
											<FiCopy size={16} />
											Copy short URL
										</button>

										<p className="text-xs text-emerald-700/90 dark:text-emerald-200/80">
											{createdPayload.data?.expiryDate ? `Expires on ${formatDate(createdPayload.data.expiryDate)}` : "No expiry date configured."}
										</p>
									</div>
								) : (
									<div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-5 text-sm leading-6 text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400">
										Create a branded URL to see the QR code, short link, and expiry summary here.
									</div>
								)}
							</div>
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

export default CreateUrlModal;
