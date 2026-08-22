export function Hero() {
  return (
    <div className="grid grid-cols-1 gap-8 px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:grid-cols-2 lg:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
          Job application tracker
        </p>
        <h1 className="mt-4 text-[2.75rem] font-black leading-[0.95] tracking-tight sm:text-7xl">
          <span className="text-navy">Stop losing</span>
          <br />
          <span className="text-brand">track of jobs.</span>
        </h1>
      </div>

      <div className="flex flex-col items-start gap-6 lg:items-end">
        <p className="max-w-sm text-sm leading-relaxed text-slate-500 sm:text-[15px] lg:text-right">
          One place to track every application, every stage, and every
          opportunity. Built for serious job seekers.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="#get-started"
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-dark"
          >
            Start for free
          </a>
          <a
            href="https://github.com"
            className="rounded-lg border border-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/[0.03]"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
