"use client";

import AppSidebar from "@/features/(protected)/shared/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppNavBar } from "@/features/(protected)/shared/AppNavBar";
import { ReactNode } from "react";

import MobileHeader from "@/features/(protected)/shared/MobileHeader";
export default function AppLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <MobileHeader/>
        <main className="min-h-screen min-w-0 flex-1 overflow-x-hidden bg-[#F8FAFC]">
            <AppNavBar />
          {children}
        </main>
      </div>
      {modal}
    </SidebarProvider>
  );
}
