import { BellIcon } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/features/landing-page/components/icons";

export function AppNavBar() {
  return (
    <header className="hidden sm:flex items-center justify-between px-5 py-2.5 sm:px-8 bg-brand-bg border-b">
      <Link href="/" className="flex items-center gap-2">
        <LogoMark />
        <span className="text-[15px] font-bold text-navy">JobTrack</span>
      </Link>

      <div className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:border">
        <BellIcon className="h-4 w-4" />
      </div>
    </header>
  );
}
