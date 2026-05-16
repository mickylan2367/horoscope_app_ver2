export default function AuthFormCard({
  title,
  description,
  error,
  onSubmit,
  submitLabel,
  onSkip,
  footer = null,
  children,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="home-content-scale mx-auto max-w-md rounded-[2rem] border border-white/12 bg-[#1a1530]/58 p-8 text-white shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
    >
      <h1 className="mb-3 text-3xl font-bold tracking-[0.08em] text-[#f4eeff]">{title}</h1>
      <p className="mb-6 text-sm leading-7 text-slate-300">{description}</p>
      {error ? <p className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

      {children}

      <button
        className="w-full cursor-pointer rounded-full bg-[#f4c2c2]/82 px-6 py-3.5 text-base font-semibold text-[#5c3a3a] shadow-[0_10px_24px_rgba(244,194,194,0.14)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffe5ea]/95 hover:text-[#7b4c5a] hover:shadow-[0_14px_30px_rgba(244,194,194,0.24),0_0_0_1px_rgba(255,255,255,0.38)_inset] active:translate-y-0"
        type="submit"
      >
        {submitLabel}
      </button>

      <div className="my-7 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs tracking-[0.28em] text-slate-400">OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 py-3.5 text-base font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 hover:text-white active:translate-y-0"
      >
        Set up later
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">
        You can create an account or sign in later.
      </p>

      {footer}
    </form>
  );
}
