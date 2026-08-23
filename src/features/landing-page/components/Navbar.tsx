import { LogoMark } from "./icons";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-5 py-2.5 sm:px-8">
      <Link href="#top" className="flex items-center gap-2">
        <LogoMark />
        <span className="text-[15px] font-bold text-navy">JobTrack</span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-slate-500 transition-colors hover:text-navy"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/signup"
        className="rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
      >
        Get started for free
      </Link>
    </header>
  );
}
