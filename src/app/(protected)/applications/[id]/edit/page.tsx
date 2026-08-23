"use client";

import { useParams } from "next/navigation";

import { ApplicationForm } from "@/features/applications/components/ApplicationForm";
import { useApplication } from "@/features/applications/hooks/useApplication";
import { useUser } from "@/features/auth/hooks/useUser";

export default function EditApplicationPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { user, loading: userLoading } = useUser();
  const {
    data: application,
    isLoading: applicationLoading,
    isError,
    error,
  } = useApplication(id);

  if (userLoading || applicationLoading) {
    return <p className="p-6">Loading application...</p>;
  }

  if (!user) {
    return <p className="p-6">You must be logged in.</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-sm text-destructive">
        {error instanceof Error
          ? error.message
          : "Unable to load application."}
      </p>
    );
  }

  if (!application) {
    return (
      <p className="p-6">
        Application not found.
      </p>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Edit Application
      </h1>

      <div className="max-w-2xl rounded-lg border p-6">
        <ApplicationForm
          userId={user.id}
          application={application}
        />
      </div>
    </main>
  );
}