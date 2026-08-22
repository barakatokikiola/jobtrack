import { RiMenu2Line } from "react-icons/ri";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-navy ${className}`}
      aria-hidden="true"
    >
      <RiMenu2Line className="text-white" />
    </span>
  );
}

