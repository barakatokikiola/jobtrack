import Image from "next/image";
import app from "@/assets/app.png";

const RESPONSE_BARS = [
  { label: "Applied", percent: 100, color: "bg-[#DAD3C5]" },
  { label: "Interview", percent: 30, color: "bg-blue-500" },
  { label: "Offer", percent: 8, color: "bg-green-600" },
  { label: "Rejected", percent: 13, color: "bg-red-400" },
];

function QuoteCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-brand p-6 text-white">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
          Why JobTrack
        </p>
        <p className="text-4xl pt-16 pb-6 font-black leading-[1.15]">
          &ldquo;Spreadsheets don&apos;t get you hired. Focus does.&rdquo;
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          JobTrack keeps the chaos organized so you can spend more time
          preparing and less time wondering what happened with that application
          from three weeks ago.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="h-8 rounded-md bg-white/90" />
        ))}
      </div>
    </div>
  );
}

function ResponseRateCard() {
  return (
    <div className="rounded-2xl shadow-md bg-white p-6">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        Response rate
      </p>

      <p className="mt-6 text-center text-5xl font-extrabold text-navy">38%</p>
      <p className="mt-1 text-center text-xs text-slate-400">
        of 24 applications
      </p>

      <div className="mt-7 space-y-3.5">
        {RESPONSE_BARS.map((bar) => (
          <div key={bar.label}>
            <p className="mb-1.5 text-xs font-medium text-slate-500">
              {bar.label}
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${bar.color}`}
                style={{ width: `${bar.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardShowcase() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1.2fr_1fr]">
      <div className="w-full h-full rounded-xl bg-navy">
        <Image
          src={app}
          alt="Dashboard"
          className=" object-cover"
        />
      </div>
      <QuoteCard />
      <ResponseRateCard />
    </div>
  );
}
