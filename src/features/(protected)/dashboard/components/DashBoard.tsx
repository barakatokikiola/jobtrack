import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Stats from "./Stats";
import { ApplicationsList } from "@/features/(protected)/applications/components/ApplicationsList";

export default async function Dashboard() {
  const supabase = await createClient();
  const currentTime = new Date().getHours();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="bg-brand-bg min-h-screen space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-3xl font-bold">
            Good{" "}
            {currentTime < 12
              ? "Morning"
              : currentTime < 18
                ? "Afternoon"
                : "Evening"}
            ,{" "}
            <span className="text-brand mx-1">
              {user.user_metadata.full_name?.split(" ")[0] || user.email} 👋
            </span>
          </span>

          <p className="mt-4 font-serif font-medium">
            Here&#39;s your job search overview
          </p>
        </div>

        <Link href="/jobs/preferences" className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-navy w-fit">
          Job Preferences
        </Link>
      </div>

      <Stats />

      <ApplicationsList />
    </main>
  );
}
