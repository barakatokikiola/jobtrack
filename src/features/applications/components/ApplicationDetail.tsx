"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { useApplication } from "@/features/applications/hooks/useApplication";
import { useDeleteApplication } from "@/features/applications/hooks/useDeleteApplication";

export default function ApplicationDetails() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const deleteApplication = useDeleteApplication();

  const { data: application, isLoading, isError, error } = useApplication(id);

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    if (!application) {
      return;
    }

    deleteApplication.mutate(application.id, {
      onSuccess: () => {
        router.push("/applications");
      },
    });
  }

  if (isLoading) {
    return <p className="p-6">Loading application...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-sm text-destructive">
        {error instanceof Error ? error.message : "Unable to load application."}
      </p>
    );
  }

  if (!application) {
    return <p className="p-6">Application not found.</p>;
  }

  return (
    <main className="p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{application.position}</h1>

          <p className="text-muted-foreground">{application.company}</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/applications/${application.id}/edit`)}
          >
            Edit Application
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteApplication.isPending}
          >
            {deleteApplication.isPending ? "Deleting..." : "Delete Application"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 rounded-lg border p-6">
        <p>
          <span className="font-medium">Location:</span>{" "}
          {application.location || "Not specified"}
        </p>

        <p>
          <span className="font-medium">Job type:</span> {application.job_type}
        </p>

        <p>
          <span className="font-medium">Work mode:</span>{" "}
          {application.work_mode}
        </p>

        <p>
          <span className="font-medium">Status:</span> {application.status}
        </p>

        <p>
          <span className="font-medium">Salary:</span>{" "}
          {application.salary_min || application.salary_max
            ? `${application.currency} ${
                application.salary_min ?? ""
              } - ${application.salary_max ?? ""}`
            : "Not specified"}
        </p>

        <p>
          <span className="font-medium">Applied:</span>{" "}
          {application.applied_at || "Not specified"}
        </p>

        {application.job_url && (
          <p>
            <span className="font-medium">Job posting:</span>{" "}
            <a
              href={application.job_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View job posting
            </a>
          </p>
        )}

        {application.notes && (
          <div>
            <p className="font-medium">Notes</p>
            <p className="mt-1 text-muted-foreground">{application.notes}</p>
          </div>
        )}
      </div>
    </main>
  );
}
