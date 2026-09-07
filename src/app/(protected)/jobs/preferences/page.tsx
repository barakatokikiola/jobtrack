import JobPreferencesForm from "@/features/(protected)/jobs/components/JobPreferencesForm";

export default function JobPreferencesPage() {
  return (
    <main className="flex flex-col justify-center min-h-screen py-2 px-8">
      <h1 className="text-3xl font-bold mb-4">Job Preferences</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Tell us what kind of jobs you want to find.
      </p>

      <JobPreferencesForm />
    </main>
  );
}