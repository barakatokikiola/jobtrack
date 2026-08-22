import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { ApplicationsList } from "@/features/applications/components/ApplicationsList";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="space-y-6 p-6">
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Welcome to JobTrack</h1>
          <LogoutButton />
        </div>

        <p className="mt-2 text-muted-foreground">
          You are signed in as {user.email}
        </p>
      </div>

      <Link
        href="/applications"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        View Applications
      </Link>
    </main>
  );
}
