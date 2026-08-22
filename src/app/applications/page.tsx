// "use client";

// import { ApplicationForm } from "@/features/applications/components/ApplicationForm";
// import { useUser } from "@/features/auth/hooks/useUser";

// export default function ApplicationsPage() {
//   const { user, loading } = useUser();

//   if (loading) {
//     return <p className="p-6">Loading...</p>;
//   }

//   if (!user) {
//     return <p className="p-6">You must be logged in.</p>;
//   }

//   return (
//     <main className="p-6 flex flex-col w-full mx-auto max-w-5xl">
//       <h1 className="mb-6 text-2xl font-bold">
//         Applications
//       </h1>

//       <div className="overflow-auto rounded-lg border p-4">
//         <ApplicationForm userId={user.id} />
//       </div>
//     </main>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { ApplicationsList } from "@/features/applications/components/ApplicationsList";
import { useRouter } from "next/navigation";

export default function ApplicationsPage() {
  const router = useRouter();

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>

        <Button onClick={() => router.push("/applications/new")}>
          New Application
        </Button>
      </div>
      <ApplicationsList />
    </main>
  );
}
