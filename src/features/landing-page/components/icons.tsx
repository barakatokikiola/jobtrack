import { TextAlignStart } from "lucide-react";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-navy ${className}`}
      aria-hidden="true"
    >
      <TextAlignStart className="text-white w-4 h-4" />
    </span>
  );
}

