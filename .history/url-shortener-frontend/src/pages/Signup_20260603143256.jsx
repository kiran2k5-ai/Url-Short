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
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#5b4bff] to-[#6d5fdf] py-16 text-white sm:px-16 sm:py-24">
          <div className="relative z-10 flex flex-col justify-between min-h-full">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                <span className="text-lg">⚡</span>
                LinkNest
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-sm font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Free forever plan</p>
                    <p className="mt-1 text-sm text-slate-200">500 links/month with full analytics, no credit card needed.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-sm font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Up and running in seconds</p>
                    <p className="mt-1 text-sm text-slate-200">Create your first short link within 60 seconds of signing up.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-sm font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Enterprise-grade security</p>
                    <p className="mt-1 text-sm text-slate-200">JWT auth, rate limiting, and HTTPS on every link by default.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-white/60">© 2026 LinkNest</div>
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute left-1/3 bottom-1/4 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
          </div>
        </section>

        <main className="flex items-center justify-center bg-white px-6 py-12 sm:px-12">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">Create your account</h2>
            <p className="mt-2 text-sm text-slate-600">Start shortening links in 30 seconds — free, no card required</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-slate-900">Full name</label>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-500 outline-none transition focus:border-[#5b4bff] focus:ring-2 focus:ring-[#5b4bff]/20"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">Email</label>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-500 outline-none transition focus:border-[#5b4bff] focus:ring-2 focus:ring-[#5b4bff]/20"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">Password</label>
                <div className="relative mt-2">
                  <input
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-14 text-sm text-slate-900 placeholder-slate-500 outline-none transition focus:border-[#5b4bff] focus:ring-2 focus:ring-[#5b4bff]/20"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-600 hover:text-slate-900"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-lg bg-[#5b4bff] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#4c3ddf] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create free account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account? <Link className="font-semibold text-[#5b4bff] hover:text-[#4c3ddf]" to="/login">Sign in</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
