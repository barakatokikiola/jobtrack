"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { logout } from "../services/auth.service";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);

      await logout();

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoggingOut(false);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Signing out..." : "Sign out"}
    </Button>
  );
}