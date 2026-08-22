"use client";

import { ApplicationForm } from "@/features/applications/components/ApplicationForm";
import { useUser } from "@/features/auth/hooks/useUser";

export default function NewApplicationPage() {
  const { user, loading } = useUser();

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return <p className="p-6">You must be logged in.</p>;
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        New Application
      </h1>

      <div className="max-w-2xl rounded-lg border p-6">
        <ApplicationForm userId={user.id} />
      </div>
    </main>
  );
}