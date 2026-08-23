import { LoginForm } from "@/features/auth/components/LoginForm";
import SideBar from "@/features/auth/components/SideBar";

export default function LoginPage() {
  return (
    <main className="min-h-screen ">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mx-auto">
        <SideBar />

        <div className="flex flex-col w-full max-w-2xl h-full m-auto justify-center space-y-6 px-6 py-3">
          <div>
            <h1 className="sm:text-3xl font-bold">Welcome back👋</h1>

            <p className="text-muted-foreground mt-2">
              Sign in to your JobTrack account.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
