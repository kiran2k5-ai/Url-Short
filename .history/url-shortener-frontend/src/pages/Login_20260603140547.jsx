import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const success = await login({ email: form.email, password: form.password });
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[1.14fr_0.86fr]">
        <section className="relative flex flex-col items-start justify-center gap-8 overflow-hidden bg-[#4f46f7] px-8 py-16 text-white sm:px-16 lg:px-20">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
              <span className="h-9 w-9 rounded-2xl bg-white/20 text-center leading-9">⚡</span>
              LinkNest
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">Your links. Your data. Your growth.</h1>
            <p className="mt-6 max-w-xl text-base text-slate-200/90 sm:text-lg">
              Sign in and get back to building the campaigns that move your numbers.
            </p>
          </div>

          <div className="grid gap-4 text-sm text-slate-200/90 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_40px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
              <p className="font-semibold">Free forever plan</p>
              <p className="mt-2 text-sm text-slate-200/80">500 links/month with full analytics, no credit card needed.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_40px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
              <p className="font-semibold">Enterprise-grade security</p>
              <p className="mt-2 text-sm text-slate-200/80">JWT auth, rate limiting, and HTTPS on every link by default.</p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-16 top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute left-10 top-48 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-10 right-24 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          </div>
        </section>

        <main className="flex items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950 lg:px-12">
          <div className="w-full max-w-md rounded-4xl border border-slate-200/80 bg-white/95 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/90">
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Welcome back</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Sign in to your account to continue</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                Email
                <input
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                Password
                <div className="relative mt-2">
                  <input
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember me for 30 days
                </label>
                <Link className="font-medium text-indigo-600 hover:text-indigo-700" to="#">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 w-full items-center justify-center rounded-3xl bg-indigo-600 px-5 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
              <div className="font-medium text-slate-900 dark:text-white">Demo:</div>
              <p>demo@linknest.io / password123</p>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account? <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/signup">Sign up free</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
