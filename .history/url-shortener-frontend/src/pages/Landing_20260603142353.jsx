import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#5b4bff] text-white shadow-lg shadow-[#5b4bff]/10">⚡</div>
            <span className="text-lg font-semibold">LinkNest</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#workflow" className="hover:text-slate-900">How it works</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" to="/login">
              Sign in
            </Link>
            <Link className="rounded-2xl bg-[#5b4bff] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5b4bff]/20 transition hover:bg-[#4c3ddf]" to="/signup">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Trusted by 50,000+ marketers
            </div>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Short links that <span className="text-[#5b4bff]">drive results</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              LinkNest turns your long URLs into powerful marketing tools — with analytics, QR codes, custom domains, and bulk management built right in.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link className="inline-flex items-center justify-center rounded-3xl bg-[#5b4bff] px-7 py-3 text-base font-semibold text-white shadow-lg shadow-[#5b4bff]/20 transition hover:bg-[#4c3ddf]" to="/signup">
                Start for free
              </Link>
              <Link className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-7 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-300" to="/login">
                Sign in to dashboard
              </Link>
            </div>
            <div className="mt-10 flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm shadow-slate-200">
                <span className="text-[#5b4bff]">✓</span> No credit card required
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm shadow-slate-200">
                <span className="text-[#5b4bff]">✓</span> Free forever plan
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm shadow-slate-200">
                <span className="text-[#5b4bff]">✓</span> Setup in 30 seconds
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-semibold text-slate-950">Smart URL Shortening</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Create clean, branded short links with custom aliases in seconds.</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-semibold text-slate-950">QR Code Generation</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Instantly generate QR codes for any link and download in high resolution.</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-semibold text-slate-950">Detailed Analytics</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Real-time click tracking with geographic, device, and browser breakdowns.</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-semibold text-slate-950">Bulk Upload</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Process hundreds of URLs at once with CSV import and batch management.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
