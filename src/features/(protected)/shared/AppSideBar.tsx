"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarDays,
  Bookmark,
  BarChart3,
} from "lucide-react";
import { logout } from "@/features/auth/services/auth.service";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useUser } from "@/features/auth/hooks/useUser";
import { LogoMark } from "@/features/landing-page/components/icons";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type AccountSummary = {
  fullName: string;
  email?: string;
  photoUrl?: string;
  initials: string;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    href: "/applications",
    icon: BriefcaseBusiness,
  },
  {
    label: "Interviews",
    href: "/interviews",
    icon: CalendarDays,
  },
  {
    label: "Saved Jobs",
    href: "/saved-jobs",
    icon: Bookmark,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const { user: currentUser } = useUser();
  const { open } = useSidebar();

    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [accountSummary, setAccountSummary] = useState<AccountSummary>({
    fullName: "Barakat",
    initials: "B",
  });

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };
 async function handleLogout() {
    try {
      setIsLoggingOut(true);

      await logout();

      toast.success("Successfully Logged out", {
          description: "Your are logged out successfully.",
          position: "top-right",
        });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoggingOut(false);
    }
  }
  return (
    <Sidebar collapsible="icon" className="border-r border-gray-100 bg-white">
      {/* Header */}
      <SidebarHeader
        className={`${open ? "px-5 py-3" : "px-2 py-3"}`}
      >
        <SidebarMenuItem
          className={`flex items-center gap-2 ${
            open  ? "justify-between" : "justify-center"
          }`}
        >
          {open ? (
            <Link href="/" className="flex items-center gap-2">
              <LogoMark />
              <span className="text-[15px] font-bold text-navy">JobTrack</span>
            </Link>
          ) : null}

          <SidebarTrigger className="rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900" />
        </SidebarMenuItem>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="pt-5">
        <SidebarGroup className="px-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navItems.map(({ label, href, icon: Icon }) => {
                const active = isActiveRoute(href);

                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={label}
                      className={`h-11 rounded-lg px-3 text-sm font-medium transition-colors ${
                        active
                          ? "bg-brand text-white shadow-sm hover:bg-brand hover:text-white"
                          : "text-gray-600 hover:bg-navy hover:text-brand-bg"
                      }`}
                    >
                      <Link href={href} className="flex items-center gap-3">
                        <Icon className="h-4.5 w-4.5 shrink-0" />

                        <span className="min-w-0 flex-1 truncate">{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="gap-2 border-t border-gray-100 px-2 py-4">
        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger
            data-tour="profile-menu"
            className={`flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white p-2 text-left transition hover:border-blue-100 hover:bg-blue-50/60 ${
              !open ? "justify-center" : ""
            }`}
            aria-label="Open account menu"
          >
            <Avatar className="h-9 w-9 shrink-0 border border-gray-100">
              {accountSummary.photoUrl && (
                <AvatarImage
                  src={accountSummary.photoUrl}
                  alt={accountSummary.fullName}
                />
              )}

              <AvatarFallback className="bg-blue-50 text-xs font-bold text-brand">
                {accountSummary.initials}
              </AvatarFallback>
            </Avatar>

            {(open) && (
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-gray-900">
                  {accountSummary.fullName}
                </span>

                <span className="block truncate text-xs font-medium text-gray-500">
                  {accountSummary.email || currentUser?.email}
                </span>
              </span>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={10}
            className="w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
          >
            {/* Account summary */}
            <div className="mb-1 flex items-center gap-3 rounded-lg bg-[#F8FAFC] p-3">
              <Avatar className="h-10 w-10 border border-gray-100">
                {accountSummary.photoUrl && (
                  <AvatarImage
                    src={accountSummary.photoUrl}
                    alt={accountSummary.fullName}
                  />
                )}

                <AvatarFallback className="bg-blue-50 text-xs font-bold text-brand">
                  {accountSummary.initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {accountSummary.fullName}
                </p>

                <p className="truncate text-xs font-medium text-gray-500">
                  {accountSummary.email || currentUser?.email}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator className="my-2 bg-gray-100" />

            <DropdownMenuItem onClick={handleLogout} className="capitalize border cursor-pointer rounded-lg px-3 py-2 text-sm text-error focus:bg-red-50 focus:text-red-700">
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
