import { SignupForm } from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-muted-foreground">
            Start tracking your job applications.
          </p>
        </div>

        <SignupForm />
      </div>
    </main>
  );
}