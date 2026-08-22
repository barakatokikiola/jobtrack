import SideBar from "@/features/auth/components/SideBar";
import { SignupForm } from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
   

        <main className="min-h-screen ">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mx-auto">
        <SideBar />

        <div className="flex flex-col w-full max-w-2xl h-full m-auto justify-center space-y-6 px-6 py-3">
           <div>
          <h1 className="text-xl sm:text-3xl font-bold">Create your account</h1>
          <p className="text-muted-foreground">
            Start tracking your job applications.
          </p>
        </div>

           <SignupForm />
        </div>
      </div>
    </main>
  
  );
}

