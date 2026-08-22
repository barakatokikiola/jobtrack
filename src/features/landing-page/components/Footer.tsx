import { LogoMark } from "./icons";

const FOOTER_LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-navy/[0.06] px-5 py-6 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
      <div className="flex items-center gap-2">
        <LogoMark className="h-6 w-6" />
        <span className="text-sm font-bold text-navy">JobTrack</span>
      </div>

      <p className="text-xs text-slate-400">
        © 2025 JobTrack. Open source under MIT license.
      </p>

      <nav className="flex items-center gap-5" aria-label="Footer">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs font-medium text-slate-400 transition-colors hover:text-navy"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
