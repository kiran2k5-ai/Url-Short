import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please complete all fields.");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    const success = await signup({ name: form.name, email: form.email, password: form.password });
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2ff] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
        <section className="relative overflow-hidden rounded-[40px] bg-[#5b4bff] px-8 py-14 text-white shadow-[0_35px_90px_rgba(91,75,255,0.18)] sm:px-16 sm:py-20">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20 text-lg">⚡</span>
              LinkNest
            </div>
            <h1 className="mt-12 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">Create your account</h1>
            <p className="mt-6 max-w-xl text-base text-slate-200/90 sm:text-lg">
              Start shortening links in 30 seconds — free, no card required.
            </p>
          </div>

          <div className="mt-12 grid gap-4 text-sm text-slate-200/90 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
              <p className="font-semibold">Free forever plan</p>
              <p className="mt-2 text-sm text-slate-100/80">500 links/month with full analytics, no credit card needed.</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
              <p className="font-semibold">Up and running in seconds</p>
              <p className="mt-2 text-sm text-slate-100/80">Create your first short link within 60 seconds of signing up.</p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute left-10 top-36 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-10 right-24 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          </div>
        </section>

        <main className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-0">
          <div className="w-full max-w-md rounded-[36px] border border-slate-200 bg-white p-10 shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Create your account</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Create free account</h2>
            <p className="mt-3 text-sm text-slate-600">Get started with a secure account and link analytics in minutes.</p>

            <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700">Full name</label>
                <input
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="relative mt-2">
                  <input
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-16 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-slate-700"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center rounded-3xl bg-[#5b4bff] px-5 text-base font-semibold text-white transition hover:bg-[#4c3ddf] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create free account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/login">Sign in</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
