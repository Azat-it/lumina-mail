import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@workspace/ui/components/button"
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"
import { Toaster } from "@workspace/ui/components/sonner"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full space-y-4">
        <Button variant="outline" size="icon" asChild>
          <SidebarTrigger />
        </Button>
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  )
}