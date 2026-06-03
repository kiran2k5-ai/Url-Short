import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl rounded-4xl border border-slate-200/80 bg-white/95 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.08)] dark:border-slate-700/60 dark:bg-slate-900/90">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-indigo-500">Welcome</p>
            <h1 className="mt-3 text-3xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Your short links and analytics will appear here once you start shortening URLs.</p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
