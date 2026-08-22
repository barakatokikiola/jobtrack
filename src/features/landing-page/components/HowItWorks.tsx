const STEPS = [
  {
    number: "01",
    title: "Create account",
    description: "Sign up free. No credit card. Ready in seconds.",
  },
  {
    number: "02",
    title: "Add applications",
    description: "Log the company, role, date, and any notes.",
  },
  {
    number: "03",
    title: "Track progress",
    description: "Update statuses as interviews and offers roll in.",
  },
  {
    number: "04",
    title: "Land the job",
    description: "Stay focused. Stay organized. Get hired.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="rounded-2xl border border-navy/[0.06] bg-white p-6 sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        How it works
      </p>
      <h2 className="mt-1 text-2xl font-extrabold text-navy">
        Four steps to a cleaner job search
      </h2>

      <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.number}>
            <p className="text-4xl font-extrabold text-slate-200">
              {step.number}
            </p>
            <p className="mt-2 text-sm font-bold text-navy">{step.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
