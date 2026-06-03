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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative overflow-hidden rounded-[40px] bg-[#4b46f6] px-8 py-12 sm:px-16 sm:py-16 lg:px-20 lg:py-20">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-white/10 backdrop-blur-xl">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-lg">⚡</span>
                LinkNest
              </div>

              <div className="mt-16 max-w-lg space-y-6">
                <h1 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">Create your account</h1>
                <p className="text-lg text-slate-100/80">Start shortening links in 30 seconds — free, no card required.</p>
              </div>
            </div>

            <div className="mt-12 space-y-4 text-slate-100/90">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <p className="font-semibold">Free forever plan</p>
                <p className="mt-2 text-sm text-slate-100/80">500 links/month with full analytics, no credit card needed.</p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <p className="font-semibold">Up and running in seconds</p>
                <p className="mt-2 text-sm text-slate-100/80">Create your first short link within 60 seconds of signing up.</p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <p className="font-semibold">Enterprise-grade security</p>
                <p className="mt-2 text-sm text-slate-100/80">JWT auth, rate limiting, and HTTPS on every link by default.</p>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 top-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute left-10 top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-12 right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          </div>
        </section>

        <main className="flex items-center justify-center px-6 py-12 sm:px-10 sm:py-16">
          <div className="w-full max-w-md rounded-[40px] bg-white px-8 py-10 shadow-[0_35px_80px_rgba(15,23,42,0.12)]">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Create your account</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Create free account</h2>
            <p className="mt-3 text-sm text-slate-600">Start shortening links in 30 seconds — free, no card required.</p>

            <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700">Full name</label>
              <input
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
              />

              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                required
              />

              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
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

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create free account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account? <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/login">Sign in</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
