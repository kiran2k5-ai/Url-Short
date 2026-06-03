import { AnimatePresence, motion } from "framer-motion";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }) {
    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ y: 32, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 24, opacity: 0, scale: 0.98 }}
                        className="w-full max-w-lg rounded-[32px] border border-white/60 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-slate-900"
                    >
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Delete link?</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            This will permanently remove {itemName || "this URL"} and its analytics history from the dashboard.
                        </p>

                        <div className="mt-8 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                className="rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:scale-[1.01]"
                            >
                                Delete URL
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default DeleteConfirmationModal;