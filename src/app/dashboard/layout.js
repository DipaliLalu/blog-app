"use client"

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ThemeToggle from "../sections/theme-toggler/page";

const routeTitleMap = {
  "/dashboard/create-blog": "Create Blog",
  "/dashboard/list": "Blog List",
  "/dashboard/analytics": "Analytics",
  "/dashboard/bookmarks": "Bookmarks",
};

export default function Layout({ children }) {
  const pathname = usePathname();
  const pageTitle = routeTitleMap[pathname] || "Dashboard";
  return (
    <SidebarProvider>
      <div className="group/sidebar-wrapper flex min-h-screen w-full">
        <AppSidebar collapsible="icon" />
        <main className="flex-1 transition-[margin] ease-in-out duration-300
               group-has-[[data-collapsible=icon]]/sidebar-wrapper:ml-20 p-4 sm:ml-20
               md:ml-24 lg:ml-40 xl:ml-48">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b-2">
            <div className="flex items-center gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="w-full text-end pe-5">
              <ThemeToggle/>
            </div>
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
