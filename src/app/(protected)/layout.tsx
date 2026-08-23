'use client';

import AppSidebar from "@/features/(protected)/shared/AppSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppNavBar } from "@/features/(protected)/shared/AppNavBar";
import { ReactNode } from "react";
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
        <SidebarInset className="min-w-0">
         
          <main className="min-h-screen min-w-0 flex-1 overflow-x-hidden bg-[#F8FAFC]">
            <AppNavBar />
            {children}
          </main>
        </SidebarInset>
        {modal}
      </SidebarProvider>

  );
}
