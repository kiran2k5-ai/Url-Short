import { motion } from "framer-motion";

function EmptyState({ title, description, actionLabel, onAction, icon: Icon }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-slate-200/70 bg-white/85 p-10 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70"
        >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#5B4BFF]/15 to-[#7C6CFF]/15 text-[#5B4BFF] dark:text-[#7C6CFF]">
                {Icon ? <Icon size={34} /> : null}
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
            {actionLabel ? (
                <button
                    type="button"
                    onClick={onAction}
                    className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5B4BFF] to-[#7C6CFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5B4BFF]/20 transition hover:scale-[1.01]"
                >
                    {actionLabel}
                </button>
            ) : null}
        </motion.div>
    );
}

export default EmptyState;