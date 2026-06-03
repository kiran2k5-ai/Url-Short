import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_35px_90px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-500">Dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Monitor your links and performance</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Your short links and analytics will appear here once you start shortening URLs.</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-3xl bg-[#5b4bff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4c3ddf]"
            >
              Log out
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total links</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">0</p>
              <p className="mt-2 text-sm text-slate-500">0 this month</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total clicks</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">0</p>
              <p className="mt-2 text-sm text-slate-500">All time</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Active links</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">0</p>
              <p className="mt-2 text-sm text-slate-500">Currently active</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">QR codes</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">0</p>
              <p className="mt-2 text-sm text-slate-500">Generated</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Growth</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">0%</p>
              <p className="mt-2 text-sm text-slate-500">Month over month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
