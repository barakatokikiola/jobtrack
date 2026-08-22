import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <div className="flex flex-col items-start gap-6 rounded-2xl bg-navy p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
      <div>
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
          Your next job starts with organization.
        </h2>
        <p className="mt-2 text-sm text-white/80">
          Free, open source, and ready when you are.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/signup"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Get started for free
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-1.5 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
         
          Log in
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
