import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
      </SidebarInset>
    </SidebarProvider>
  )
}
