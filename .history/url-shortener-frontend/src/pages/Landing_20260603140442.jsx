import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-6 py-12 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-xl">
              <span className="h-8 w-8 rounded-full bg-white/20 text-center leading-8">⚡</span>
              LinkNest</div>
            <div className="max-w-xl space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Shorten smarter and grow your link analytics.</h1>
              <p className="text-lg text-slate-300">Start with a secure account, share mobile-ready links, and get instant performance data for every campaign.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link className="inline-flex items-center justify-center rounded-3xl bg-indigo-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-400" to="/signup">
                Create free account
              </Link>
              <Link className="inline-flex items-center justify-center rounded-3xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:border-white/40" to="/login">
                Sign in
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Free forever plan</p>
              <h2 className="text-2xl font-semibold">500 links/month with full analytics</h2>
              <p className="text-slate-300">No credit card required. Launch branded URLs instantly and track every click.</p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="font-semibold text-white">Up and running in seconds</p>
                <p className="mt-2 text-sm text-slate-300">Create your first short link within 60 seconds of signing up.</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="font-semibold text-white">Enterprise-grade security</p>
                <p className="mt-2 text-sm text-slate-300">JWT auth, rate limiting, and HTTPS on every link by default.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
