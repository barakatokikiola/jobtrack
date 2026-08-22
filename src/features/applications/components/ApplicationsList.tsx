"use client";

import { useApplications } from "../hooks/useApplications";
import {useRouter} from "next/navigation";
export function ApplicationsList() {
  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useApplications();
  const router = useRouter();

  if (isLoading) {
    return <p>Loading applications...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        {error instanceof Error
          ? error.message
          : "Unable to load applications."}
      </p>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <h2 className="font-semibold">No applications yet</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Start tracking your job applications by adding your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <article
          key={application.id}
          onClick={() => router.push(`/applications/${application.id}`)}
          className="cursor-pointer rounded-lg border p-4 transition hover:bg-muted/50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold">
                {application.position}
              </h2>

              <p className="text-sm text-muted-foreground">
                {application.company}
              </p>
            </div>

            <span className="rounded-full border px-3 py-1 text-xs capitalize">
              {application.status}
            </span>
          </div>

          {application.location && (
            <p className="mt-3 text-sm">
              {application.location}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}