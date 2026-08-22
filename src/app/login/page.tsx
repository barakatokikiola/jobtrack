import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back
          </h1>

          <p className="text-muted-foreground">
            Sign in to your JobTrack account.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}