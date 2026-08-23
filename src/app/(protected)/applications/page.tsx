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
