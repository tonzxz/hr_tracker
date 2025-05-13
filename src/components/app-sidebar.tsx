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
import Link from "next/link";
import Image from "next/image";

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
          title: "Track Processes",
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
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted/10"
              >
                {/* Logo */}
                <Image
                  src="/auxilium-logo.png"
                  alt="Auxilium"
                  width={200}
                  height={200}
                  className="rounded-md"
                />
            
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.teams} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{ name: "Guest", email: "", avatar: "" }} />
      </SidebarFooter>
    </Sidebar>
  );
}