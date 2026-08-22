const FEATURES = [
  {
    icon: "📁",
    title: "Track every application",
    description: "Log jobs as you apply. Never lose track of where you applied.",
    dark: false,
  },
  {
    icon: "🔄",
    title: "Manage stages",
    description: "Applied → Interview → Offer — update in one click.",
    dark: true,
  },
  {
    icon: "📝",
    title: "Rich notes",
    description: "Add contacts, salary info, and prep notes per job.",
    dark: false,
  },
  {
    icon: "📊",
    title: "Progress overview",
    description: "See your response rate, active interviews, and offers at a glance.",
    dark: false,
  },
  {
    icon: "🔒",
    title: "Private & secure",
    description: "Row-level security via Supabase. Only you see your data.",
    dark: true,
  },
  {
    icon: "⚡",
    title: "Instant updates",
    description: "React Query keeps your data fresh with no full reloads.",
    dark: false,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="grid grid-cols-2 gap-4 lg:grid-cols-6"
      aria-label="Features"
    >
      {FEATURES.map((feature) => (
        <div
          key={feature.title}
          className={`rounded-2xl p-5 ${
            feature.dark
              ? "bg-navy text-white"
              : "border border-navy/[0.06] bg-white text-navy"
          }`}
        >
          <span className="text-2xl" aria-hidden="true">
            {feature.icon}
          </span>
          <p className="mt-4 text-sm font-bold">{feature.title}</p>
          <p
            className={`mt-1.5 text-xs leading-relaxed ${
              feature.dark ? "text-navy-muted" : "text-slate-500"
            }`}
          >
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
}
