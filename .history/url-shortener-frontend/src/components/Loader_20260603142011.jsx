export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900">
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200/60 bg-white px-8 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-md">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        <p className="text-sm font-medium text-slate-700">{message}</p>
      </div>
    </div>
  );
}
