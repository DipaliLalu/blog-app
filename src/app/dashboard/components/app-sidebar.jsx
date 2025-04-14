"use client"

import * as React from "react"
import {GalleryVerticalEnd} from "lucide-react"
import { NavMain } from "@/app/dashboard/components/nav-main"
import { NavUser } from "@/app/dashboard/components/nav-user"
import { IoIosCreate } from "react-icons/io";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { MdAnalytics } from "react-icons/md";
import { GiBookmarklet } from "react-icons/gi";
import { FaRectangleList } from "react-icons/fa6";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "BLOGIN",
    logo: GalleryVerticalEnd,
  },
  navMain: [
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: MdAnalytics,
    },
    {
      title: "Blog List",
      url: "/dashboard/list",
      icon: FaRectangleList,
    },
    {
      title: "Create a Blog",
      url: "/dashboard/create-blog",
      icon: IoIosCreate,
    },
    {
      title: "Bookmarks",
      url: "/dashboard/bookmarks",
      icon: GiBookmarklet,
    },
   
  ],

}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>

        <span className="truncate font-bold ps-2">
          {data.teams.name}
        </span>

      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
