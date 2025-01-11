"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from '@workspace/ui/components/logo';
import { BookOpen, CreditCard, Globe, LayoutDashboard, Mail, Settings, Users } from "lucide-react"


const data = {
  navMain: [
    {
      title: "App",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: LayoutDashboard,
        },
        {
          title: "Credits",
          url: "/credits",
          icon: CreditCard,
        },
        {
          title: "Campaigns",
          url: "/campaigns",
          icon: Mail,
        },
        {
          title: "Contacts",
          url: "/contacts",
          icon: Users,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ],
    },
    {
      title: "Information",
      items: [
        {
          title: "Documentation",
          url: `${process.env.NEXT_PUBLIC_DOCS_URL}`,
          icon: BookOpen,
        },
        {
          title: "Website",
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
          icon: Globe,
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const isActive = (url: string) => {
    return pathname === url
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center m-4">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link href={item.url}>
                        <div className="flex items-center gap-2">
                          <item.icon size={16} />
                          {item.title}
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
