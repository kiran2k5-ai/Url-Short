function Loader({ label = "Loading workspace" }) {
    return (
        <div className="flex min-h-[40vh] items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-white/80 p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-slate-900/60">
            <div className="space-y-4">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#5B4BFF] dark:border-slate-700 dark:border-t-[#7C6CFF]" />
                <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{label}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fetching live data from the backend.</p>
                </div>
            </div>
        </div>
    );
}

export default Loader;