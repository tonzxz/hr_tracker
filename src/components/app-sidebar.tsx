"use client";

import * as React from "react";
import {
  Users,
  Briefcase,
  Globe,
  FileText,
  Shield,
  User,
  LogOut,
  LifeBuoy,
  Send,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Employees",
          url: "/dashboard/employees",
        },
        {
          title: "Processes",
          url: "/dashboard/employee-processes",
        },
      ],
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: Briefcase,
      items: [
        {
          title: "All Clients",
          url: "/dashboard/clients",
        },
      ],
    },
    {
      title: "In-Country Partners",
      url: "/dashboard/in-country-partners",
      icon: Globe,
      items: [
        {
          title: "All Partners",
          url: "/dashboard/in-country-partners",
        },
      ],
    },
    {
      title: "Visa Types",
      url: "/dashboard/visa-types",
      icon: FileText,
      items: [
        {
          title: "All Visa Types",
          url: "/dashboard/visa-types",
        },
      ],
    },
    {
      title: "Insurance Plans",
      url: "/dashboard/insurance-plans",
      icon: Shield,
      items: [
        {
          title: "All Plans",
          url: "/dashboard/insurance-plans",
        },
      ],
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: User,
      items: [
        {
          title: "All Users",
          url: "/dashboard/users",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  teams: [
    {
      name: "HR Team",
      url: "/dashboard/hr-team",
      icon: Users,
    },
    {
      name: "Sales Team",
      url: "/dashboard/sales-team",
      icon: Briefcase,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <User className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">HR Management</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.teams} />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: user || "Guest", email: "", avatar: "" }} />
      </SidebarFooter>
    </Sidebar>
  );
}